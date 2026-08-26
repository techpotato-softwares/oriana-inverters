/**
 * Bootstrap Postgres schema via Drizzle push (PAYLOAD_DATABASE_PUSH=true).
 * Use on empty DBs before seeding when no migrations are checked in yet.
 *
 * IMPORTANT: @payloadcms/db-postgres only runs pushDevSchema when
 * NODE_ENV !== 'production'. GitHub "prod" environments often set
 * NODE_ENV=production, which skips push and only runs empty prodMigrations
 * ("No migrations to run") — leaving tables missing. We force development
 * for this script when PAYLOAD_DATABASE_PUSH=true.
 *
 * Pool sizing: Payload holds 1 client for reconnect monitoring. Drizzle push
 * needs additional clients — PG_POOL_MAX must be >= 3 (not 1).
 *
 * Supabase session poolers are slow to release sessions; we wait between
 * pre-checks / retries and avoid forcing push on every QA deploy.
 */
import pg from 'pg'
import { getPayload } from 'payload'
import config from '@payload-config'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const requiredTables = [
  // Core
  'users',
  'media',
  'pages',
  'posts',
  'products',
  'categories',
  'downloads',
  // Content CMS migration
  'case_studies',
  'faqs',
  'videos',
  'distributors',
  'jobs',
  'certifications',
  'awards',
  'partners',
  'solutions',
  'warranty_plans',
  'sustainability_reports',
  // Globals (Payload stores each as a table)
  'header',
  'footer',
  'site_settings',
  'home',
  'about',
  'careers',
  'support',
  'sustainability',
  'contact',
  // Plugins / folders
  'payload_folders',
  'forms',
  'form_submissions',
  'redirects',
  'search',
]

function dbSchema(): string {
  const schema = (process.env.PAYLOAD_DB_SCHEMA || process.env.DB_SCHEMA || 'public').trim()
  return schema || 'public'
}

/** Quote a simple PG identifier (our schemas are snake_case). */
function quoteIdent(name: string): string {
  if (!/^[a-z_][a-z0-9_]*$/i.test(name)) {
    throw new Error(`Unsafe schema name: ${name}`)
  }
  return `"${name}"`
}

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
    text.includes('Connection terminated') ||
    text.includes('remaining connection slots')
  )
}

async function withPool<T>(fn: (pool: pg.Pool) => Promise<T>): Promise<T> {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    max: 1,
    connectionTimeoutMillis: 60_000,
    idleTimeoutMillis: 500,
    allowExitOnIdle: true,
  })
  try {
    return await fn(pool)
  } finally {
    await pool.end()
  }
}

async function ensurePostgresSchema(): Promise<void> {
  const schema = dbSchema()
  if (schema === 'public') return

  await withPool(async (pool) => {
    const ident = quoteIdent(schema)
    await pool.query(`CREATE SCHEMA IF NOT EXISTS ${ident}`)
    console.log(`Ensured Postgres schema ${schema} exists`)
  })
}

/**
 * Fix data that would block Drizzle NOT NULL / similar ALTERs on push.
 * QA media rows often have null alt from before the field was required.
 */
async function preflightDataFixes(): Promise<void> {
  const schema = dbSchema()
  const media = `${quoteIdent(schema)}.${quoteIdent('media')}`

  await withPool(async (pool) => {
    const mediaExists = await pool.query<{ present: boolean }>(
      `SELECT to_regclass($1) IS NOT NULL AS present`,
      [`${schema}.media`],
    )
    if (!mediaExists.rows[0]?.present) {
      console.log('preflight: media table missing — skip alt backfill')
      return
    }

    const cols = await pool.query<{ column_name: string }>(
      `SELECT column_name
       FROM information_schema.columns
       WHERE table_schema = $1 AND table_name = 'media'
         AND column_name IN ('alt', 'filename')`,
      [schema],
    )
    const names = new Set(cols.rows.map((r) => r.column_name))
    if (!names.has('alt')) {
      console.log('preflight: media.alt column missing — skip backfill')
      return
    }

    const filenameExpr = names.has('filename') ? `NULLIF(BTRIM(filename), '')` : `NULL`
    const result = await pool.query(
      `UPDATE ${media}
       SET alt = COALESCE(
         NULLIF(BTRIM(alt), ''),
         ${filenameExpr},
         'Media ' || id::text
       )
       WHERE alt IS NULL OR BTRIM(COALESCE(alt, '')) = ''`,
    )
    console.log(`preflight: backfilled media.alt on ${result.rowCount ?? 0} row(s)`)
  })
}

