/**
 * Apply pending Payload/Drizzle migrations (committed under src/migrations) before
 * seeding. This runs plain SQL via `payload migrate` — no interactive prompts,
 * safe for CI. Do NOT use `schema:push` here: drizzle-kit's push can prompt to
 * disambiguate create-vs-rename for enums/tables and hangs forever without a TTY.
 */
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { missingRequiredTables } from './required-tables'

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

const cmsRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

export async function ensureSchema(): Promise<void> {
  // Allow CI to opt out when migrations were already applied out-of-band
  if (process.env.SEED_ENSURE_SCHEMA === 'false') {
    const missing = await missingRequiredTables().catch(() => ['(check failed)'])
    if (missing.length > 0) {
      throw new Error(
        `Missing tables (${missing.length}): ${missing.slice(0, 8).join(', ')}${missing.length > 8 ? '…' : ''}. ` +
          `Run "npm run migrate" (or unset SEED_ENSURE_SCHEMA=false).`,
      )
    }
    return
  }

  console.log('Applying pending Payload migrations (idempotent)…')

  const result = spawnSync('npm', ['run', 'migrate'], {
    cwd: cmsRoot,
    stdio: 'inherit',
    env: process.env,
    shell: process.platform === 'win32',
  })

  if (result.status !== 0) {
    throw new Error(`payload migrate failed with exit code ${result.status ?? 1}`)
  }

  // Recycle pooler sessions held during migrate before seed opens a new pool
  await sleep(Number(process.env.SEED_WARMUP_PAUSE_MS || 3000))

  const stillMissing = await missingRequiredTables()
  if (stillMissing.length > 0) {
    throw new Error(
      `Migrations ran but tables still missing: ${stillMissing.join(', ')}. ` +
        'Check that the migration file covers these tables (regenerate with `payload migrate:create`).',
    )
  }

  console.log('Schema ensure ok.')
}
