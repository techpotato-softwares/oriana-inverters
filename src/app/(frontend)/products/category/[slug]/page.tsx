import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'
import {
  getAllCategorySlugs,
  getCategoryMeta,
  getProductsByCategory,
} from '@/utilities/getCatalogue'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const meta = await getCategoryMeta(slug)
  if (!meta) return {}
  return { title: meta.title, description: meta.description }
}

export default async function ProductCategoryPage({ params }: Props) {
  const { slug } = await params
  const meta = await getCategoryMeta(slug)
  if (!meta) notFound()

  const categoryProducts = await getProductsByCategory(slug)

  return (
    <main>
      <PageHero eyebrow="Inverters" title={meta.title} description={meta.description} />
      <Breadcrumbs items={[{ label: 'Inverters', href: '/products' }, { label: meta.title }]} />

      <section className="py-12">
        <div className="container">
          {categoryProducts.length === 0 ? (
            <p className="text-oriana-muted">Products coming soon for this category.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-oriana-navy/15 bg-oriana-silver/50 text-left">
                    <th className="px-4 py-3 font-semibold text-oriana-navy">Model</th>
                    <th className="px-4 py-3 font-semibold text-oriana-navy">Power Range</th>
                    <th className="px-4 py-3 font-semibold text-oriana-navy">Efficiency</th>
                    <th className="px-4 py-3 font-semibold text-oriana-navy">Phases</th>
                    <th className="px-4 py-3 font-semibold text-oriana-navy"></th>
                  </tr>
                </thead>
                <tbody>
                  {categoryProducts.map((p) => (
                    <tr key={p.slug} className="border-b border-oriana-navy/8 hover:bg-oriana-silver/30">
                      <td className="px-4 py-4 font-mono font-medium text-oriana-navy">{p.name}</td>
                      <td className="px-4 py-4 text-oriana-muted">{p.powerRange}</td>
                      <td className="px-4 py-4 text-oriana-muted">{p.efficiency}</td>
                      <td className="px-4 py-4 text-oriana-muted">{p.phases}</td>
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
          )}
        </div>
      </section>
    </main>
  )
}
