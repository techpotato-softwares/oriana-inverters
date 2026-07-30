/**
 * Postgres migrations for Payload.
 *
 * After adding Oriana site collections/globals, bootstrap schema once:
 *
 *   cd apps/cms
 *   DATABASE_URL="postgresql://..." PAYLOAD_SECRET="..." npm run schema:push
 *
 * Then seed existing website content:
 *
 *   npm run seed:site
 *
 * Prefer creating a migration for CI/CD:
 *
 *   npx payload migrate:create
 */
export const migrations: {
  up: (args: unknown) => Promise<void>
  down: (args: unknown) => Promise<void>
  name: string
}[] = []
