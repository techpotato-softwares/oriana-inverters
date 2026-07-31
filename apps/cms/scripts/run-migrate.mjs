#!/usr/bin/env node
/**
 * Apply committed Payload migrations non-interactively (CI-safe).
 *
 * After drizzle `schema:push` / Payload "dev mode", a row with batch=-1 is written to
 * `payload_migrations`. The next `payload migrate` then prompts:
 *   "It looks like you've run Payload in dev mode… data loss will occur. (y/N)"
 * That hangs forever in GitHub Actions (no TTY). Exit code 124 = shell `timeout`.
 *
 * There is no --force flag on plain `migrate` (only on migrate:fresh). So we delete
 * the batch=-1 marker first, then run migrate. Our initial migration is idempotent
 * (IF NOT EXISTS / DO $$ … duplicate_object) so re-applying atop a partial push is safe.
 *
 * Usage: npm run migrate  (from apps/cms)
 */
import { spawnSync } from 'node:child_process'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const pg = require('pg')

const cmsRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
// apps/cms/scripts → apps/cms (NOT repo root — Payload config lives in apps/cms/src)

async function clearDevPushMarker() {
  const url = process.env.DATABASE_URL
  if (!url) throw new Error('DATABASE_URL is required')

  const client = new pg.Client({
    connectionString: url,
    connectionTimeoutMillis: Number(process.env.PG_CONNECT_TIMEOUT_MS || 60_000),
    ssl: url.includes('sslmode=require') ? { rejectUnauthorized: false } : undefined,
  })

  try {
    await client.connect()

    const table = await client.query(
      `SELECT EXISTS (
         SELECT 1 FROM information_schema.tables
         WHERE table_schema = 'public' AND table_name = 'payload_migrations'
       ) AS exists`,
    )

    if (!table.rows[0]?.exists) {
      console.log('No payload_migrations table yet — nothing to clear.')
      return
    }

    const result = await client.query(
      `DELETE FROM payload_migrations WHERE batch = -1 RETURNING id, name`,
    )

    if (result.rowCount && result.rowCount > 0) {
      console.log(
        `Cleared ${result.rowCount} drizzle-push marker(s) (batch=-1): ` +
          result.rows.map((r) => r.name || r.id).join(', '),
      )
      console.log(
        'Skipped Payload interactive "dev mode / data loss" prompt so migrate can run in CI.',
      )
    } else {
      console.log('No batch=-1 (drizzle push) markers found.')
    }
  } finally {
    try {
      await client.end()
    } catch {
      /* ignore */
    }
  }
}

await clearDevPushMarker()

console.log(`Running payload migrate from ${cmsRoot}`)

const result = spawnSync(
  'npx',
  ['payload', 'migrate'],
  {
    cwd: cmsRoot,
    stdio: 'inherit',
    env: {
      ...process.env,
      PAYLOAD_MIGRATING: 'true',
      // Absolute path so findConfig cannot wander to the monorepo root
      PAYLOAD_CONFIG_PATH: path.join(cmsRoot, 'src/payload.config.ts'),
      NODE_OPTIONS:
        process.env.NODE_OPTIONS ||
        '--no-deprecation --dns-result-order=ipv4first',
      PG_POOL_MAX: process.env.PG_POOL_MAX || '3',
      PG_CONNECT_TIMEOUT_MS: process.env.PG_CONNECT_TIMEOUT_MS || '60000',
    },
    shell: process.platform === 'win32',
  },
)

process.exit(result.status ?? 1)
