/**
 * If required CMS tables are missing, run `npm run schema:push` in a subprocess
 * so PAYLOAD_DATABASE_PUSH is applied with a fresh config module load.
 */
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { missingRequiredTables } from './required-tables'

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

const cmsRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

export async function ensureSchema(): Promise<void> {
  // Allow CI to opt out when push is known-broken and schema was applied out-of-band
  if (process.env.SEED_ENSURE_SCHEMA === 'false') {
    const missing = await missingRequiredTables().catch(() => ['(check failed)'])
    if (missing.length > 0) {
      throw new Error(
        `Missing tables (${missing.length}): ${missing.slice(0, 8).join(', ')}${missing.length > 8 ? '…' : ''}. ` +
          `Run schema:push (or unset SEED_ENSURE_SCHEMA=false).`,
      )
    }
    return
  }

  let missing: string[]
  try {
    missing = await missingRequiredTables()
  } catch (error) {
    console.warn('Could not list tables — running schema:push anyway:', String(error))
    missing = ['(unknown)']
  }

  if (missing.length === 0) {
    console.log('Schema check ok — all required tables present.')
    return
  }

  console.log(
    `Missing tables (${missing.length}): ${missing.join(', ')}\n` +
      'Running schema:push before seed…',
  )

  const result = spawnSync('npm', ['run', 'schema:push'], {
    cwd: cmsRoot,
    stdio: 'inherit',
    env: process.env,
    shell: process.platform === 'win32',
  })

  if (result.status !== 0) {
    throw new Error(`schema:push failed with exit code ${result.status ?? 1}`)
  }

  // Recycle pooler sessions held during push before Payload seed opens a new pool
  await sleep(Number(process.env.SEED_WARMUP_PAUSE_MS || 5000))

  const stillMissing = await missingRequiredTables()
  if (stillMissing.length > 0) {
    throw new Error(
      `schema:push finished but tables still missing: ${stillMissing.join(', ')}`,
    )
  }

  console.log('Schema ensure ok.')
}
