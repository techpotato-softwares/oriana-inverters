/**
 * Ensure media.prefix exists without a full Drizzle schema push.
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

function schemaName(): string {
  return process.env.PAYLOAD_DB_SCHEMA || process.env.DB_SCHEMA || 'public'
}

async function ensurePrefix(connectionString: string) {
  const schema = schemaName()
  const pool = new pg.Pool({
    connectionString,
    max: 1,
    connectionTimeoutMillis: 60_000,
    idleTimeoutMillis: 1000,
    allowExitOnIdle: true,
  })

  try {
    await pool.query(`CREATE SCHEMA IF NOT EXISTS ${schema}`)
    const mediaTable = await pool.query<{ present: boolean }>(
      `SELECT to_regclass($1) IS NOT NULL AS present`,
      [`${schema}.media`],
    )
    if (!mediaTable.rows[0]?.present) {
      console.log(`${schema}.media does not exist yet — run npm run schema:push first.`)
      return
    }

    await pool.query(`
      ALTER TABLE ${schema}.media
      ADD COLUMN IF NOT EXISTS prefix varchar
    `)
    console.log(`Ensured ${schema}.media.prefix exists.`)
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
