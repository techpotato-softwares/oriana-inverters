import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FileText } from 'lucide-react'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'
import { ProductImage } from '@/components/oriana/ProductImage'
import { getAllProductSlugs, getProductBySlug } from '@/utilities/getCatalogue'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return {}
  return { title: product.name, description: product.description }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  return (
    <main>
      <PageHero eyebrow={product.category} title={product.name} description={product.description} />
      <Breadcrumbs
        items={[
          { label: 'Inverters', href: '/products' },
          { label: product.category, href: `/products/category/${product.categorySlug}` },
          { label: product.name },
        ]}
      />

      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ProductImage
                name={product.name}
                categorySlug={product.categorySlug}
                src={product.heroImageUrl}
                alt={product.heroImageAlt}
                className="rounded border border-oriana-navy/10"
                priority
              />

              <h2 className="mt-10 font-display text-xl font-bold text-oriana-navy">Key Specifications</h2>
              <table className="mt-4 w-full border-collapse text-sm">
                <tbody>
                  {product.specs.map((spec) => (
                    <tr key={spec.label} className="border-b border-oriana-navy/8">
                      <td className="py-3 pr-4 font-medium text-oriana-navy">{spec.label}</td>
                      <td className="py-3 text-oriana-muted">{spec.value}</td>
                    </tr>
                  ))}
                  <tr className="border-b border-oriana-navy/8">
                    <td className="py-3 font-medium text-oriana-navy">Power Range</td>
                    <td className="py-3 text-oriana-muted">{product.powerRange}</td>
                  </tr>
                  <tr className="border-b border-oriana-navy/8">
                    <td className="py-3 font-medium text-oriana-navy">Max Efficiency</td>
                    <td className="py-3 text-oriana-muted">{product.efficiency}</td>
                  </tr>
                  <tr className="border-b border-oriana-navy/8">
                    <td className="py-3 font-medium text-oriana-navy">Phases</td>
                    <td className="py-3 text-oriana-muted">{product.phases}</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-oriana-navy">Warranty</td>
                    <td className="py-3 text-oriana-muted">{product.warranty}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <aside className="space-y-4">
              <div className="rounded border border-oriana-navy/10 bg-oriana-silver/50 p-6">
                <h3 className="font-semibold text-oriana-navy">Downloads</h3>
                <ul className="mt-4 space-y-3">
                  {product.datasheetUrl ? (
                    <li>
                      <a
                        href={product.datasheetUrl}
                        className="flex items-center gap-2 text-sm text-oriana-blue hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileText className="h-4 w-4" />
                        Datasheet (PDF)
                      </a>
                    </li>
                  ) : null}
                  {['Installation Manual', 'Certificate'].map((doc) => (
                    <li key={doc}>
                      <Link
                        href="/resources/downloads"
                        className="flex items-center gap-2 text-sm text-oriana-blue hover:underline"
                      >
                        <FileText className="h-4 w-4" />
                        {doc}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/contact"
                className="flex w-full items-center justify-center gap-2 rounded bg-oriana-blue py-3.5 text-sm font-bold text-white hover:bg-oriana-navy"
              >
                Request a Quote
              </Link>

              <Link
                href="/where-to-buy"
                className="flex w-full items-center justify-center rounded border border-oriana-navy/15 py-3.5 text-sm font-semibold text-oriana-navy hover:border-oriana-blue"
              >
                Find a Distributor
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
