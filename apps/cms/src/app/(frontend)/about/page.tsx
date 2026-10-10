import { AboutOverview } from '@/components/oriana/about/overview/AboutOverview'
import { aboutOverview } from '@/components/oriana/about/overview/aboutOverviewData'
import { getLeadership } from '@/utilities/getLeadership'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: aboutOverview.meta.title,
  description: aboutOverview.meta.description,
}

export default async function AboutPage() {
  const leadership = await getLeadership()
  return <AboutOverview content={aboutOverview} leadership={leadership} />
}
