/**
 * Bootstrap Postgres schema via Drizzle push (PAYLOAD_DATABASE_PUSH=true).
 * Use on empty DBs before seeding when no migrations are checked in yet.
 *
 * Supabase session poolers reject with EMAXCONNSESSION when too many clients
 * connect at once — keep PG_POOL_MAX=1 and retry transient pool exhaustion.
 */
import pg from 'pg'
import { getPayload } from 'payload'
import config from '@payload-config'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const isPoolExhausted = (error: unknown): boolean => {
  const parts: unknown[] = [error]
  if (error && typeof error === 'object') {
    const err = error as { cause?: unknown; message?: unknown }
    if (err.cause) parts.push(err.cause)
    if (err.message) parts.push(err.message)
    if (err.cause && typeof err.cause === 'object' && 'message' in err.cause) {
      parts.push((err.cause as { message: unknown }).message)
    }
  }
  const text = parts.map(String).join(' ')
  return (
    text.includes('EMAXCONNSESSION') ||
    text.includes('max clients reached') ||
    text.includes('too many clients') ||
    text.includes('timeout exceeded when trying to connect') ||
    text.includes('timeout')
  )
}

async function schemaAlreadyPresent(): Promise<boolean> {
  if (process.env.PAYLOAD_FORCE_SCHEMA_PUSH === 'true') return false

  const schema = process.env.PAYLOAD_DB_SCHEMA || process.env.DB_SCHEMA || 'public'
  // Do not skip push unless multiple core tables exist.
  // This avoids false positives when only some tables were created.
  const requiredTables = ['users', 'categories', 'media', 'posts', 'pages']

  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    max: 1,
    connectionTimeoutMillis: 30_000,
    idleTimeoutMillis: 1000,
    allowExitOnIdle: true,
  })

  try {
    const rows = await Promise.all(
      requiredTables.map(async (table) => {
        const regclass = `${schema}.${table}`
        const result = await pool.query<{ present: boolean }>(
          `SELECT to_regclass($1) IS NOT NULL AS present`,
          [regclass],
        )
        return { table, present: Boolean(result.rows[0]?.present) }
      }),
    )
    const missing = rows.filter((row) => !row.present).map((row) => row.table)
    if (missing.length > 0) {
      console.log(
        `schema:push required because missing tables in ${schema}: ${missing.join(', ')}`,
      )
      return false
    }
    return true
  } finally {
    await pool.end()
  }
}

const attempts = Number(process.env.SCHEMA_PUSH_RETRIES || 5)

if (await schemaAlreadyPresent()) {
  const schema = process.env.PAYLOAD_DB_SCHEMA || process.env.DB_SCHEMA || 'public'
  console.log(`Schema already present (core tables exist in ${schema}); skipping schema:push.`)
  console.log('Set PAYLOAD_FORCE_SCHEMA_PUSH=true to push anyway.')
  process.exit(0)
}

let lastError: unknown

for (let attempt = 1; attempt <= attempts; attempt++) {
  try {
    const payload = await getPayload({ config })
    payload.logger.info('Database schema push complete.')
    await payload.destroy()
    process.exit(0)
  } catch (error) {
    lastError = error

    if (!isPoolExhausted(error) || attempt === attempts) {
      break
    }

    const waitMs = 3000 * attempt
    console.warn(
      `schema:push hit Supabase pool limit (attempt ${attempt}/${attempts}); retrying in ${waitMs}ms…`,
    )
    await sleep(waitMs)
  }
}

console.error(lastError)
process.exit(1)
