/**
 * Shared list of Postgres tables required for Oriana CMS + site seed.
 * Used by ensure-schema.ts (runs `payload migrate`) to verify migrations applied,
 * and by push-schema.ts (local dev only, not used by CI).
 */
import pg from 'pg'

export const REQUIRED_TABLES = [
  'users',
  'products',
  'categories',
  'downloads',
  'media',
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

export async function missingRequiredTables(): Promise<string[]> {
  if (process.env.PAYLOAD_FORCE_SCHEMA_PUSH === 'true') {
    return [...REQUIRED_TABLES]
  }

  const url = process.env.DATABASE_URL
  if (!url) throw new Error('DATABASE_URL is required')

  const client = new pg.Client({
    connectionString: url,
    connectionTimeoutMillis: Number(process.env.PG_CONNECT_TIMEOUT_MS || 60_000),
    ssl: url.includes('sslmode=require') ? { rejectUnauthorized: false } : undefined,
  })

  try {
    await client.connect()
    const result = await client.query<{ table_name: string }>(
      `SELECT table_name
       FROM information_schema.tables
       WHERE table_schema = 'public'
         AND table_name = ANY($1::text[])`,
      [REQUIRED_TABLES],
    )
    const present = new Set(result.rows.map((r) => r.table_name))
    return REQUIRED_TABLES.filter((t) => !present.has(t))
  } finally {
    try {
      await client.end()
    } catch {
      /* ignore */
    }
  }
}
