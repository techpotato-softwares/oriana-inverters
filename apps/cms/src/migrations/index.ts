/**
 * Postgres migrations for Payload.
 *
 * SQLite migrations were removed — they are not portable.
 * Create the first Postgres migration against your DB:
 *
 *   cd apps/cms
 *   DATABASE_URL="postgresql://..." PAYLOAD_SECRET="..." npx payload migrate:create
 *
 * Or bootstrap schema once with PAYLOAD_DATABASE_PUSH=true, then create migrations.
 */
export const migrations: {
  up: (args: unknown) => Promise<void>
  down: (args: unknown) => Promise<void>
  name: string
}[] = []
