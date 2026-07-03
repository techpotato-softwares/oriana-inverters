import Image from 'next/image'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { FadeIn } from '@/components/oriana/FadeIn'
import { PageHero } from '@/components/oriana/PageHero'

export const metadata = {
  title: 'Sustainability',
  description: 'Oriana Inverters commitment to sustainable manufacturing and clean energy.',
}

const highlights = [
  { value: '45%', label: 'Renewable energy at manufacturing sites' },
  { value: 'ISO 14001', label: 'Environmental management certified' },
  { value: '2025', label: 'ESG report published' },
  { value: '1M+', label: 'Clean energy units deployed' },
]

export default function SustainabilityPage() {
  return (
    <main>
      <PageHero
        eyebrow="Sustainability"
        title="Powering a Sustainable Future"
        description="Oriana integrates environmental responsibility into product design, manufacturing, and supply chain operations."
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
                  src="/assets/illustrations/sustainability.svg"
                  alt="Sustainable solar manufacturing"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-display text-2xl font-bold text-oriana-navy">Our Approach</h2>
              <p className="mt-4 text-sm leading-relaxed text-oriana-muted">
                Every Oriana inverter helps displace fossil generation over a 25+ year operational life. We
                complement that impact by reducing manufacturing emissions, designing for recyclability, and
                partnering with suppliers who share our environmental standards.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/sustainability/strategy"
                  className="rounded-full border-2 border-oriana-blue px-6 py-2.5 text-sm font-semibold text-oriana-blue hover:bg-oriana-blue hover:text-white"
                >
                  Our Strategy
                </Link>
                <Link
                  href="/sustainability/reports"
                  className="text-sm font-semibold text-oriana-blue hover:underline"
                >
                  Reports & Policies →
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </main>
  )
}
