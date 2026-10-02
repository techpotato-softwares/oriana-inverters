import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { SustainabilityOverview } from '@/components/oriana/sustainability/SustainabilityOverview'
import {
  defaultCalculator,
  defaultCommitments,
  defaultCommitmentsIntro,
  defaultCta,
  defaultHero,
  defaultHighlights,
  defaultPillars,
  defaultPillarsIntro,
  type PillarIcon,
  type ReportCard,
  type SectionIntro,
} from '@/components/oriana/sustainability/sustainabilityData'
import { getAwards, getSustainability, getSustainabilityReports } from '@/utilities/getMarketing'
import {
  isPlaceholderSustainabilityTitle,
  PLACEHOLDER_POST_SLUGS,
  realSustainabilityHighlights,
} from '@/utilities/placeholderContent'
import type { Award, Media, SustainabilityReport } from '@/payload-types'

function mediaUrl(v: unknown): string | null {
  return v && typeof v === 'object' && 'url' in v && (v as Media).url ? (v as Media).url! : null
}

type IntroInput = {
  eyebrow?: string | null
  title?: string | null
  description?: string | null
} | null

function intro(input: IntroInput | undefined, fallback: SectionIntro): SectionIntro {
  return {
    eyebrow: input?.eyebrow || fallback.eyebrow,
    title: input?.title || fallback.title,
    description: input?.description || fallback.description,
  }
}

function link(
  input: { label?: string | null; href?: string | null } | null | undefined,
  fallback: { label: string; href: string },
) {
  return input?.label && input?.href ? { label: input.label, href: input.href } : fallback
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSustainability()
  return {
    title: data?.seo?.metaTitle || 'Sustainability',
    description:
      data?.seo?.metaDescription ||
      'How Oriana builds sustainability into every inverter: product longevity, responsible manufacturing in India, and circular lifecycles.',
  }
}

async function getSustainabilityNews() {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'posts',
      depth: 0,
      limit: 3,
      where: {
        _status: { equals: 'published' },
        slug: { not_in: [...PLACEHOLDER_POST_SLUGS] },
      },
      sort: '-publishedAt',
    })
    return result.docs.map((post) => ({
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
    return []
  }
}

export default async function SustainabilityPage() {
  const [data, reportDocs, awardDocs, news] = await Promise.all([
    getSustainability(),
    getSustainabilityReports(),
    getAwards(),
    getSustainabilityNews(),
  ])

  const reports: ReportCard[] = (reportDocs as SustainabilityReport[]).map((doc) => ({
    title: doc.title,
    year: doc.year,
    href: mediaUrl(doc.file) || doc.externalUrl || '/resources/downloads',
    tag: 'Enterprise',
  }))

  const honors = (awardDocs as Award[]).slice(0, 4).map((award) => ({
    title: award.title,
    image: null,
  }))

  const cmsHero = data?.hero
  const useCmsHero = !isPlaceholderSustainabilityTitle(cmsHero?.title)
  const hero = {
    eyebrow: (useCmsHero && cmsHero?.eyebrow) || defaultHero.eyebrow,
    title: (useCmsHero && cmsHero?.title) || defaultHero.title,
    description: (useCmsHero && cmsHero?.description) || defaultHero.description,
    videoSrc: mediaUrl(data?.heroVideo) || defaultHero.videoSrc,
    posterSrc: mediaUrl(data?.image) || mediaUrl(cmsHero?.image) || defaultHero.posterSrc,
  }

  const cmsHighlights = realSustainabilityHighlights(data?.highlights)
  const highlights =
    cmsHighlights.length > 0
      ? cmsHighlights.map((item) => ({
          value: item.value,
          label: item.label,
          description: item.description || undefined,
        }))
      : defaultHighlights

  const pillars =
    data?.pillars && data.pillars.length > 0
      ? data.pillars.map((pillar, index) => ({
          title: pillar.title,
          headline: pillar.headline,
          body: pillar.body,
          icon: (pillar.icon || 'leaf') as PillarIcon,
          image:
            mediaUrl(pillar.image) || defaultPillars[index % defaultPillars.length].image,
        }))
      : defaultPillars

  const calc = data?.calculator
  const calculator = {
    title: calc?.title || defaultCalculator.title,
    description: calc?.description || defaultCalculator.description,
    kwhPerKw: calc?.kwhPerKw || defaultCalculator.kwhPerKw,
    co2TonnesPerKw: calc?.co2TonnesPerKw || defaultCalculator.co2TonnesPerKw,
    treesPerKw: calc?.treesPerKw || defaultCalculator.treesPerKw,
    disclaimer: calc?.disclaimer || defaultCalculator.disclaimer,
  }

  const commitments =
    data?.commitments && data.commitments.length > 0
      ? data.commitments.map((item) => ({
          phase: item.phase,
          timeframe: item.timeframe,
          title: item.title,
          body: item.body || undefined,
        }))
      : defaultCommitments

  const cmsCta = data?.cta
  const cta = {
    title: cmsCta?.title || defaultCta.title,
    body: cmsCta?.body || defaultCta.body,
    primary: link(cmsCta?.primary, defaultCta.primary),
    secondary: defaultCta.secondary ? link(cmsCta?.secondary, defaultCta.secondary) : undefined,
    image: mediaUrl(cmsCta?.image) || defaultCta.image,
    contactEmail: cmsCta?.contactEmail || defaultCta.contactEmail,
  }

  return (
    <SustainabilityOverview
      hero={hero}
      highlights={highlights}
      pillarsIntro={intro(data?.pillarsIntro, defaultPillarsIntro)}
      pillars={pillars}
      calculator={calculator}
      commitmentsIntro={intro(data?.commitmentsIntro, defaultCommitmentsIntro)}
      commitments={commitments}
      reports={reports}
      honors={honors}
      news={news}
      cta={cta}
    />
  )
}
