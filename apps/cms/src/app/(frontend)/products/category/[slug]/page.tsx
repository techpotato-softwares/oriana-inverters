import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { CategoryPageIntro } from '@/components/oriana/CategoryPageHero'
import { HeroPageNav } from '@/components/oriana/HeroPageNav'
import { AboutHero } from '@/components/oriana/about/shared/AboutHero'
import { ProductSeriesSections } from '@/components/oriana/ProductSeriesSections'
import { CATEGORY_HERO_IMAGE, getCategoryPageCopy } from '@/data/categoryPageCopy'
import { staticCategories } from '@/data/products'
import {
  listingSectionTitle,
  segmentLabelForSlug,
  seriesMatchesSegment,
} from '@/data/productMaster'
import { seriesToCatalogueCard } from '@/utilities/allProductsCatalogue'
import { productCategoryNav } from '@/utilities/productCategoryNav'
import {
  getCategoryMeta,
  getHiddenCategorySlugs,
  getSeriesByCategory,
  isCategoryHidden,
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
      title: `${listingSectionTitle(segmentLabel)} · ${meta.title}`,
      description: meta.description,
    }
  }
  return { title: meta.title, description: meta.description }
}

export default async function ProductCategoryPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { segment } = await searchParams
  if (legacyCategorySlugs[slug]) {
    if (await isCategoryHidden(legacyCategorySlugs[slug])) notFound()
    const next = segment
      ? `/products/category/${legacyCategorySlugs[slug]}?segment=${encodeURIComponent(segment)}`
      : `/products/category/${legacyCategorySlugs[slug]}`
    redirect(next)
  }

  const meta = await getCategoryMeta(slug)
  if (!meta) notFound()

  const [allSeries, hidden] = await Promise.all([
    getSeriesByCategory(slug),
    getHiddenCategorySlugs(),
  ])
  const categoryTabs = staticCategories
    .filter((item) => !hidden.has(item.slug))
    .map((item) => ({ slug: item.slug, title: item.title }))
  const segmentLabel = segment ? segmentLabelForSlug(slug, segment) : null
  const listingLabel = segmentLabel ? listingSectionTitle(segmentLabel) : null
  const fallbackCopy = getCategoryPageCopy(slug)
  const introParagraphs =
    meta.introParagraphs && meta.introParagraphs.length > 0
      ? meta.introParagraphs
      : (fallbackCopy?.paragraphs ?? [])
  const seriesList =
    segment && segmentLabel
      ? allSeries.filter((series) => seriesMatchesSegment(series, slug, segment))
      : allSeries
  const heroSrc = meta.heroImageUrl?.trim() || CATEGORY_HERO_IMAGE

  return (
    <main>
      <AboutHero
        eyebrow="Products"
        title={meta.title}
        description={meta.description}
        media={{ kind: 'image', src: heroSrc, alt: `${meta.title} — Oriana product range` }}
        primary={{ label: 'Browse the range', href: '#catalogue' }}
        secondary={{ label: 'Find a distributor', href: '/where-to-buy' }}
        nav={<HeroPageNav label="Product categories" items={productCategoryNav(categoryTabs)} />}
      />
      <Breadcrumbs
        items={[
          { label: 'Inverters', href: '/products' },
          {
            label: meta.title,
            href: listingLabel ? `/products/category/${slug}` : undefined,
          },
          ...(listingLabel ? [{ label: listingLabel }] : []),
        ]}
      />

      <section id="catalogue" className="category-page scroll-mt-header bg-white py-16 lg:py-20">
        <div className="container">
          {introParagraphs.length > 0 ? (
            <CategoryPageIntro title={meta.title} paragraphs={introParagraphs} />
          ) : null}

          {listingLabel ? (
            <p className="category-filter-note">
              Showing {listingLabel}.{' '}
              <Link href={`/products/category/${slug}`}>
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
