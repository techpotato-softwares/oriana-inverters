import type { Metadata } from 'next'

import { AboutOverview } from '@/components/oriana/about/overview/AboutOverview'
import { metadataFromSeo } from '@/utilities/generateMeta'
import { getLeadership } from '@/utilities/getLeadership'
import { getAbout } from '@/utilities/getMarketing'
import { mapAboutOverview } from '@/utilities/mapAboutOverview'

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAbout()
  const content = mapAboutOverview(about)
  return metadataFromSeo(about?.seo, {
    title: content.meta.title,
    description: content.meta.description,
    path: '/about',
  })
}

export default async function AboutPage() {
  const [about, leadership] = await Promise.all([getAbout(), getLeadership()])
  return <AboutOverview content={mapAboutOverview(about)} leadership={leadership} />
}
