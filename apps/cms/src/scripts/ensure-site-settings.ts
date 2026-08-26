/**
 * Create the site_settings row/table without a full Drizzle introspect.
 *
 *   npm run ensure:site-settings -w @oriana/cms
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

async function ensure(connectionString: string) {
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
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ${schema}.site_settings (
        id serial PRIMARY KEY,
        site_name varchar,
        hotline varchar,
        copyright_text varchar,
        seo_title varchar,
        seo_title_template varchar,
        seo_description varchar,
        twitter_handle varchar,
        og_image_id integer,
        google_analytics_id varchar,
        google_tag_manager_id varchar,
        updated_at timestamptz DEFAULT now(),
        created_at timestamptz DEFAULT now()
      )
    `)

    const columns: Array<[string, string]> = [
      ['site_name', 'varchar'],
      ['hotline', 'varchar'],
      ['copyright_text', 'varchar'],
      ['seo_title', 'varchar'],
      ['seo_title_template', 'varchar'],
      ['seo_description', 'varchar'],
      ['twitter_handle', 'varchar'],
      ['og_image_id', 'integer'],
      ['google_analytics_id', 'varchar'],
      ['google_tag_manager_id', 'varchar'],
    ]
    for (const [name, type] of columns) {
      await pool.query(
        `ALTER TABLE ${schema}.site_settings ADD COLUMN IF NOT EXISTS ${name} ${type}`,
      )
    }

    await pool.query(`
      INSERT INTO ${schema}.site_settings (id, site_name, hotline, seo_title, seo_title_template, twitter_handle)
      SELECT 1, 'Oriana Inverters', '+1 (800) ORIANA-1',
        'Oriana Inverters | Advanced Solar Inverter Solutions',
        '%s | Oriana Inverters',
        '@OrianaInverters'
      WHERE NOT EXISTS (SELECT 1 FROM ${schema}.site_settings LIMIT 1)
    `)

    console.log(`Ensured ${schema}.site_settings exists.`)
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
      await ensure(connectionString)
      return
    } catch (error) {
      lastError = error
      if (!isRetryable(error) || attempt === attempts) break
      const waitMs = 3000 * attempt
      console.warn(
        `ensure:site-settings connection issue (attempt ${attempt}/${attempts}); retrying in ${waitMs}ms…`,
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
