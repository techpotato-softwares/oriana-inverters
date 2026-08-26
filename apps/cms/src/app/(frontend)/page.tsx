import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

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
import { getHome, getCaseStudies } from '@/utilities/getMarketing'
import type { CaseStudy } from '@/data/caseStudies'

export async function generateMetadata(): Promise<Metadata> {
  const { home } = await getHome()
  return {
    title: home?.seo?.metaTitle || 'Oriana Inverters | Solar Inverter & Energy Storage Solutions',
    description:
      home?.seo?.metaDescription ||
      'Oriana manufactures high-efficiency string, hybrid, and utility-scale solar inverters for residential, commercial, and utility partners worldwide.',
  }
}

export default async function HomePage() {
  const { home, heroSlides } = await getHome()
  const caseStudyDocs = await getCaseStudies()

  let livePosts: { title: string; slug: string; publishedAt?: string | null }[] = []
  if (home?.newsSection?.mode !== 'manual') {
    try {
      const payload = await getPayload({ config: configPromise })
      const result = await payload.find({
        collection: 'posts',
        depth: 0,
        limit: home?.newsSection?.postsLimit || 3,
        where: { _status: { equals: 'published' } },
        sort: '-publishedAt',
      })
      livePosts = result.docs
    } catch {
      livePosts = []
    }
  }

  const fallbackHero = home?.fallbackHero
  const strategies = home?.strategiesSection
  const impact = home?.impactSection
  const why = home?.whySection
  const reach = home?.reachSection
  const news = home?.newsSection
  const support = home?.supportStrip
  const caseSec = home?.caseStudiesSection

  const studies: CaseStudy[] = (caseStudyDocs as Array<Record<string, unknown>>)
    .slice(0, caseSec?.limit || 3)
    .map((doc) => ({
      slug: String(doc.slug || ''),
      title: String(doc.title || ''),
      segment: String(doc.segment || ''),
      capacity: String(doc.capacity || ''),
      products: String(doc.products || ''),
      productSlugs: [],
      location: String(doc.location || ''),
      image: '',
      summary: String(doc.summary || ''),
      challenge: String(doc.challenge || ''),
      solution: String(doc.solution || ''),
      results: [],
      stats: [],
      year: String(doc.year || ''),
    }))

  const newsItems =
    news?.mode === 'manual' && news.manualItems?.length
      ? news.manualItems.map((item) => ({
          title: item.title || '',
          date: item.date || '',
          href: item.href || '/posts',
          type: item.type || 'News',
        }))
      : livePosts.map((post) => ({
          title: post.title,
          date: post.publishedAt
            ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })
            : '',
          href: `/posts/${post.slug}`,
          type: 'News',
        }))

  return (
    <main className="bg-white">
      <HomeHero
        slides={heroSlides}
        fallback={
          fallbackHero
            ? {
                eyebrow: fallbackHero.eyebrow || 'Oriana',
                headline: fallbackHero.headline || 'Clean power that crosses borders',
                subheadline:
                  fallbackHero.subheadline ||
                  'High-efficiency inverters and storage platforms for homes, industry, and utility grids.',
                primaryCta: {
                  label: fallbackHero.primaryCta?.label || 'Explore solutions',
                  href: fallbackHero.primaryCta?.href || '/solutions/residential',
                },
                secondaryCta: {
                  label: fallbackHero.secondaryCta?.label || 'Become a partner',
                  href: fallbackHero.secondaryCta?.href || '/contact',
                },
              }
            : undefined
        }
      />
      <StrategiesSection
        eyebrow={strategies?.eyebrow ?? undefined}
        title={strategies?.title ?? undefined}
        intro={strategies?.intro ?? undefined}
        items={strategies?.items?.map((item) => ({
          id: item.idKey || item.label || '',
          label: item.label || '',
          title: item.title || '',
          description: item.description || '',
          href: item.href || '#',
        }))}
      />
      <ImpactStats
        eyebrow={impact?.eyebrow ?? undefined}
        title={impact?.title ?? undefined}
        link={impact?.link?.href ? { label: impact.link.label || '', href: impact.link.href } : undefined}
        stats={impact?.stats?.map((s) => ({
          iconKey: s.iconKey || 'globe',
          value: s.value || '',
          label: s.label || '',
        }))}
      />
      <WhyOrianaSection
        eyebrow={why?.eyebrow ?? undefined}
        title={why?.title ?? undefined}
        body={why?.body ?? undefined}
        items={why?.items?.map((item) => ({
          iconKey: item.iconKey || 'shield',
          title: item.title || '',
          copy: item.copy || '',
          href: item.href || '#',
        }))}
      />
      <GlobalReachSection
        eyebrow={reach?.eyebrow ?? undefined}
        title={reach?.title ?? undefined}
        body={reach?.body ?? undefined}
        regions={reach?.regions?.map((r) => ({ name: r.name || '', focus: r.focus || '' }))}
        cta={reach?.cta?.href ? { label: reach.cta.label || '', href: reach.cta.href } : undefined}
      />
      <CaseStudiesSection
        eyebrow={caseSec?.eyebrow ?? undefined}
        title={caseSec?.title ?? undefined}
        link={
          caseSec?.link?.href
            ? { label: caseSec.link.label || '', href: caseSec.link.href }
            : undefined
        }
        studies={studies}
      />
      <NewsEventsSection
        eyebrow={news?.eyebrow ?? undefined}
        title={news?.title ?? undefined}
        link={news?.link?.href ? { label: news.link.label || '', href: news.link.href } : undefined}
        items={newsItems}
      />
      <SupportDownloadStrip
        hotlineNote={support?.hotlineNote ?? undefined}
        downloads={support?.downloads
          ?.filter((d): d is { label: string; href: string } => Boolean(d?.label && d?.href))
          .map((d) => ({ label: d.label, href: d.href }))}
        partner={
          support?.partnerCta
            ? {
                title: support.partnerCta.title ?? undefined,
                body: support.partnerCta.body ?? undefined,
                label: support.partnerCta.label || 'Request partnership',
                href: support.partnerCta.href || '/contact',
              }
            : undefined
        }
      />
    </main>
  )
}
