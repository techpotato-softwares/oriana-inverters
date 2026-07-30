/**
 * Bootstrap Postgres schema via Drizzle push (PAYLOAD_DATABASE_PUSH=true).
 * Use on empty DBs before seeding when no migrations are checked in yet.
 *
 * Also re-pushes when new collections/globals are missing (e.g. site_settings
 * after a CMS content model expansion) — not only on empty databases.
 *
 * Supabase session poolers reject with EMAXCONNSESSION when too many clients
 * connect at once — keep PG_POOL_MAX=1 and retry transient pool exhaustion.
 */
import pg from 'pg'
import { getPayload } from 'payload'
import config from '@payload-config'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/** Tables that must exist for Oriana CMS + site content seed. */
const REQUIRED_TABLES = [
  'users',
  'products',
  'categories',
  'downloads',
  'media',
  // Site content globals / collections (CMS migration)
  'site_settings',
  'home',
  'about',
  'contact',
  'careers',
  'support',
  'warranty',
  'sustainability',
  'sustainability_reports',
  'where_to_buy',
  'page_intros',
  'header',
  'footer',
  'case_studies',
  'faqs',
  'videos',
  'distributors',
  'jobs',
  'partners',
  'certifications',
  'solutions',
  'content_pages',
] as const

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

async function missingTables(): Promise<string[]> {
  if (process.env.PAYLOAD_FORCE_SCHEMA_PUSH === 'true') {
    return [...REQUIRED_TABLES]
  }

  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    max: 1,
    connectionTimeoutMillis: 30_000,
    idleTimeoutMillis: 1000,
    allowExitOnIdle: true,
  })

  try {
    const result = await pool.query<{ table_name: string }>(
      `SELECT table_name
       FROM information_schema.tables
       WHERE table_schema = 'public'
         AND table_name = ANY($1::text[])`,
      [REQUIRED_TABLES],
    )
    const present = new Set(result.rows.map((r) => r.table_name))
    return REQUIRED_TABLES.filter((t) => !present.has(t))
  } finally {
    await pool.end()
  }
}

const attempts = Number(process.env.SCHEMA_PUSH_RETRIES || 5)

const missing = await missingTables()

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
