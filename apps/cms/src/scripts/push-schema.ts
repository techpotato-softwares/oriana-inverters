/**
 * LOCAL DEV ONLY — not used by CI.
 *
 * Bootstrap Postgres schema via Drizzle push (PAYLOAD_DATABASE_PUSH=true).
 *
 * CI/production use committed migrations instead (`npm run migrate`, see
 * src/migrations/ and src/scripts/ensure-schema.ts). drizzle-kit's push can
 * prompt interactively to disambiguate create-vs-rename for enums/tables
 * (e.g. "Is enum_x created or renamed from another enum?") and there is no
 * flag to auto-answer it — in a non-interactive shell (CI) this hangs forever.
 *
 * Use this only for quick local prototyping before running
 * `payload migrate:create` to capture the change as a real migration.
 *
 * Supabase session poolers are tiny and flake under Drizzle introspect (many catalog
 * queries). We:
 *  - use a short-lived Client for the pre-check (never leave a Pool open)
 *  - allow PG_POOL_MAX>=2 during push (introspect can need >1 connection)
 *  - retry on pool exhaustion AND connection timeouts
 */
import { getPayload } from 'payload'
import config from '@payload-config'

import { missingRequiredTables } from './required-tables'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function errorText(error: unknown): string {
  const parts: unknown[] = [error]
  if (error && typeof error === 'object') {
    const err = error as { cause?: unknown; message?: unknown }
    if (err.cause) parts.push(err.cause)
    if (err.message) parts.push(err.message)
    if (err.cause && typeof err.cause === 'object' && 'message' in err.cause) {
      parts.push((err.cause as { message: unknown }).message)
    }
  }
  return parts.map(String).join(' ')
}

const isRetryableDbError = (error: unknown): boolean => {
  const text = errorText(error)
  return (
    text.includes('EMAXCONNSESSION') ||
    text.includes('max clients reached') ||
    text.includes('too many clients') ||
    text.includes('timeout exceeded when trying to connect') ||
    text.includes('Connection terminated') ||
    text.includes('ECONNRESET') ||
    text.includes('ECONNREFUSED') ||
    text.includes('ETIMEDOUT') ||
    text.includes('remaining connection slots') ||
    text.includes('sorry, too many clients') ||
    text.includes('payloadInitError')
  )
}

const attempts = Number(process.env.SCHEMA_PUSH_RETRIES || 3)

let missing: string[]
try {
  missing = await missingRequiredTables()
} catch (error) {
  console.warn('Pre-check of tables failed (will attempt schema:push anyway):', errorText(error))
  missing = ['(pre-check failed)']
}

if (missing.length === 0) {
  console.log('Schema already up to date (all required tables present); skipping schema:push.')
  console.log('Set PAYLOAD_FORCE_SCHEMA_PUSH=true to push anyway.')
  process.exit(0)
}

if (process.env.PAYLOAD_FORCE_SCHEMA_PUSH === 'true') {
  console.log('PAYLOAD_FORCE_SCHEMA_PUSH=true — running schema:push.')
} else {
  console.log(`Missing tables (${missing.length}): ${missing.join(', ')}`)
  console.log('Running schema:push to create/update them…')
}

// Give the pooler a moment to recycle the pre-check session before Payload opens its pool.
await sleep(Number(process.env.SCHEMA_PUSH_PAUSE_MS || 2000))

let lastError: unknown

for (let attempt = 1; attempt <= attempts; attempt++) {
  try {
    console.log(`schema:push attempt ${attempt}/${attempts} (PG_POOL_MAX=${process.env.PG_POOL_MAX || 'default'})`)
    const payload = await getPayload({ config })
    payload.logger.info('Database schema push complete.')
    await payload.destroy()
    // Extra settle so the next CI step (seed) does not race the same pooler slots.
    await sleep(Number(process.env.SCHEMA_PUSH_SETTLE_MS || 5000))
    process.exit(0)
  } catch (error) {
    lastError = error

    if (!isRetryableDbError(error) || attempt === attempts) {
      break
    }

    const waitMs = 5000 * attempt
    console.warn(
      `schema:push failed with retryable DB error (attempt ${attempt}/${attempts}); retrying in ${waitMs}ms…`,
    )
    console.warn(errorText(error).slice(0, 400))
    await sleep(waitMs)
  }
}

console.error(lastError)
process.exit(1)
