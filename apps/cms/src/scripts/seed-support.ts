/**
 * Fill Admin → Support Pages with live-site defaults (all tabs).
 *
 * Usage (from apps/cms, with DATABASE_URL set):
 *   npm run seed:support
 *   npm run seed:support -- --force
 *
 * Prefer `npm run seed:marketing-pages` when also seeding Sustainability / About.
 */
import { getPayload } from 'payload'
import config from '@payload-config'

import { seedMarketingGlobals } from '@/endpoints/seed/oriana/seedMarketingGlobals'

const force = process.argv.includes('--force')
const payload = await getPayload({ config })

const result = await seedMarketingGlobals(payload, { pages: ['support'], force })
payload.logger.info(`Support Pages: ${result.support}`)
if (result.support === 'seeded') {
  payload.logger.info(
    'Open Admin → Support Pages — every tab now has editable defaults.',
  )
}
await payload.destroy()
