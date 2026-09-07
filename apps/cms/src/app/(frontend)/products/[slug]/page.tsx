import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { ProductSeriesDetail } from '@/components/oriana/ProductSeriesDetail'
import { seriesToCatalogueCard } from '@/utilities/allProductsCatalogue'
import { getProductBySlug, getSeriesByCategory, getSeriesBySlug } from '@/utilities/getCatalogue'
import { getContact } from '@/utilities/getMarketing'
import type { Form } from '@/payload-types'

function formIdFromRelation(form: number | Form | null | undefined): number | null {
  if (typeof form === 'number' && Number.isFinite(form)) return form
  if (form && typeof form === 'object' && 'id' in form) return form.id
  return null
}

type Props = {
  params: Promise<{ slug: string }>
}

// Live CMS data + dynamic routes. generateStaticParams + searchParams caused
// DYNAMIC_SERVER_USAGE 500s in production when the page was treated as SSG.
export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = 0

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const series = await getSeriesBySlug(slug)
  if (!series) return {}

  const selected =
    series.variants.find((v) => v.slug === slug) ?? series.variants[0]

  return {
    title: selected ? `${series.series} · ${selected.powerRange}` : series.series,
    description: series.description,
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const [series, contact, deepLinkedProduct] = await Promise.all([
    getSeriesBySlug(slug),
    getContact(),
    getProductBySlug(slug),
  ])
  if (!series) notFound()

  const relatedSeries = await getSeriesByCategory(series.categorySlug)
  const initialModelSlug =
    deepLinkedProduct && series.variants.some((v) => v.slug === deepLinkedProduct.slug)
      ? deepLinkedProduct.slug
      : series.variants[0]?.slug

  const related = relatedSeries
    .filter((item) => item.slug !== series.slug)
    .slice(0, 3)
    .map(seriesToCatalogueCard)

  return (
    <main className="bg-white pt-[var(--site-header-height,8.25rem)]">
      <Breadcrumbs
        items={[
          { label: 'All Products', href: '/products' },
          { label: series.category, href: `/products/category/${series.categorySlug}` },
          { label: series.series },
        ]}
      />

      <ProductSeriesDetail
        series={series}
        related={related}
        relatedHref={`/products/category/${series.categorySlug}`}
        initialModelSlug={initialModelSlug}
        formId={formIdFromRelation(contact?.form)}
      />
    </main>
  )
}
