import { unstable_cache } from 'next/cache'

import type { Distributor } from '@/data/distributors'
import { fetchDistributorsFromCms } from '@/utilities/getMarketing'

async function fetchDistributors(): Promise<Distributor[]> {
  return fetchDistributorsFromCms()
}

export const getDistributors = unstable_cache(fetchDistributors, ['distributors'], {
  tags: ['distributors'],
})
