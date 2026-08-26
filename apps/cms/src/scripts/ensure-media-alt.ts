/**
 * Backfill media.alt so Drizzle can apply NOT NULL on schema push.
 *
 *   npm run ensure:media-alt -w @oriana/cms
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
  const schema = (process.env.PAYLOAD_DB_SCHEMA || process.env.DB_SCHEMA || 'public').trim()
  return schema || 'public'
}

function quoteIdent(name: string): string {
  if (!/^[a-z_][a-z0-9_]*$/i.test(name)) {
    throw new Error(`Unsafe identifier: ${name}`)
  }
  return `"${name}"`
}

async function ensureAlt(connectionString: string) {
  const schema = schemaName()
  const pool = new pg.Pool({
    connectionString,
    max: 1,
    connectionTimeoutMillis: 60_000,
    idleTimeoutMillis: 1000,
    allowExitOnIdle: true,
  })

  try {
    const mediaPresent = await pool.query<{ present: boolean }>(
      `SELECT to_regclass($1) IS NOT NULL AS present`,
      [`${schema}.media`],
    )
    if (!mediaPresent.rows[0]?.present) {
      console.log(`${schema}.media does not exist yet — nothing to backfill.`)
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
      console.log(`${schema}.media.alt missing — run schema:push first (or after create).`)
      return
    }

    const media = `${quoteIdent(schema)}.${quoteIdent('media')}`
    const filenameExpr = names.has('filename')
      ? `NULLIF(BTRIM(filename), '')`
      : `NULL`

    const result = await pool.query(
      `UPDATE ${media}
       SET alt = COALESCE(
         NULLIF(BTRIM(alt), ''),
         ${filenameExpr},
         'Media ' || id::text
       )
       WHERE alt IS NULL OR BTRIM(COALESCE(alt, '')) = ''`,
    )
    console.log(`Ensured ${schema}.media.alt — updated ${result.rowCount ?? 0} row(s).`)
  } finally {
    await pool.end()
  }
}

async function main() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) throw new Error('DATABASE_URL is required')

  const attempts = Number(process.env.SCHEMA_PUSH_RETRIES || 5)
  let lastError: unknown
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      await ensureAlt(connectionString)
      return
    } catch (error) {
      lastError = error
      if (!isRetryable(error) || attempt === attempts) break
      const waitMs = 3000 * attempt
      console.warn(
        `ensure:media-alt connection issue (attempt ${attempt}/${attempts}); retrying in ${waitMs}ms…`,
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
