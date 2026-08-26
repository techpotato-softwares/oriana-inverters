import { getPayload } from 'payload'
import config from '@payload-config'

import { seedProducts } from '@/endpoints/seed/products'
import { seedOrianaContent } from '@/endpoints/seed/oriana/seedContent'

const force = process.argv.includes('--force')

const payload = await getPayload({ config })

payload.logger.info('Starting full seed (catalogue + content)...')
await seedProducts({ payload })
await seedOrianaContent({ payload, force })
payload.logger.info('Full seed complete.')
await payload.destroy()