async function missingTables(): Promise<string[]> {
  const schema = dbSchema()
  // Single round-trip — avoid burning multiple session-pooler slots.
  return withPool(async (pool) => {
    const result = await pool.query<{ table_name: string }>(
      `SELECT wanted.table_name
       FROM unnest($1::text[]) AS wanted(table_name)
       WHERE to_regclass(($2::text || '.' || wanted.table_name)) IS NULL`,
      [requiredTables, schema],
    )
    return result.rows.map((row) => row.table_name)
  })
}

async function schemaAlreadyPresent(): Promise<boolean> {
  if (process.env.PAYLOAD_FORCE_SCHEMA_PUSH === 'true') return false

  const missing = await missingTables()
  if (missing.length > 0) {
    console.log(
      `schema:push required because missing tables in ${dbSchema()}: ${missing.join(', ')}`,
    )
    return false
  }
  return true
}

// Payload connect.js: push only when NODE_ENV !== 'production'
process.env.PAYLOAD_DATABASE_PUSH = 'true'
process.env.PAYLOAD_FORCE_DRIZZLE_PUSH = process.env.PAYLOAD_FORCE_DRIZZLE_PUSH || 'true'
// Payload holds 1 reconnect client; drizzle push needs headroom.
const poolMax = Number(process.env.PG_POOL_MAX || 3)
process.env.PG_POOL_MAX = String(Math.max(poolMax, 3))
process.env.PG_CONNECT_TIMEOUT_MS = process.env.PG_CONNECT_TIMEOUT_MS || '60000'

if (process.env.NODE_ENV === 'production') {
  console.warn(
    'NODE_ENV=production disables Payload drizzle push — forcing NODE_ENV=development for schema:push',
  )
}
// NODE_ENV is typed read-only on ProcessEnv; mutate via Object.assign for CI push.
Object.assign(process.env, { NODE_ENV: 'development' })

const attempts = Number(process.env.SCHEMA_PUSH_RETRIES || 8)
const poolerCooldownMs = Number(process.env.SCHEMA_PUSH_COOLDOWN_MS || 8_000)

if (await schemaAlreadyPresent()) {
  console.log(`Schema already present (core tables exist in ${dbSchema()}); skipping schema:push.`)
  console.log('Set PAYLOAD_FORCE_SCHEMA_PUSH=true to push anyway.')
  process.exit(0)
}

await ensurePostgresSchema()
await preflightDataFixes()
// Let Supabase/session poolers release the probe connection before Payload opens its pool.
console.log(`Waiting ${poolerCooldownMs}ms for DB pooler to release probe connections…`)
await sleep(poolerCooldownMs)

let lastError: unknown

for (let attempt = 1; attempt <= attempts; attempt++) {
  try {
    const payload = await getPayload({ config })
    payload.logger.info('Database schema push complete.')
    await payload.destroy()

    // Cooldown before verification query (separate pool).
    await sleep(Math.min(poolerCooldownMs, 5_000))

    const missing = await missingTables()
    if (missing.length > 0) {
      throw new Error(
        `schema:push finished but tables still missing in ${dbSchema()}: ${missing.join(', ')}. ` +
          `Payload skips push when NODE_ENV=production; ensure this script forced development mode.`,
      )
    }

    console.log(`Verified core tables in ${dbSchema()}: ${requiredTables.join(', ')}`)
    process.exit(0)
  } catch (error) {
    lastError = error

    if (!isPoolExhausted(error) || attempt === attempts) {
      break
    }

    const waitMs = poolerCooldownMs * attempt
    console.warn(
      `schema:push hit pool/connect limit (attempt ${attempt}/${attempts}); retrying in ${waitMs}ms…`,
    )
    await sleep(waitMs)
  }
}

console.error(lastError)
process.exit(1)
