import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { SustainabilityOverview } from '@/components/oriana/sustainability/SustainabilityOverview'
import type { ReportCard } from '@/components/oriana/sustainability/sustainabilityData'
import { fallbackReports } from '@/components/oriana/sustainability/sustainabilityData'
import { getAwards, getSustainability, getSustainabilityReports } from '@/utilities/getMarketing'
import type { Award, Media, SustainabilityReport } from '@/payload-types'

function mediaUrl(v: unknown): string | null {
  return v && typeof v === 'object' && 'url' in v && (v as Media).url ? (v as Media).url! : null
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSustainability()
  return {
    title: data?.seo?.metaTitle || 'Sustainability',
    description:
      data?.seo?.metaDescription ||
      'Oriana Inverters commitment to sustainable manufacturing, climate targets, and ESG transparency.',
  }
}

export default async function SustainabilityPage() {
  const [data, reportDocs, awardDocs] = await Promise.all([
    getSustainability(),
    getSustainabilityReports(),
    getAwards(),
  ])

  const reports: ReportCard[] =
    (reportDocs as SustainabilityReport[]).length > 0
      ? (reportDocs as SustainabilityReport[]).map((doc) => ({
          title: doc.title,
          year: doc.year,
          href: mediaUrl(doc.file) || doc.externalUrl || '/resources/downloads',
          tag: 'Enterprise',
        }))
      : fallbackReports

  const honors =
    (awardDocs as Award[]).length > 0
      ? (awardDocs as Award[]).slice(0, 4).map((award) => ({
          title: award.title,
          image: null,
        }))
      : undefined

  let news: { title: string; href: string; date?: string }[] = []
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'posts',
      depth: 0,
      limit: 3,
      where: { _status: { equals: 'published' } },
      sort: '-publishedAt',
    })
    news = result.docs.map((post) => ({
      title: post.title,
      href: `/posts/${post.slug}`,
      date: post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        : undefined,
    }))
  } catch {
    news = []
  }

  const hero = data?.hero
  const heroImage =
    mediaUrl(data?.image) ||
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=80'

  return (
    <SustainabilityOverview
      heroTitle={hero?.title || 'Green Mission. Better Life'}
      heroImage={heroImage}
      reports={reports}
      honors={honors}
      news={news}
    />
  )
}
