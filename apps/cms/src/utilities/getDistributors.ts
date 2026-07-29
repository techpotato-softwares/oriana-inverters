import { unstable_cache } from 'next/cache'

import { staticDistributors, type Distributor } from '@/data/distributors'

async function fetchDistributors(): Promise<Distributor[]> {
  return staticDistributors
}

export const getDistributors = unstable_cache(fetchDistributors, ['distributors'], {
  tags: ['distributors'],
})
