import { getPayload } from 'payload'
import config from '@payload-config'

import { seedOrianaContent } from '@/endpoints/seed/oriana/seedContent'

const force = process.argv.includes('--force')

const payload = await getPayload({ config })
await seedOrianaContent({ payload, force })
payload.logger.info('Content seed complete.')
await payload.destroy()
