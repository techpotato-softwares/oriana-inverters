import { unstable_cache } from 'next/cache'

import { getDistributorsFromCms } from '@/utilities/getSiteContent'
import type { Distributor } from '@/data/distributors'

export const getDistributors = unstable_cache(getDistributorsFromCms, ['distributors'], {
  tags: ['distributors'],
})

export type { Distributor }
