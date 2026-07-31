#!/usr/bin/env node
/**
 * Rewrite a generated Payload/Drizzle migration's raw SQL to be idempotent:
 *  - CREATE TABLE / CREATE INDEX / CREATE UNIQUE INDEX -> add IF NOT EXISTS
 *  - CREATE TYPE ... AS ENUM(...) -> wrap in DO block, ignore duplicate_object
 *  - ALTER TABLE ... ADD CONSTRAINT ... -> wrap in DO block, ignore duplicate_object
 *    (Postgres has no `ADD CONSTRAINT IF NOT EXISTS`)
 *  - DROP TABLE / DROP TYPE (down migration) -> add IF EXISTS
 *
 * Needed because some target databases (QA) already have a partial schema from
 * earlier interrupted `schema:push` runs, and committed migrations must be safe
 * to apply on top of that without erroring on "already exists".
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

// Order matters: UNIQUE INDEX before plain INDEX so we don't double-match.
src = src.replace(/CREATE UNIQUE INDEX "/g, 'CREATE UNIQUE INDEX IF NOT EXISTS "')
src = src.replace(/CREATE INDEX "/g, 'CREATE INDEX IF NOT EXISTS "')
src = src.replace(/CREATE TABLE "/g, 'CREATE TABLE IF NOT EXISTS "')

// CREATE TYPE "public"."x" AS ENUM(...);
src = src.replace(
  /^(\s*)(CREATE TYPE "public"\."\w+" AS ENUM\([^;]*\);)\s*$/gm,
  (_match, indent, statement) => wrapDoBlock(indent, statement),
)

// ALTER TABLE "x" ADD CONSTRAINT "y" ... ;
src = src.replace(
  /^(\s*)(ALTER TABLE "\w+" ADD CONSTRAINT "\w+"[^;]*;)\s*$/gm,
  (_match, indent, statement) => wrapDoBlock(indent, statement),
)

// down() safety — harmless even if never used in normal CI flow
src = src.replace(/DROP TABLE "/g, 'DROP TABLE IF EXISTS "')
src = src.replace(/DROP TYPE "public"\./g, 'DROP TYPE IF EXISTS "public".')

fs.writeFileSync(file, src)
console.log(`Rewrote ${file} to be idempotent.`)
