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
import { getCaseStudiesContent, getHomeContent } from '@/utilities/getSiteContent'

export async function generateMetadata(): Promise<Metadata> {
  const content = await getHomeContent()
  return {
    title: content.seo?.metaTitle,
    description: content.seo?.metaDescription,
  }
}

export default async function HomePage() {
  const [content, caseStudies] = await Promise.all([getHomeContent(), getCaseStudiesContent()])

  return (
    <main className="bg-white">
      <HomeHero hero={content.hero} />
      <StrategiesSection strategies={content.strategies} />
      <ImpactStats impact={content.impact} />
      <WhyOrianaSection whyOriana={content.whyOriana} />
      <GlobalReachSection globalReach={content.globalReach} />
      <CaseStudiesSection caseStudiesIntro={content.caseStudiesIntro} caseStudies={caseStudies} />
      <NewsEventsSection news={content.news} />
      <SupportDownloadStrip supportStrip={content.supportStrip} />
    </main>
  )
}
