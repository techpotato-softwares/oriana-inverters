import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { FadeIn } from '@/components/oriana/FadeIn'
import { PageHero } from '@/components/oriana/PageHero'
import { getSustainability } from '@/utilities/getMarketing'
import type { Media } from '@/payload-types'

function mediaUrl(v: unknown): string | null {
  return v && typeof v === 'object' && 'url' in v && (v as Media).url ? (v as Media).url! : null
}

const fallbackHighlights = [
  { value: '45%', label: 'Renewable energy at manufacturing sites' },
  { value: 'ISO 14001', label: 'Environmental management certified' },
  { value: '2025', label: 'ESG report published' },
  { value: '1M+', label: 'Clean energy units deployed' },
]

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSustainability()
  return {
    title: data?.seo?.metaTitle || 'Sustainability',
    description:
      data?.seo?.metaDescription ||
      'Oriana Inverters commitment to sustainable manufacturing and clean energy.',
  }
}

export default async function SustainabilityPage() {
  const data = await getSustainability()
  const hero = data?.hero
  const highlights = data?.highlights?.length
    ? data.highlights.map((h) => ({ value: h.value, label: h.label }))
    : fallbackHighlights
  const imageUrl = mediaUrl(data?.image) || '/assets/illustrations/sustainability.svg'
  const links = data?.links?.length
    ? data.links
    : [
        { label: 'Our Strategy', href: '/sustainability/strategy' },
        { label: 'Reports & Policies →', href: '/sustainability/reports' },
      ]

  return (
    <main>
      <PageHero
        eyebrow={hero?.eyebrow || 'Sustainability'}
        title={hero?.title || 'Powering a Sustainable Future'}
        description={
          hero?.description ||
          'Oriana integrates environmental responsibility into product design, manufacturing, and supply chain operations.'
        }
      />
      <Breadcrumbs items={[{ label: 'Sustainability' }]} />

      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((h, i) => (
              <FadeIn key={h.label} delay={i * 0.05}>
                <div className="border border-oriana-navy/8 bg-oriana-silver/40 p-6 text-center">
                  <p className="font-display text-2xl font-light text-oriana-blue">{h.value}</p>
                  <p className="mt-2 text-sm text-oriana-muted">{h.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-center">
            <FadeIn>
              <div className="relative aspect-[4/3] overflow-hidden rounded border border-oriana-navy/8 bg-oriana-silver">
                <Image
                  src={imageUrl}
                  alt="Sustainable solar manufacturing"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-display text-2xl font-bold text-oriana-navy">
                {data?.approachTitle || 'Our Approach'}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-oriana-muted">
                {data?.approachBody ||
                  'Every Oriana inverter helps displace fossil generation over a 25+ year operational life. We complement that impact by reducing manufacturing emissions, designing for recyclability, and partnering with suppliers who share our environmental standards.'}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                {links.map((link, i) =>
                  i === 0 ? (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-full border-2 border-oriana-blue px-6 py-2.5 text-sm font-semibold text-oriana-blue hover:bg-oriana-blue hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm font-semibold text-oriana-blue hover:underline"
                    >
                      {link.label}
                    </Link>
                  ),
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </main>
  )
}
