import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { FadeIn } from '@/components/oriana/FadeIn'
import { PageHero } from '@/components/oriana/PageHero'
import {
  caseStudies,
  getAllCaseStudySlugs,
  getCaseStudyBySlug as getStaticCaseStudyBySlug,
  type CaseStudy as StaticCaseStudy,
} from '@/data/caseStudies'
import { getCaseStudies, getCaseStudyBySlug } from '@/utilities/getMarketing'
import type { CaseStudy as CmsCaseStudy, Media, Product } from '@/payload-types'

type Props = { params: Promise<{ slug: string }> }

function mediaUrl(v: unknown): string | null {
  return v && typeof v === 'object' && 'url' in v && (v as Media).url ? (v as Media).url! : null
}

type DisplayStudy = StaticCaseStudy

function fromCms(doc: CmsCaseStudy): DisplayStudy {
  const related = (doc.relatedProducts || [])
    .filter((p): p is Product => typeof p === 'object' && p !== null && 'slug' in p)
    .map((p) => p.slug)
  const staticFallback = getStaticCaseStudyBySlug(doc.slug)

  return {
    slug: doc.slug,
    title: doc.title,
    segment: doc.segment,
    capacity: doc.capacity || staticFallback?.capacity || '',
    products: doc.products || staticFallback?.products || '',
    productSlugs: related.length ? related : staticFallback?.productSlugs || [],
    location: doc.location || staticFallback?.location || '',
    image: mediaUrl(doc.image) || staticFallback?.image || '/assets/products/three-phase.svg',
    summary: doc.summary,
    challenge: doc.challenge || staticFallback?.challenge || '',
    solution: doc.solution || staticFallback?.solution || '',
    results: (doc.results || []).map((r) => r.text).filter(Boolean).length
      ? (doc.results || []).map((r) => r.text)
      : staticFallback?.results || [],
    stats: (doc.stats || []).filter((s) => s.label && s.value).length
      ? (doc.stats || []).map((s) => ({ label: s.label, value: s.value }))
      : staticFallback?.stats || [],
    year: doc.year || staticFallback?.year || '',
  }
}

export async function generateStaticParams() {
  const cmsDocs = (await getCaseStudies()) as CmsCaseStudy[]
  const slugs = new Set([...getAllCaseStudySlugs(), ...cmsDocs.map((d) => d.slug)])
  return [...slugs].map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const cms = (await getCaseStudyBySlug(slug)) as CmsCaseStudy | null
  if (cms) {
    return {
      title: cms.seo?.metaTitle || cms.title,
      description: cms.seo?.metaDescription || cms.summary,
    }
  }
  const study = getStaticCaseStudyBySlug(slug)
  if (!study) return {}
  return { title: study.title, description: study.summary }
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params
  const cms = (await getCaseStudyBySlug(slug)) as CmsCaseStudy | null
  const study: DisplayStudy | undefined = cms
    ? fromCms(cms)
    : getStaticCaseStudyBySlug(slug) || caseStudies.find((cs) => cs.slug === slug)

  if (!study) notFound()

  return (
    <main>
      <PageHero eyebrow={study.segment} title={study.title} description={study.summary} />
      <Breadcrumbs
        items={[
          { label: 'Case Studies', href: '/case-studies' },
          { label: study.title },
        ]}
      />

      <section className="py-12 lg:py-16">
        <div className="container">
          {study.stats.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {study.stats.map((stat, i) => (
                <FadeIn key={stat.label} delay={i * 0.05}>
                  <div className="border border-oriana-navy/8 bg-oriana-silver/40 p-6 text-center">
                    <p className="font-display text-2xl font-light text-oriana-blue">{stat.value}</p>
                    <p className="mt-2 text-sm text-oriana-muted">{stat.label}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          ) : null}

          <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-start">
            <FadeIn>
              <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded border border-oriana-navy/8 bg-gradient-to-br from-oriana-silver to-white">
                <Image
                  src={study.image}
                  alt=""
                  width={320}
                  height={220}
                  className="h-auto max-h-[60%] w-auto opacity-90"
                  unoptimized
                />
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {study.location ? (
                  <span className="rounded-full bg-oriana-silver px-3 py-1 text-xs font-medium text-oriana-navy">
                    {study.location}
                  </span>
                ) : null}
                {study.capacity ? (
                  <span className="rounded-full bg-oriana-blue/10 px-3 py-1 text-xs font-medium text-oriana-blue">
                    {study.capacity}
                  </span>
                ) : null}
                {study.year ? (
                  <span className="rounded-full bg-oriana-navy/5 px-3 py-1 text-xs font-medium text-oriana-muted">
                    {study.year}
                  </span>
                ) : null}
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="font-display text-xl font-bold text-oriana-navy">Products Used</h2>
              <p className="mt-2 font-mono text-sm text-oriana-muted">{study.products}</p>
              {study.productSlugs.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-3">
                  {study.productSlugs.map((productSlug) => (
                    <Link
                      key={productSlug}
                      href={`/products/${productSlug}`}
                      className="rounded-full border border-oriana-blue px-4 py-2 text-sm font-semibold text-oriana-blue hover:bg-oriana-blue hover:text-white"
                    >
                      View product →
                    </Link>
                  ))}
                </div>
              ) : null}
            </FadeIn>
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-3">
            <FadeIn>
              <h2 className="font-display text-xl font-bold text-oriana-navy">Challenge</h2>
              <p className="mt-4 text-sm leading-relaxed text-oriana-muted">{study.challenge}</p>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h2 className="font-display text-xl font-bold text-oriana-navy">Solution</h2>
              <p className="mt-4 text-sm leading-relaxed text-oriana-muted">{study.solution}</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-display text-xl font-bold text-oriana-navy">Results</h2>
              <ul className="mt-4 space-y-3">
                {study.results.map((result) => (
                  <li key={result} className="flex items-start gap-3 text-sm text-oriana-muted">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-oriana-blue" />
                    {result}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>

          <div className="mt-16 flex flex-wrap gap-4 border-t border-oriana-navy/8 pt-10">
            <Link
              href="/case-studies"
              className="rounded-full border border-oriana-navy/15 px-6 py-3 text-sm font-semibold text-oriana-navy hover:border-oriana-blue"
            >
              ← All case studies
            </Link>
            <Link
              href="/contact"
              className="rounded-full bg-oriana-blue px-6 py-3 text-sm font-semibold text-white hover:bg-oriana-navy"
            >
              Request similar project support
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
