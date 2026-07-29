import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'
import { FadeIn } from '@/components/oriana/FadeIn'
import { inverterMegaMenu } from '@/config/navigation'
import {
  getCatalogueCategories,
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

  const [products, categories] = await Promise.all([
    getCatalogueProducts(),
    getCatalogueCategories(),
  ])

  const categoryMap = Object.fromEntries(categories.map((c) => [c.slug, c]))

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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {inverterMegaMenu.map((cat, i) => {
              const slug = cat.href.split('/').pop()!
              const meta = categoryMap[slug]
              const count = products.filter((p) => p.categorySlug === slug).length
              return (
                <FadeIn key={cat.title} delay={i * 0.05}>
                  <Link
                    href={cat.href}
                    className="group flex h-full flex-col rounded border border-oriana-navy/8 bg-white p-8 transition hover:-translate-y-0.5 hover:border-oriana-blue/25 hover:shadow-lg"
                  >
                    <h2 className="font-display text-xl font-bold text-oriana-navy group-hover:text-oriana-blue">
                      {cat.title}
                    </h2>
                    {meta && (
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-oriana-muted">
                        {meta.description}
                      </p>
                    )}
                    <p className="mt-4 text-xs font-medium text-oriana-muted">
                      {count > 0 ? `${count} models` : `${cat.products.length} models listed`}
                    </p>
                    <ul className="mt-4 space-y-1 border-t border-oriana-navy/8 pt-4">
                      {cat.products.slice(0, 3).map((p) => (
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
                  {products
                    .filter((p) => p.featured)
                    .map((p) => (
                      <tr key={p.slug} className="border-b border-oriana-navy/8 hover:bg-oriana-silver/30">
                        <td className="px-4 py-4 font-mono font-medium text-oriana-navy">{p.name}</td>
                        <td className="px-4 py-4 text-oriana-muted">{p.category}</td>
                        <td className="px-4 py-4 text-oriana-muted">{p.powerRange}</td>
                        <td className="px-4 py-4 text-oriana-muted">{p.efficiency}</td>
                        <td className="px-4 py-4">
                          <Link href={`/products/${p.slug}`} className="font-semibold text-oriana-blue hover:underline">
                            Details →
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
