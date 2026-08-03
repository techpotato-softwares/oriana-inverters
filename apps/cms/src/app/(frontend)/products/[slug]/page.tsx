import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { ProductSeriesDetail } from '@/components/oriana/ProductSeriesDetail'
import { getProductBySlug, getSeriesBySlug } from '@/utilities/getCatalogue'

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
  const series = await getSeriesBySlug(slug)
  if (!series) notFound()

  const deepLinkedProduct = await getProductBySlug(slug)
  const initialModelSlug =
    deepLinkedProduct && series.variants.some((v) => v.slug === deepLinkedProduct.slug)
      ? deepLinkedProduct.slug
      : series.variants[0]?.slug

  return (
    <main className="bg-[linear-gradient(180deg,#f7f9fc_0%,#ffffff_28%)]">
      <div className="border-b border-oriana-navy/8 bg-white/80">
        <div className="container py-4">
          <Breadcrumbs
            items={[
              { label: 'Inverters', href: '/products' },
              { label: series.category, href: `/products/category/${series.categorySlug}` },
              { label: series.series },
            ]}
          />
        </div>
      </div>

      <ProductSeriesDetail series={series} initialModelSlug={initialModelSlug} />
    </main>
  )
}
