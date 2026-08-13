/**
 * Ensure media.prefix exists without a full Drizzle schema push.
 * Full schema:push against Supabase from GitHub Actions often times out; this
 * single ALTER is enough for @payloadcms/storage-s3.
 *
 *   npm run ensure:media-prefix -w @oriana/cms
 */
import pg from 'pg'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const isRetryable = (error: unknown): boolean => {
  const text = String(error)
  return (
    text.includes('timeout') ||
    text.includes('ECONNRESET') ||
    text.includes('ECONNREFUSED') ||
    text.includes('EMAXCONNSESSION') ||
    text.includes('max clients reached') ||
    text.includes('too many clients')
  )
}

async function ensurePrefix(connectionString: string) {
  const pool = new pg.Pool({
    connectionString,
    max: 1,
    connectionTimeoutMillis: 60_000,
    idleTimeoutMillis: 1000,
    allowExitOnIdle: true,
  })

  try {
    const mediaTable = await pool.query<{ present: boolean }>(
      `SELECT to_regclass('public.media') IS NOT NULL AS present`,
    )
    if (!mediaTable.rows[0]?.present) {
      console.log('public.media does not exist yet — run npm run schema:push first.')
      return
    }

    await pool.query(`
      ALTER TABLE public.media
      ADD COLUMN IF NOT EXISTS prefix varchar,
      ADD COLUMN IF NOT EXISTS use_as_home_hero boolean DEFAULT false,
      ADD COLUMN IF NOT EXISTS home_hero_link_type varchar,
      ADD COLUMN IF NOT EXISTS home_hero_product_id integer,
      ADD COLUMN IF NOT EXISTS home_hero_post_id integer,
      ADD COLUMN IF NOT EXISTS home_hero_headline varchar,
      ADD COLUMN IF NOT EXISTS home_hero_cta varchar,
      ADD COLUMN IF NOT EXISTS home_hero_sort numeric
    `)
    console.log('Ensured public.media.prefix and homepage hero columns exist.')
  } finally {
    await pool.end()
  }
}

async function main() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error('DATABASE_URL is required')
  }

  const attempts = Number(process.env.SCHEMA_PUSH_RETRIES || 5)
  let lastError: unknown

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      await ensurePrefix(connectionString)
      return
    } catch (error) {
      lastError = error
      if (!isRetryable(error) || attempt === attempts) break
      const waitMs = 3000 * attempt
      console.warn(
        `ensure:media-prefix connection issue (attempt ${attempt}/${attempts}); retrying in ${waitMs}ms…`,
      )
      await sleep(waitMs)
    }
  }

  throw lastError
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
