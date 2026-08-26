import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'
import { FadeIn } from '@/components/oriana/FadeIn'
import { getCatalogueProducts } from '@/utilities/getCatalogue'
import { getSolutionBySlug } from '@/utilities/getMarketing'

type Props = { params: Promise<{ segment: string }> }

function mediaUrl(value: unknown): string | null {
  if (value && typeof value === 'object' && 'url' in value) {
    return (value as { url?: string | null }).url || null
  }
  return null
}

export async function generateMetadata({ params }: Props) {
  const { segment } = await params
  const data = await getSolutionBySlug(segment)
  if (!data) return {}
  return {
    title: data.seo?.metaTitle || data.title,
    description: data.seo?.metaDescription || data.description,
  }
}

export default async function SolutionPage({ params }: Props) {
  const { segment } = await params
  const data = await getSolutionBySlug(segment)
  if (!data) notFound()

  const segmentKeys = (data.segmentKeys || []) as Array<
    'residential' | 'commercial' | 'utility' | 'storage'
  >
  const allProducts = await getCatalogueProducts()
  const recommended = allProducts
    .filter((p) => segmentKeys.includes(p.segmentKey))
    .slice(0, 6)

  const imageUrl = mediaUrl(data.image) || `/assets/products/${segment === 'residential' ? 'single-phase' : segment === 'commercial' ? 'three-phase' : segment === 'utility' ? 'utility-scale' : 'hybrid-storage'}.svg`
  const benefits = (data.benefits || []).map((b) => (typeof b === 'string' ? b : b.text)).filter(Boolean)

  return (
    <main>
      <PageHero eyebrow="Solutions" title={data.title} description={data.description} />
      <Breadcrumbs
        items={[{ label: 'Solutions', href: '/solutions/residential' }, { label: data.title }]}
      />

      <section className="py-20 lg:py-28">
        <div className="container">
          <FadeIn>
            <div className="relative mx-auto mb-16 max-w-3xl overflow-hidden rounded-xl border border-oriana-navy/8 bg-oriana-silver">
              <Image
                src={imageUrl}
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
              <ul className="mt-6 space-y-3">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-3 text-oriana-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-oriana-blue" />
                    {benefit}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap gap-4">
                {data.primaryCta?.href ? (
                  <Link
                    href={data.primaryCta.href}
                    className="rounded-md bg-oriana-blue px-6 py-3 text-sm font-semibold text-white hover:bg-oriana-navy"
                  >
                    {data.primaryCta.label || 'Request a Quote'}
                  </Link>
                ) : null}
                {data.secondaryCta?.href ? (
                  <Link
                    href={data.secondaryCta.href}
                    className="rounded-md border border-oriana-navy/20 px-6 py-3 text-sm font-semibold text-oriana-navy hover:border-oriana-blue"
                  >
                    {data.secondaryCta.label || 'View Products'}
                  </Link>
                ) : null}
              </div>
            </FadeIn>

            <FadeIn delay={0.08}>
              <h2 className="font-display text-2xl font-bold text-oriana-navy">Recommended Products</h2>
              <ul className="mt-6 space-y-3">
                {recommended.map((product) => (
                  <li key={product.slug}>
                    <Link
                      href={`/products/${product.slug}`}
                      className="block rounded-lg border border-oriana-navy/8 px-4 py-3 transition hover:border-oriana-blue"
                    >
                      <p className="font-semibold text-oriana-navy">{product.name}</p>
                      <p className="text-sm text-oriana-muted">{product.powerRange}</p>
                    </Link>
                  </li>
                ))}
                {!recommended.length ? (
                  <p className="text-sm text-oriana-muted">Products coming soon.</p>
                ) : null}
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>
    </main>
  )
}
