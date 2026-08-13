import type { Metadata } from 'next'

import {
  CaseStudiesSection,
  GlobalReachSection,
  HomeHero,
  ImpactStats,
  NewsEventsSection,
  StrategiesSection,
  SupportDownloadStrip,
  WhyOrianaSection,
} from '@/components/oriana/HomeSections'
import { getHomeHeroSlides } from '@/utilities/getHomeHero'

export const metadata: Metadata = {
  title: 'Oriana Inverters | Solar Inverter & Energy Storage Solutions',
  description:
    'Oriana manufactures high-efficiency string, hybrid, and utility-scale solar inverters for residential, commercial, and utility partners worldwide.',
}

export default async function HomePage() {
  const heroSlides = await getHomeHeroSlides()

  return (
    <main className="bg-white">
      <HomeHero slides={heroSlides} />
      <StrategiesSection />
      <ImpactStats />
      <WhyOrianaSection />
      <GlobalReachSection />
      <CaseStudiesSection />
      <NewsEventsSection />
      <SupportDownloadStrip />
    </main>
  )
}
