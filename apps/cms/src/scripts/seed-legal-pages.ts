import { getPayload } from 'payload'
import config from '@payload-config'

import { seedLegalPages } from '@/endpoints/seed/oriana/seedLegalPages'

const payload = await getPayload({ config })
await seedLegalPages(payload)
payload.logger.info('Legal pages seed complete (privacy, terms, disclaimer).')
await payload.destroy()
