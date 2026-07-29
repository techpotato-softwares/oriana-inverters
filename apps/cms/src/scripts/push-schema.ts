/**
 * Bootstrap Postgres schema via Drizzle push (PAYLOAD_DATABASE_PUSH=true).
 * Use on empty DBs before seeding when no migrations are checked in yet.
 */
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })
payload.logger.info('Database schema push complete.')
await payload.destroy()
