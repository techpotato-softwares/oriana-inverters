/**
 * Open a short-lived pg.Client, prove connectivity, then release it before Payload
 * opens its pool (Payload permanently checks out 1 client on connect).
 */
import pg from 'pg'

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function warmDb(label = 'DB warm-up'): Promise<void> {
  const url = process.env.DATABASE_URL
  if (!url) throw new Error('DATABASE_URL is required')

  const client = new pg.Client({
    connectionString: url,
    connectionTimeoutMillis: Number(process.env.PG_CONNECT_TIMEOUT_MS || 30_000),
    ssl: url.includes('sslmode=require') ? { rejectUnauthorized: false } : undefined,
  })

  try {
    await client.connect()
    await client.query('select 1')
    console.log(`${label} ok`)
  } finally {
    try {
      await client.end()
    } catch {
      /* ignore */
    }
  }

  // Let the pooler recycle this session before Payload holds one permanently
  await sleep(Number(process.env.SEED_WARMUP_PAUSE_MS || 3000))
}
