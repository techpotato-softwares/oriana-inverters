import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'
import { ProductImage } from '@/components/oriana/ProductImage'
import {
  getCategoryMeta,
  getSeriesByCategory,
} from '@/utilities/getCatalogue'

type Props = { params: Promise<{ slug: string }> }

export const dynamic = 'force-dynamic'

/** Old catalogue slugs → Excel product-family slugs */
const legacyCategorySlugs: Record<string, string> = {
  'single-phase': 'residential-grid-tied',
  'three-phase': 'ci-grid-tied',
  'utility-scale': 'utility-grid-tied',
  'energy-storage': 'residential-hybrid',
  accessories: 'ci-grid-tied',
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const resolved = legacyCategorySlugs[slug] ?? slug
  const meta = await getCategoryMeta(resolved)
  if (!meta) return {}
  return { title: meta.title, description: meta.description }
}

export default async function ProductCategoryPage({ params }: Props) {
  const { slug } = await params
  if (legacyCategorySlugs[slug]) {
    redirect(`/products/category/${legacyCategorySlugs[slug]}`)
  }

  const meta = await getCategoryMeta(slug)
  if (!meta) notFound()

  const seriesList = await getSeriesByCategory(slug)

  return (
    <main>
      <PageHero eyebrow="Inverters" title={meta.title} description={meta.description} />
      <Breadcrumbs items={[{ label: 'Inverters', href: '/products' }, { label: meta.title }]} />

      <section className="py-12 lg:py-16">
        <div className="container">
          {seriesList.length === 0 ? (
            <p className="text-oriana-muted">Products coming soon for this category.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {seriesList.map((series) => (
                <Link
                  key={series.slug}
                  href={`/products/${series.slug}`}
                  className="group overflow-hidden rounded-2xl border border-oriana-navy/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-oriana-blue/30 hover:shadow-lg"
                >
                  <div className="border-b border-oriana-navy/8 bg-gradient-to-br from-oriana-silver/70 to-white p-6">
                    <ProductImage
                      name={series.series}
                      categorySlug={series.categorySlug}
                      src={series.heroImageUrl}
                      alt={series.heroImageAlt}
                      className="mx-auto max-h-40"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-oriana-blue">
                      {series.phases}
                    </p>
                    <h2 className="mt-2 font-display text-lg font-bold text-oriana-navy group-hover:text-oriana-blue">
                      {series.series}
                    </h2>
                    <p className="mt-2 text-sm text-oriana-muted">
                      {series.powerRange} · {series.variants.length}{' '}
                      {series.variants.length === 1 ? 'variant' : 'variants'}
                    </p>
                    <p className="mt-4 text-sm font-semibold text-oriana-blue">View series →</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
