/**
 * One-off / deploy-safe fix: ensure media.prefix exists.
 * Prefer `npm run schema:push` (now detects the missing column). This script is
 * a lightweight ALTER when you only need the column without a full Drizzle push.
 *
 *   cd apps/cms && npx tsx src/scripts/ensure-media-prefix.ts
 */
import pg from 'pg'

async function main() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error('DATABASE_URL is required')
  }

  const pool = new pg.Pool({
    connectionString,
    max: 1,
    connectionTimeoutMillis: 30_000,
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
      ADD COLUMN IF NOT EXISTS prefix varchar
    `)
    console.log('Ensured public.media.prefix exists.')
  } finally {
    await pool.end()
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
