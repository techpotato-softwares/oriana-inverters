import { getPayload } from 'payload'
import config from '@payload-config'

import { seedProducts } from '@/endpoints/seed/products'
import { warmDb } from './warm-db'

await warmDb()

const payload = await getPayload({ config })
try {
  await seedProducts({ payload })
  payload.logger.info('Catalogue seed complete.')
} finally {
  await payload.destroy()
}
