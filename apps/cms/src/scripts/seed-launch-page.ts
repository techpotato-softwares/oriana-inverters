import { getPayload } from 'payload'
import config from '@payload-config'

import { seedLaunchPage } from '@/endpoints/seed/oriana/seedLaunchPage'

const payload = await getPayload({ config })
await seedLaunchPage(payload)
payload.logger.info('Launch page seed complete.')
await payload.destroy()
