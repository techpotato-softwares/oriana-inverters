/**
 * Create the first Payload CMS admin user (non-interactive).
 *
 * Usage:
 *   ADMIN_EMAIL=admin@example.com ADMIN_PASSWORD='***' npm run seed:admin -w @oriana/cms
 *
 * Skips creation if a user with the same email already exists.
 */
import { getPayload } from 'payload'
import config from '@payload-config'

import { withRetry } from '@/endpoints/seed/dbRetry'
import { ensureSchema } from './ensure-schema'
import { warmDb } from './warm-db'

const email = process.env.ADMIN_EMAIL
const password = process.env.ADMIN_PASSWORD
const name = process.env.ADMIN_NAME || 'Admin'

if (!email || !password) {
  console.error('ADMIN_EMAIL and ADMIN_PASSWORD are required')
  process.exit(1)
}

if (!process.env.PAYLOAD_SECRET) {
  console.error('PAYLOAD_SECRET is required')
  process.exit(1)
}

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is required')
  process.exit(1)
}

await warmDb()
await ensureSchema()

const payload = await getPayload({ config })
try {
  const existing = await withRetry('admin:find', () =>
    payload.find({
      collection: 'users',
      where: { email: { equals: email } },
      limit: 1,
      overrideAccess: true,
    }),
  )

  if (existing.docs.length > 0) {
    console.log(`Admin user already exists: ${email}`)
  } else {
    await withRetry('admin:create', () =>
      payload.create({
        collection: 'users',
        data: {
          email,
          password,
          name,
        },
        overrideAccess: true,
      }),
    )
    console.log(`Created admin user: ${email}`)
  }
} finally {
  await payload.destroy()
}
