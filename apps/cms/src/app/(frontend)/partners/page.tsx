import Link from 'next/link'
import type { Metadata } from 'next'
import { Handshake, Store, Wrench } from 'lucide-react'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Partners',
    description:
      'Grow with Oriana — installer, distributor, and partnership programmes for solar and storage professionals.',
  }
}

const tracks = [
  {
    icon: Wrench,
    title: 'Installers',
    href: '/partners/installers',
    description:
      'Certified installer partners get technical support, training, and marketing resources to deliver Oriana systems with confidence.',
    cta: 'Oriana for Installers',
  },
  {
    icon: Store,
    title: 'Distributors',
    href: '/partners/distributors',
    description:
      'Authorized distributors access a full product portfolio, supply-chain support, and joint go-to-market programmes.',
    cta: 'Oriana for Distributors',
  },
  {
    icon: Handshake,
    title: 'Partnership',
    href: '/partners/partnership',
    description:
      'EPCs, technology allies, and channel partners collaborate with Oriana on projects, solutions, and long-term market growth.',
    cta: 'Become a Partner',
  },
]

export default function PartnersHubPage() {
  return (
    <main>
      <PageHero
        eyebrow="Partners"
        title="Grow together with Oriana"
        description="Join a global network of installers, distributors, and technology partners delivering bankable solar, storage, and hybrid solutions."
      />
      <Breadcrumbs items={[{ label: 'Partners' }]} />

      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-3">
            {tracks.map((track) => (
              <Link
                key={track.href}
                href={track.href}
                className="group rounded border border-oriana-navy/8 bg-white p-8 transition hover:border-oriana-blue hover:shadow-lg"
              >
                <track.icon className="h-8 w-8 text-oriana-blue" />
                <h2 className="mt-4 font-display text-xl font-bold text-oriana-navy">{track.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-oriana-muted">{track.description}</p>
                <span className="mt-6 inline-block text-sm font-semibold text-oriana-blue group-hover:underline">
                  {track.cta} →
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/where-to-buy"
              className="flex items-center justify-between rounded border border-oriana-navy/8 bg-oriana-silver/30 px-6 py-4 font-medium text-oriana-navy transition hover:border-oriana-blue hover:bg-white"
            >
              Find a Distributor
              <span className="text-oriana-blue">→</span>
            </Link>
            <Link
              href="/case-studies"
              className="flex items-center justify-between rounded border border-oriana-navy/8 bg-oriana-silver/30 px-6 py-4 font-medium text-oriana-navy transition hover:border-oriana-blue hover:bg-white"
            >
              Cases & Stories
              <span className="text-oriana-blue">→</span>
            </Link>
            <Link
              href="/support"
              className="flex items-center justify-between rounded border border-oriana-navy/8 bg-oriana-silver/30 px-6 py-4 font-medium text-oriana-navy transition hover:border-oriana-blue hover:bg-white"
            >
              Partner Support
              <span className="text-oriana-blue">→</span>
            </Link>
          </div>

          <div className="mt-16 rounded border border-oriana-blue/20 bg-oriana-navy p-8 text-white lg:p-12">
            <h2 className="font-display text-2xl font-bold">Ready to partner with Oriana?</h2>
            <p className="mt-3 max-w-xl text-white/70">
              Tell us about your business. Our channel and sales teams will follow up with programme details,
              commercial terms, and next steps.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded bg-white px-6 py-3 text-sm font-bold text-oriana-navy hover:bg-oriana-silver"
              >
                Contact Us
              </Link>
              <Link
                href="/where-to-buy"
                className="rounded border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Find a Distributor
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
