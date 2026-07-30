import { getPayload } from 'payload'
import config from '@payload-config'

import { seedSite } from '@/endpoints/seed/site'

const payload = await getPayload({ config })
await seedSite({ payload })
payload.logger.info('Site seed complete.')
await payload.destroy()
