import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'
import {
  getAllCategorySlugs,
  getCategoryMeta,
  getProductsByCategory,
} from '@/utilities/getCatalogue'
import type { CatalogueProduct } from '@/types/catalogue'

type Props = { params: Promise<{ slug: string }> }

/** Old catalogue slugs → Excel product-family slugs */
const legacyCategorySlugs: Record<string, string> = {
  'single-phase': 'residential-grid-tied',
  'three-phase': 'ci-grid-tied',
  'utility-scale': 'utility-grid-tied',
  'energy-storage': 'residential-hybrid',
  accessories: 'ci-grid-tied',
}

function seriesOf(product: CatalogueProduct): string {
  return product.specs.find((s) => s.label === 'Model Series')?.value ?? 'Other'
}

function groupBySeries(products: CatalogueProduct[]) {
  const groups: { series: string; items: CatalogueProduct[] }[] = []
  const index = new Map<string, number>()
  for (const product of products) {
    const series = seriesOf(product)
    const existing = index.get(series)
    if (existing === undefined) {
      index.set(series, groups.length)
      groups.push({ series, items: [product] })
    } else {
      groups[existing].items.push(product)
    }
  }
  return groups
}

export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs()
  return [...slugs, ...Object.keys(legacyCategorySlugs)].map((slug) => ({ slug }))
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

  const categoryProducts = await getProductsByCategory(slug)
  const seriesGroups = groupBySeries(categoryProducts)

  return (
    <main>
      <PageHero eyebrow="Inverters" title={meta.title} description={meta.description} />
      <Breadcrumbs items={[{ label: 'Inverters', href: '/products' }, { label: meta.title }]} />

      <section className="py-12">
        <div className="container space-y-12">
          {categoryProducts.length === 0 ? (
            <p className="text-oriana-muted">Products coming soon for this category.</p>
          ) : (
            seriesGroups.map((group) => (
              <div key={group.series}>
                <div className="mb-4 flex flex-wrap items-end justify-between gap-3 border-b border-oriana-navy/10 pb-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-oriana-blue">
                      Model series
                    </p>
                    <h2 className="mt-1 font-display text-xl font-semibold text-oriana-navy md:text-2xl">
                      {group.series}
                    </h2>
                  </div>
                  <p className="text-sm text-oriana-muted">
                    {group.items.length} {group.items.length === 1 ? 'model' : 'models'}
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[720px] border-collapse text-sm">
                    <thead>
                      <tr className="border-b-2 border-oriana-navy/15 bg-oriana-silver/50 text-left">
                        <th className="px-4 py-3 font-semibold text-oriana-navy">Model</th>
                        <th className="px-4 py-3 font-semibold text-oriana-navy">Capacity</th>
                        <th className="px-4 py-3 font-semibold text-oriana-navy">Phase</th>
                        <th className="px-4 py-3 font-semibold text-oriana-navy">Weight</th>
                        <th className="px-4 py-3 font-semibold text-oriana-navy"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.items.map((p) => {
                        const weight =
                          p.specs.find((s) => s.label === 'Weight')?.value ?? '—'
                        return (
                          <tr
                            key={p.slug}
                            className="border-b border-oriana-navy/8 hover:bg-oriana-silver/30"
                          >
                            <td className="px-4 py-4 font-mono font-medium text-oriana-navy">
                              {p.name}
                            </td>
                            <td className="px-4 py-4 text-oriana-muted">{p.powerRange}</td>
                            <td className="px-4 py-4 text-oriana-muted">{p.phases}</td>
                            <td className="px-4 py-4 text-oriana-muted">{weight}</td>
                            <td className="px-4 py-4">
                              <Link
                                href={`/products/${p.slug}`}
                                className="font-semibold text-oriana-blue hover:underline"
                              >
                                Details →
                              </Link>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  )
}
