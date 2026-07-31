#!/usr/bin/env node
/**
 * Rewrite a generated Payload/Drizzle migration's raw SQL to be idempotent:
 *  - CREATE TABLE / CREATE INDEX / CREATE UNIQUE INDEX -> add IF NOT EXISTS
 *  - CREATE TYPE ... AS ENUM(...) -> wrap in DO block, ignore duplicate_object
 *  - ALTER TABLE ... ADD CONSTRAINT ... -> wrap in DO block, ignore duplicate_object
 *    (Postgres has no `ADD CONSTRAINT IF NOT EXISTS`)
 *  - After CREATE TABLE IF NOT EXISTS, also emit ADD COLUMN IF NOT EXISTS for every
 *    non-PK column so partial schema:push DBs gain new columns before FKs run
 *  - DROP TABLE / DROP TYPE (down migration) -> add IF EXISTS
 *
 * Needed because some target databases (QA) already have a partial schema from
 * earlier interrupted `schema:push` runs, and committed migrations must be safe
 * to apply on top of that without erroring on "already exists" / missing columns.
 *
 * Usage: node scripts/make-migration-idempotent.mjs <path-to-migration.ts>
 */
import fs from 'node:fs'

const file = process.argv[2]
if (!file) {
  console.error('Usage: node scripts/make-migration-idempotent.mjs <path-to-migration.ts>')
  process.exit(1)
}

let src = fs.readFileSync(file, 'utf8')

function wrapDoBlock(indent, statement) {
  return (
    `${indent}DO $$ BEGIN\n` +
    `${indent} ${statement}\n` +
    `${indent}EXCEPTION\n` +
    `${indent} WHEN duplicate_object THEN null;\n` +
    `${indent}END $$;`
  )
}

/** Ensure existing tables get new columns that CREATE TABLE IF NOT EXISTS would skip. */
function injectAddColumnIfNotExists(input) {
  if (input.includes('-- ensure-columns-from-create-table')) {
    return input
  }

  const alters = []
  const tableRe = /CREATE TABLE IF NOT EXISTS "([^"]+)" \(([\s\S]*?)\);/g
  let match
  while ((match = tableRe.exec(input))) {
    const table = match[1]
    const body = match[2]
    for (const rawLine of body.split('\n')) {
      const line = rawLine.trim()
      if (!line.startsWith('"')) continue
      const colMatch = line.match(/^"([^"]+)"\s+(.+?)$/)
      if (!colMatch) continue
      const name = colMatch[1]
      let typeDef = colMatch[2].replace(/,\s*$/, '').trim()
      // Table already has a PK if it exists; adding PK columns this way is unsafe.
      if (/\bPRIMARY KEY\b/i.test(typeDef)) continue
      alters.push(
        `  ALTER TABLE "${table}" ADD COLUMN IF NOT EXISTS "${name}" ${typeDef};`,
      )
    }
  }

  if (!alters.length) return input

  const block =
    `\n  -- ensure-columns-from-create-table (schema:push may have created tables without newer cols)\n` +
    `${alters.join('\n')}\n`

  // Insert immediately before the first FK constraint DO block / ALTER.
  const markers = [
    /\n  DO \$\$ BEGIN\n\s*ALTER TABLE /,
    /\n  DO \$\$ BEGIN\n\n\s*ALTER TABLE /,
    /\n  ALTER TABLE "[^"]+" ADD CONSTRAINT /,
  ]

  for (const marker of markers) {
    const found = input.search(marker)
    if (found !== -1) {
      return input.slice(0, found) + block + input.slice(found)
    }
  }

  // Fallback: before CREATE INDEX section
  const indexAt = input.search(/\n  CREATE (UNIQUE )?INDEX /)
  if (indexAt !== -1) {
    return input.slice(0, indexAt) + block + input.slice(indexAt)
  }

  return input + block
}

// Order matters: UNIQUE INDEX before plain INDEX so we don't double-match.
src = src.replace(/CREATE UNIQUE INDEX "/g, 'CREATE UNIQUE INDEX IF NOT EXISTS "')
src = src.replace(/CREATE INDEX "/g, 'CREATE INDEX IF NOT EXISTS "')
src = src.replace(/CREATE TABLE "/g, 'CREATE TABLE IF NOT EXISTS "')

// CREATE TYPE "public"."x" AS ENUM(...); — skip lines already inside DO blocks
src = src.replace(
  /^(\s*)(CREATE TYPE "public"\."\w+" AS ENUM\([^;]*\);)\s*$/gm,
  (full, indent, statement, offset) => {
    const ahead = src.slice(Math.max(0, offset - 40), offset)
    if (ahead.includes('DO $$ BEGIN')) return full
    return wrapDoBlock(indent, statement)
  },
)

// ALTER TABLE "x" ADD CONSTRAINT "y" ... ; — skip already-wrapped statements
src = src.replace(
  /^(\s*)(ALTER TABLE "\w+" ADD CONSTRAINT "\w+"[^;]*;)\s*$/gm,
  (full, indent, statement, offset) => {
    const ahead = src.slice(Math.max(0, offset - 40), offset)
    if (ahead.includes('DO $$ BEGIN')) return full
    return wrapDoBlock(indent, statement)
  },
)

src = injectAddColumnIfNotExists(src)

// down() safety — harmless even if never used in normal CI flow
src = src.replace(/DROP TABLE "/g, 'DROP TABLE IF EXISTS "')
src = src.replace(/DROP TYPE "public"\./g, 'DROP TYPE IF EXISTS "public".')

fs.writeFileSync(file, src)
console.log(`Rewrote ${file} to be idempotent.`)
