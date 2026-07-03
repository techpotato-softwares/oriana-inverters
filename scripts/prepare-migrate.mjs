/**
 * Removes the dev-mode schema push marker (batch = -1) when formal migrations
 * are already applied. Without this, `payload migrate` prompts interactively and
 * hangs CI / `npm run build`.
 */
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const dbPath = process.env.DATABASE_URL?.replace('file:', '') || path.join(root, 'payload.db')

if (!fs.existsSync(dbPath)) {
  process.exit(0)
}

try {
  execSync(
    `sqlite3 "${dbPath}" "DELETE FROM payload_migrations WHERE batch = -1 AND (SELECT COUNT(*) FROM payload_migrations WHERE batch > 0) > 0;"`,
    { stdio: 'inherit' },
  )
} catch {
  // sqlite3 may be unavailable; build still works via next build
}
