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
    text.includes('too many clients')
  )
}

async function schemaAlreadyPresent(): Promise<boolean> {
  if (process.env.PAYLOAD_FORCE_SCHEMA_PUSH === 'true') return false

  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    max: 1,
    connectionTimeoutMillis: 30_000,
    idleTimeoutMillis: 1000,
    allowExitOnIdle: true,
  })

  try {
    const result = await pool.query<{ present: boolean }>(
      `SELECT to_regclass('public.users') IS NOT NULL AS present`,
    )
    if (!result.rows[0]?.present) return false

    // Media.prefix is required by @payloadcms/storage-s3. Older DBs were pushed
    // without S3 enabled, so the column is missing and /api/media 500s in prod.
    const prefixCol = await pool.query<{ present: boolean }>(
      `SELECT EXISTS (
         SELECT 1
         FROM information_schema.columns
         WHERE table_schema = 'public'
           AND table_name = 'media'
           AND column_name = 'prefix'
       ) AS present`,
    )
    if (!prefixCol.rows[0]?.present) {
      console.log('media.prefix column missing — will push schema to add it.')
      return false
    }

    return true
  } finally {
    await pool.end()
  }
}

const attempts = Number(process.env.SCHEMA_PUSH_RETRIES || 5)

if (await schemaAlreadyPresent()) {
  console.log('Schema already present (public.users exists); skipping schema:push.')
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
