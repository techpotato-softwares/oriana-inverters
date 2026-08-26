/**
 * Postgres migrations for Payload.
 *
 * After schema changes, bootstrap once then create a migration:
 *
 *   cd apps/cms
 *   npm run schema:push
 *   DATABASE_URL="postgresql://..." PAYLOAD_SECRET="..." npm run migrate:create
 *
 * Register generated migrations in this array for prod (`prodMigrations`).
 *
 * Full content CMS migration (2026-08): new collections (case-studies, faqs,
 * videos, distributors, jobs, certifications, awards, partners, solutions,
 * warranty-plans, sustainability-reports), globals (home, about, careers,
 * support, sustainability, contact), Payload folders on media/downloads.
 * Prefer `schema:push` on staging then `migrate:create` against that DB.
 */
export const migrations: {
  up: (args: unknown) => Promise<void>
  down: (args: unknown) => Promise<void>
  name: string
}[] = []
