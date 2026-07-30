import { getPayload } from 'payload'
import config from '@payload-config'

import { seedSite } from '@/endpoints/seed/site'
import { warmDb } from './warm-db'

await warmDb()

const payload = await getPayload({ config })
try {
  await seedSite({ payload })
  payload.logger.info('Site seed complete.')
} finally {
  await payload.destroy()
}
