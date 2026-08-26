import { unstable_cache } from 'next/cache'

import { staticDistributors, type Distributor } from '@/data/distributors'
import { fetchDistributorsFromCms } from '@/utilities/getMarketing'

async function fetchDistributors(): Promise<Distributor[]> {
  const fromCms = await fetchDistributorsFromCms()
  return fromCms.length ? fromCms : staticDistributors
}

export const getDistributors = unstable_cache(fetchDistributors, ['distributors'], {
  tags: ['distributors'],
})
