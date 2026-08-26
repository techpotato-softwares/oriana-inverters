#!/usr/bin/env node
/**
 * Patch drizzle-kit + Payload push helpers for non-interactive CI.
 *
 * drizzle-kit's pushSchema prompts "create or rename enum?" via hanji and hangs
 * in GitHub Actions. With DRIZZLE_PUSH_NONINTERACTIVE=true, always create
 * (never rename) and drop leftover unused objects — same as selecting the
 * first (+) option on every prompt.
 *
 * Also auto-accept Payload's data-loss warning confirm in CI.
 */
import fs from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const marker = '/* ORIANA_NONINTERACTIVE_PATCH */'
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')

function injectAfter(src, find, inject) {
  if (!src.includes(find)) return { src, ok: false }
  if (src.includes(inject.trim().slice(0, 40))) return { src, ok: true, already: true }
  return { src: src.replace(find, `${find}${inject}`), ok: true }
}

const drizzleApi = require.resolve('drizzle-kit/api')
console.log('Patching', path.relative(process.cwd(), drizzleApi))

let drizzleSrc = fs.readFileSync(drizzleApi, 'utf8')
if (drizzleSrc.includes(marker)) {
  console.log('  drizzle-kit/api already patched')
} else {
  const patches = [
    {
      name: 'promptNamedConflict',
      find: 'promptNamedConflict = async (newItems, missingItems, entity) => {',
      inject: `
      if (process.env.DRIZZLE_PUSH_NONINTERACTIVE === "true") {
        console.log("[drizzle] non-interactive: create all " + entity + "(s), skip rename prompts");
        return { created: newItems, renamed: [], deleted: missingItems };
      }`,
    },
    {
      name: 'promptNamedWithSchemasConflict',
      find: 'promptNamedWithSchemasConflict = async (newItems, missingItems, entity) => {',
      inject: `
      if (process.env.DRIZZLE_PUSH_NONINTERACTIVE === "true") {
        console.log("[drizzle] non-interactive: create all " + entity + "(s), skip rename prompts");
        return { created: newItems, renamed: [], moved: [], deleted: missingItems };
      }`,
    },
    {
      name: 'promptColumnsConflicts',
      find: 'promptColumnsConflicts = async (tableName, newColumns, missingColumns) => {',
      inject: `
      if (process.env.DRIZZLE_PUSH_NONINTERACTIVE === "true") {
        console.log("[drizzle] non-interactive: create all columns in " + tableName + ", skip rename prompts");
        return { created: newColumns, renamed: [], deleted: missingColumns };
      }`,
    },
    {
      name: 'promptSchemasConflict',
      find: 'promptSchemasConflict = async (newSchemas, missingSchemas) => {',
      inject: `
      if (process.env.DRIZZLE_PUSH_NONINTERACTIVE === "true") {
        console.log("[drizzle] non-interactive: create all schemas, skip rename prompts");
        return { created: newSchemas, renamed: [], deleted: missingSchemas };
      }`,
    },
  ]

  for (const p of patches) {
    const result = injectAfter(drizzleSrc, p.find, p.inject)
    if (!result.ok) {
      console.warn(`  skip ${p.name}: needle not found`)
      continue
    }
    drizzleSrc = result.src
    console.log(`  patched ${p.name}`)
  }

  drizzleSrc = `${marker}\n${drizzleSrc}`
  fs.writeFileSync(drizzleApi, drizzleSrc)
  console.log('  wrote drizzle-kit/api')
}

const pushDevPath = path.join(
  repoRoot,
  'node_modules/@payloadcms/drizzle/dist/utilities/pushDevSchema.js',
)
console.log('Patching', path.relative(process.cwd(), pushDevPath))
if (!fs.existsSync(pushDevPath)) {
  console.warn('  skip pushDevSchema: file not found at', pushDevPath)
} else {
  let pushSrc = fs.readFileSync(pushDevPath, 'utf8')
  if (pushSrc.includes(marker)) {
    console.log('  pushDevSchema already patched')
  } else {
    const replaced = pushSrc.replace(
      /const \{ confirm: acceptWarnings \} = await prompts\([\s\S]*?\}\);/,
      `${marker}
        let acceptWarnings = true;
        if (process.env.DRIZZLE_PUSH_NONINTERACTIVE !== "true") {
            ({ confirm: acceptWarnings } = await prompts({
            name: 'confirm',
            type: 'confirm',
            initial: false,
            message
        }, {
            onCancel: ()=>{
                process.exit(0);
            }
        }));
        } else {
            console.log('[drizzle] non-interactive: accepting schema push warnings');
        }`,
    )
    if (replaced === pushSrc) {
      console.warn('  skip pushDevSchema: confirm prompt not found')
    } else {
      fs.writeFileSync(pushDevPath, replaced)
      console.log('  patched pushDevSchema auto-accept warnings')
    }
  }
}

console.log('Drizzle non-interactive patches applied.')
