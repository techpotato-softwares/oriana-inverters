#!/usr/bin/env node
/**
 * Patch drizzle-kit + Payload push helpers for non-interactive CI.
 *
 * Enums use promptNamedWithSchemasConflict (not promptNamedConflict).
 * Always inject a unique per-function guard so later patches are not skipped.
 */
import fs from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const fileMarker = '/* ORIANA_NONINTERACTIVE_PATCH_FILE */'
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')

function ensureInject(src, { name, find, inject, guardId }) {
  if (!src.includes(find)) {
    console.warn(`  skip ${name}: needle not found`)
    return { src, ok: false }
  }
  if (src.includes(guardId)) {
    console.log(`  already patched ${name}`)
    return { src, ok: true }
  }
  // Insert immediately after the function opening line
  const next = src.replace(find, `${find}\n${inject}`)
  if (next === src) {
    console.warn(`  skip ${name}: replace failed`)
    return { src, ok: false }
  }
  console.log(`  patched ${name}`)
  return { src: next, ok: true }
}

const drizzleApi = require.resolve('drizzle-kit/api')
console.log('Patching', path.relative(process.cwd(), drizzleApi))

let drizzleSrc = fs.readFileSync(drizzleApi, 'utf8')
const patches = [
  {
    name: 'promptNamedConflict',
    guardId: 'ORIANA_NI_NAMED',
    find: 'promptNamedConflict = async (newItems, missingItems, entity) => {',
    inject: `      /* ORIANA_NI_NAMED */
      if (process.env.DRIZZLE_PUSH_NONINTERACTIVE === "true") {
        console.log("[drizzle] non-interactive: create all " + entity + "(s), skip rename prompts");
        return { created: newItems, renamed: [], deleted: missingItems };
      }`,
  },
  {
    name: 'promptNamedWithSchemasConflict',
    guardId: 'ORIANA_NI_NAMED_SCHEMA',
    find: 'promptNamedWithSchemasConflict = async (newItems, missingItems, entity) => {',
    inject: `      /* ORIANA_NI_NAMED_SCHEMA */
      if (process.env.DRIZZLE_PUSH_NONINTERACTIVE === "true") {
        console.log("[drizzle] non-interactive: create all " + entity + "(s), skip rename prompts");
        return { created: newItems, renamed: [], moved: [], deleted: missingItems };
      }`,
  },
  {
    name: 'promptColumnsConflicts',
    guardId: 'ORIANA_NI_COLUMNS',
    find: 'promptColumnsConflicts = async (tableName, newColumns, missingColumns) => {',
    inject: `      /* ORIANA_NI_COLUMNS */
      if (process.env.DRIZZLE_PUSH_NONINTERACTIVE === "true") {
        console.log("[drizzle] non-interactive: create all columns in " + tableName + ", skip rename prompts");
        return { created: newColumns, renamed: [], deleted: missingColumns };
      }`,
  },
  {
    name: 'promptSchemasConflict',
    guardId: 'ORIANA_NI_SCHEMAS',
    find: 'promptSchemasConflict = async (newSchemas, missingSchemas) => {',
    inject: `      /* ORIANA_NI_SCHEMAS */
      if (process.env.DRIZZLE_PUSH_NONINTERACTIVE === "true") {
        console.log("[drizzle] non-interactive: create all schemas, skip rename prompts");
        return { created: newSchemas, renamed: [], deleted: missingSchemas };
      }`,
  },
  // Belt-and-suspenders: enums always go through this resolver
  {
    name: 'enumsResolver',
    guardId: 'ORIANA_NI_ENUMS_RESOLVER',
    find: 'enumsResolver = async (input) => {',
    inject: `      /* ORIANA_NI_ENUMS_RESOLVER */
      if (process.env.DRIZZLE_PUSH_NONINTERACTIVE === "true") {
        console.log("[drizzle] non-interactive: enumsResolver create-all");
        return {
          created: input.created,
          deleted: input.deleted,
          moved: [],
          renamed: [],
        };
      }`,
  },
]

let anyOk = false
for (const p of patches) {
  const result = ensureInject(drizzleSrc, p)
  drizzleSrc = result.src
  if (result.ok) anyOk = true
}

if (!anyOk) {
  throw new Error('Failed to apply any drizzle-kit non-interactive patches')
}

if (!drizzleSrc.includes(fileMarker)) {
  drizzleSrc = `${fileMarker}\n${drizzleSrc}`
}
fs.writeFileSync(drizzleApi, drizzleSrc)
console.log('  wrote drizzle-kit/api')

// Verify the critical enum path is patched
if (!drizzleSrc.includes('ORIANA_NI_NAMED_SCHEMA') || !drizzleSrc.includes('ORIANA_NI_ENUMS_RESOLVER')) {
  throw new Error(
    'Critical enum patches missing after write (ORIANA_NI_NAMED_SCHEMA / ORIANA_NI_ENUMS_RESOLVER)',
  )
}
console.log('  verified enum non-interactive guards present')

const pushDevPath = path.join(
  repoRoot,
  'node_modules/@payloadcms/drizzle/dist/utilities/pushDevSchema.js',
)
console.log('Patching', path.relative(process.cwd(), pushDevPath))
if (!fs.existsSync(pushDevPath)) {
  console.warn('  skip pushDevSchema: file not found at', pushDevPath)
} else {
  let pushSrc = fs.readFileSync(pushDevPath, 'utf8')
  const pushGuard = 'ORIANA_NI_PUSH_WARNINGS'
  if (pushSrc.includes(pushGuard)) {
    console.log('  pushDevSchema already patched')
  } else {
    const replaced = pushSrc.replace(
      /const \{ confirm: acceptWarnings \} = await prompts\([\s\S]*?\}\);/,
      `/* ${pushGuard} */
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
