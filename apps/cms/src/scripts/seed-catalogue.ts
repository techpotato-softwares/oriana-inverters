import { getPayload } from 'payload'
import config from '@payload-config'

import { seedProducts } from '@/endpoints/seed/products'

const payload = await getPayload({ config })
await seedProducts({ payload })
payload.logger.info('Catalogue seed complete.')
await payload.destroy()
