/**
 * Seed Support / Sustainability / About globals (hub + all CMS subpage tabs).
 *
 * Usage (from apps/cms, with DATABASE_URL set):
 *   npm run seed:marketing-pages
 *   npm run seed:marketing-pages -- --pages=support,about
 *   npm run seed:marketing-pages -- --pages=all --force
 *
 * Env: SEED_PAGES=support,sustainability,about
 */
import { getPayload } from 'payload'
import config from '@payload-config'

import {
  parseMarketingPages,
  seedMarketingGlobals,
} from '@/endpoints/seed/oriana/seedMarketingGlobals'

const force = process.argv.includes('--force')
const pages = parseMarketingPages(process.argv)

const payload = await getPayload({ config })

payload.logger.info(`Marketing pages seed — pages=[${pages.join(', ')}] force=${force}`)
const result = await seedMarketingGlobals(payload, { pages, force })

for (const [page, status] of Object.entries(result)) {
  if (status === 'not-requested') continue
  payload.logger.info(`  ${page}: ${status}`)
}

payload.logger.info(
  'Done. Open Admin → Support Pages / Sustainability / About Pages and edit any tab, then publish.',
)
await payload.destroy()
