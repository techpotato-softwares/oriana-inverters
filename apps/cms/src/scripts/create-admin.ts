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

const payload = await getPayload({ config })

const existing = await payload.find({
  collection: 'users',
  where: { email: { equals: email } },
  limit: 1,
})

if (existing.docs.length > 0) {
  console.log(`Admin user already exists: ${email}`)
  process.exit(0)
}

await payload.create({
  collection: 'users',
  data: {
    email,
    password,
    name,
  },
})

console.log(`Created admin user: ${email}`)
process.exit(0)
