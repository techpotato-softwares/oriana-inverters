import { AboutOverview } from '@/components/oriana/about/overview/AboutOverview'
import { aboutOverview } from '@/components/oriana/about/overview/aboutOverviewData'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: aboutOverview.meta.title,
  description: aboutOverview.meta.description,
}

export default function AboutPage() {
  return <AboutOverview content={aboutOverview} />
}
