import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'
import { FadeIn } from '@/components/oriana/FadeIn'
import {
  getCatalogueCategories,
  getCatalogueNav,
  getCatalogueProducts,
} from '@/utilities/getCatalogue'

export const metadata = {
  title: 'Inverters',
  description:
    'Browse Oriana solar inverters — residential & C&I grid-tied, utility-scale, and hybrid energy storage.',
}

/** Legacy query-param / old category slug redirects */
const legacyCategoryRedirects: Record<string, string> = {
  string: 'residential-grid-tied',
  hybrid: 'residential-hybrid',
  utility: 'utility-grid-tied',
  micro: 'residential-grid-tied',
  accessories: 'ci-grid-tied',
  'single-phase': 'residential-grid-tied',
  'three-phase': 'ci-grid-tied',
  'utility-scale': 'utility-grid-tied',
  'energy-storage': 'residential-hybrid',
}

type Props = { searchParams: Promise<{ cat?: string }> }

export default async function ProductsPage({ searchParams }: Props) {
  const { cat } = await searchParams
  if (cat && legacyCategoryRedirects[cat]) {
    redirect(`/products/category/${legacyCategoryRedirects[cat]}`)
  }

  const [products, categories, nav] = await Promise.all([
    getCatalogueProducts(),
    getCatalogueCategories(),
    getCatalogueNav(),
  ])

  const categoryCards = nav.length
    ? nav
    : categories.map((c) => ({
        title: c.title,
        href: `/products/category/${c.slug}`,
        description: c.description,
        products: products
          .filter((p) => p.categorySlug === c.slug)
          .map((p) => ({ label: p.name, href: `/products/${p.slug}` })),
      }))

  return (
    <main>
      <PageHero
        eyebrow="Products"
        title="Solar Inverter Catalogue"
        description="High-efficiency power conversion solutions for every application — from residential rooftops to gigawatt-scale solar farms."
      />
      <Breadcrumbs items={[{ label: 'Inverters' }]} />

      <section className="py-12 lg:py-20">
        <div className="container">
          {categoryCards.length === 0 ? (
            <div className="rounded-lg border border-dashed border-oriana-navy/20 bg-oriana-surface px-8 py-16 text-center">
              <h2 className="font-display text-2xl font-semibold text-oriana-navy">
                Catalogue coming soon
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm text-oriana-muted">
                Products and categories are managed in the CMS. Create a category, then add and
                publish products to list them here.
              </p>
              <Link
                href="/admin/collections/products"
                className="mt-6 inline-flex rounded-md bg-oriana-blue px-6 py-3 text-sm font-semibold text-white hover:bg-oriana-navy"
              >
                Open Admin → Products
              </Link>
            </div>
          ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categoryCards.map((catCard, i) => {
              const count = catCard.products.length
              return (
                <FadeIn key={catCard.href} delay={i * 0.05}>
                  <Link
                    href={catCard.href}
                    className="group flex h-full flex-col rounded border border-oriana-navy/8 bg-white p-8 transition hover:-translate-y-0.5 hover:border-oriana-blue/25 hover:shadow-lg"
                  >
                    <h2 className="font-display text-xl font-bold text-oriana-navy group-hover:text-oriana-blue">
                      {catCard.title}
                    </h2>
                    {catCard.description && (
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-oriana-muted">
                        {catCard.description}
                      </p>
                    )}
                    <p className="mt-4 text-xs font-medium text-oriana-muted">
                      {count} {count === 1 ? 'model' : 'models'}
                    </p>
                    <ul className="mt-4 space-y-1 border-t border-oriana-navy/8 pt-4">
                      {catCard.products.slice(0, 3).map((p) => (
                        <li key={p.href} className="truncate font-mono text-xs text-oriana-navy/70">
                          {p.label}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-oriana-blue">
                      View all <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </Link>
                </FadeIn>
              )
            })}
          </div>
          )}

          <div className="mt-20">
            <h2 className="font-display text-2xl font-bold text-oriana-navy">Featured Models</h2>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-oriana-navy/15 bg-oriana-silver/50 text-left">
                    <th className="px-4 py-3 font-semibold text-oriana-navy">Model</th>
                    <th className="px-4 py-3 font-semibold text-oriana-navy">Category</th>
                    <th className="px-4 py-3 font-semibold text-oriana-navy">Power Range</th>
                    <th className="px-4 py-3 font-semibold text-oriana-navy">Efficiency</th>
                    <th className="px-4 py-3 font-semibold text-oriana-navy"></th>
                  </tr>
                </thead>
                <tbody>
                  {products.filter((p) => p.featured).length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-sm text-oriana-muted">
                        Mark products as Featured in Admin to show them here.
                      </td>
                    </tr>
                  ) : (
                    products
                      .filter((p) => p.featured)
                      .map((p) => (
                        <tr
                          key={p.slug}
                          className="border-b border-oriana-navy/8 hover:bg-oriana-silver/30"
                        >
                          <td className="px-4 py-4 font-mono font-medium text-oriana-navy">
                            {p.name}
                          </td>
                          <td className="px-4 py-4 text-oriana-muted">{p.category}</td>
                          <td className="px-4 py-4 text-oriana-muted">{p.powerRange}</td>
                          <td className="px-4 py-4 text-oriana-muted">{p.efficiency}</td>
                          <td className="px-4 py-4">
                            <Link
                              href={`/products/${p.slug}`}
                              className="font-semibold text-oriana-blue hover:underline"
                            >
                              Details →
                            </Link>
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
