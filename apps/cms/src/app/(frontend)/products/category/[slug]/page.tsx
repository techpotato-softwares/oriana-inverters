import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'
import { ProductSeriesSections } from '@/components/oriana/ProductSeriesSections'
import {
  segmentLabelForSlug,
  seriesMatchesSegment,
} from '@/data/productMaster'
import { seriesToCatalogueCard } from '@/utilities/allProductsCatalogue'
import {
  getCategoryMeta,
  getSeriesByCategory,
} from '@/utilities/getCatalogue'

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ segment?: string }>
}

export const dynamic = 'force-dynamic'

/** Old catalogue slugs → Excel product-family slugs */
const legacyCategorySlugs: Record<string, string> = {
  'single-phase': 'on-grid-inverters',
  'three-phase': 'on-grid-inverters',
  'utility-scale': 'utility-scale-inverters',
  'energy-storage': 'hybrid-inverters',
  accessories: 'on-grid-inverters',
  'residential-grid-tied': 'on-grid-inverters',
  'ci-grid-tied': 'on-grid-inverters',
  'utility-grid-tied': 'utility-scale-inverters',
  'residential-hybrid': 'hybrid-inverters',
  'ci-hybrid': 'hybrid-inverters',
}

export async function generateMetadata({ params, searchParams }: Props) {
  const { slug } = await params
  const { segment } = await searchParams
  const resolved = legacyCategorySlugs[slug] ?? slug
  const meta = await getCategoryMeta(resolved)
  if (!meta) return {}
  const segmentLabel = segment ? segmentLabelForSlug(resolved, segment) : null
  if (segmentLabel) {
    return {
      title: `${segmentLabel} · ${meta.title}`,
      description: meta.description,
    }
  }
  return { title: meta.title, description: meta.description }
}

export default async function ProductCategoryPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { segment } = await searchParams
  if (legacyCategorySlugs[slug]) {
    const next = segment
      ? `/products/category/${legacyCategorySlugs[slug]}?segment=${encodeURIComponent(segment)}`
      : `/products/category/${legacyCategorySlugs[slug]}`
    redirect(next)
  }

  const meta = await getCategoryMeta(slug)
  if (!meta) notFound()

  const allSeries = await getSeriesByCategory(slug)
  const segmentLabel = segment ? segmentLabelForSlug(slug, segment) : null
  const seriesList =
    segment && segmentLabel
      ? allSeries.filter((series) => seriesMatchesSegment(series, slug, segment))
      : allSeries

  return (
    <main>
      <PageHero
        eyebrow="Inverters"
        title={segmentLabel ? `${meta.title} · ${segmentLabel}` : meta.title}
        description={
          segmentLabel
            ? `${segmentLabel} products in the ${meta.title} range.`
            : meta.description
        }
      />
      <Breadcrumbs
        items={[
          { label: 'Inverters', href: '/products' },
          {
            label: meta.title,
            href: segmentLabel ? `/products/category/${slug}` : undefined,
          },
          ...(segmentLabel ? [{ label: segmentLabel }] : []),
        ]}
      />

      <section className="bg-oriana-surface py-12 lg:py-16">
        <div className="container">
          {segmentLabel ? (
            <p className="mb-8 text-sm text-oriana-muted">
              Showing {segmentLabel}.{' '}
              <Link href={`/products/category/${slug}`} className="font-semibold text-oriana-blue hover:underline">
                View all {meta.title}
              </Link>
            </p>
          ) : null}

          {seriesList.length === 0 ? (
            <div className="rounded-lg border border-dashed border-oriana-navy/20 bg-white px-8 py-12 text-center">
              <p className="text-oriana-muted">
                Models for this {segmentLabel ? 'segment' : 'category'} will appear here soon. For availability and specs,{' '}
                <Link href="/contact" className="font-semibold text-oriana-blue hover:underline">
                  contact our team
                </Link>
                .
              </p>
            </div>
          ) : (
            <ProductSeriesSections cards={seriesList.map(seriesToCatalogueCard)} />
          )}
        </div>
      </section>
    </main>
  )
}
