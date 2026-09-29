import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { FadeIn } from '@/components/oriana/FadeIn'
import { PageHero } from '@/components/oriana/PageHero'
import { getCaseStudies, getCaseStudyBySlug } from '@/utilities/getMarketing'
import type { CaseStudy as CmsCaseStudy, Media, Product } from '@/payload-types'

type Props = { params: Promise<{ slug: string }> }

function mediaUrl(v: unknown): string | null {
  return v && typeof v === 'object' && 'url' in v && (v as Media).url ? (v as Media).url! : null
}

type DisplayStudy = {
  slug: string
  title: string
  segment: string
  capacity: string
  products: string
  productSlugs: string[]
  location: string
  image: string
  summary: string
  challenge: string
  solution: string
  results: string[]
  stats: { label: string; value: string }[]
  year: string
}

function fromCms(doc: CmsCaseStudy): DisplayStudy {
  const related = (doc.relatedProducts || [])
    .filter((p): p is Product => typeof p === 'object' && p !== null && 'slug' in p)
    .map((p) => p.slug)

  return {
    slug: doc.slug,
    title: doc.title,
    segment: doc.segment,
    capacity: doc.capacity || '',
    products: doc.products || '',
    productSlugs: related,
    location: doc.location || '',
    image: mediaUrl(doc.image) || '/assets/products/three-phase.svg',
    summary: doc.summary,
    challenge: doc.challenge || '',
    solution: doc.solution || '',
    results: (doc.results || []).map((r) => r.text).filter(Boolean),
    stats: (doc.stats || [])
      .filter((s) => s.label && s.value)
      .map((s) => ({ label: s.label, value: s.value })),
    year: doc.year || '',
  }
}

export async function generateStaticParams() {
  const cmsDocs = (await getCaseStudies()) as CmsCaseStudy[]
  return cmsDocs.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const cms = (await getCaseStudyBySlug(slug)) as CmsCaseStudy | null
  if (!cms) return {}
  return {
    title: cms.seo?.metaTitle || cms.title,
    description: cms.seo?.metaDescription || cms.summary,
  }
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params
  const cms = (await getCaseStudyBySlug(slug)) as CmsCaseStudy | null
  if (!cms) notFound()

  const study = fromCms(cms)

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
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-10">
              {study.challenge ? (
                <FadeIn>
                  <h2 className="font-display text-xl font-bold text-oriana-navy">Challenge</h2>
                  <p className="mt-3 text-sm leading-relaxed text-oriana-muted">{study.challenge}</p>
                </FadeIn>
              ) : null}
              {study.solution ? (
                <FadeIn delay={0.05}>
                  <h2 className="font-display text-xl font-bold text-oriana-navy">Solution</h2>
                  <p className="mt-3 text-sm leading-relaxed text-oriana-muted">{study.solution}</p>
                </FadeIn>
              ) : null}
              {study.results.length > 0 ? (
                <FadeIn delay={0.1}>
                  <h2 className="font-display text-xl font-bold text-oriana-navy">Results</h2>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-oriana-muted">
                    {study.results.map((result) => (
                      <li key={result}>{result}</li>
                    ))}
                  </ul>
                </FadeIn>
              ) : null}
            </div>

            <aside className="space-y-6">
              <FadeIn>
                <div className="relative aspect-[4/3] overflow-hidden rounded border border-oriana-navy/8 bg-oriana-silver/40">
                  <Image
                    src={study.image}
                    alt=""
                    fill
                    className="object-contain p-8"
                    unoptimized
                  />
                </div>
              </FadeIn>
              <dl className="space-y-3 text-sm">
                {study.location ? (
                  <div>
                    <dt className="text-oriana-muted">Location</dt>
                    <dd className="font-medium text-oriana-navy">{study.location}</dd>
                  </div>
                ) : null}
                {study.capacity ? (
                  <div>
                    <dt className="text-oriana-muted">Capacity</dt>
                    <dd className="font-medium text-oriana-navy">{study.capacity}</dd>
                  </div>
                ) : null}
                {study.products ? (
                  <div>
                    <dt className="text-oriana-muted">Products</dt>
                    <dd className="font-medium text-oriana-navy">{study.products}</dd>
                  </div>
                ) : null}
                {study.year ? (
                  <div>
                    <dt className="text-oriana-muted">Year</dt>
                    <dd className="font-medium text-oriana-navy">{study.year}</dd>
                  </div>
                ) : null}
              </dl>
              {study.stats.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {study.stats.map((stat) => (
                    <div key={stat.label} className="rounded border border-oriana-navy/8 p-4">
                      <p className="font-display text-xl font-bold text-oriana-blue">{stat.value}</p>
                      <p className="mt-1 text-xs text-oriana-muted">{stat.label}</p>
                    </div>
                  ))}
                </div>
              ) : null}
              {study.productSlugs.length > 0 ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-oriana-muted">
                    Related products
                  </p>
                  <ul className="mt-2 space-y-1">
                    {study.productSlugs.map((productSlug) => (
                      <li key={productSlug}>
                        <Link
                          href={`/products/${productSlug}`}
                          className="text-sm font-medium text-oriana-blue hover:underline"
                        >
                          {productSlug}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
