import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'
import { FadeIn } from '@/components/oriana/FadeIn'
import { getSolutionBySlug } from '@/utilities/getSiteContent'

type Props = { params: Promise<{ segment: string }> }

export async function generateMetadata({ params }: Props) {
  const { segment } = await params
  const data = await getSolutionBySlug(segment)
  if (!data) return {}
  return { title: data.title, description: data.description }
}

export default async function SolutionPage({ params }: Props) {
  const { segment } = await params
  const data = await getSolutionBySlug(segment)
  if (!data) notFound()

  return (
    <main>
      <PageHero eyebrow="Solutions" title={data.title} description={data.description} />
      <Breadcrumbs items={[{ label: 'Solutions', href: '/solutions/residential' }, { label: data.title }]} />

      <section className="py-20 lg:py-28">
        <div className="container">
          <FadeIn>
            <div className="relative mx-auto mb-16 max-w-3xl overflow-hidden rounded-xl border border-oriana-navy/8 bg-oriana-silver">
              <Image
                src={data.imageUrl}
                alt=""
                width={640}
                height={400}
                className="h-auto w-full"
                unoptimized
              />
            </div>
          </FadeIn>

          <div className="grid gap-16 lg:grid-cols-2">
            <FadeIn>
              <h2 className="font-display text-2xl font-bold text-oriana-navy">Key Benefits</h2>
              <ul className="mt-8 space-y-4">
                {data.benefits.map((benefit: { text: string }) => (
                  <li key={benefit.text} className="flex items-start gap-3 text-oriana-muted">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-oriana-blue" />
                    {benefit.text}
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="font-display text-2xl font-bold text-oriana-navy">Recommended Products</h2>
              <div className="mt-8 space-y-3">
                {data.products.map((product: { name: string }) => (
                  <Link
                    key={product.name}
                    href="/products"
                    className="flex items-center justify-between rounded-xl border border-oriana-navy/8 bg-oriana-silver/50 px-6 py-4 transition hover:border-oriana-blue/20 hover:bg-white"
                  >
                    <span className="font-semibold text-oriana-navy">{product.name}</span>
                    <span className="text-sm text-oriana-blue">View →</span>
                  </Link>
                ))}
              </div>

              <div className="mt-10 flex gap-4">
                <Link
                  href="/products"
                  className="rounded-full bg-oriana-blue px-6 py-3 text-sm font-semibold text-white hover:bg-oriana-navy"
                >
                  View Products
                </Link>
                <Link
                  href="/contact"
                  className="rounded-full border border-oriana-navy/15 px-6 py-3 text-sm font-semibold text-oriana-navy hover:border-oriana-blue"
                >
                  Request a Quote
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </main>
  )
}
