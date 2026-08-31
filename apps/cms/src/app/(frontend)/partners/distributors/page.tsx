import Link from 'next/link'
import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Oriana for Distributors',
    description:
      'Become an Oriana distributor. Full product coverage, market coverage, and lifecycle service — with training, marketing, and project support.',
  }
}

const coverage = [
  {
    title: 'Full product coverage',
    body: 'A portfolio spanning residential, C&I, and utility scenarios — string, hybrid, and storage platforms designed to work together under one brand.',
  },
  {
    title: 'Full market coverage',
    body: 'Localized commercial support with the ability to tap Oriana’s broader resources as you expand across regions and customer segments.',
  },
  {
    title: 'Full service coverage',
    body: 'Lifecycle assurance: technical support, a reliable supply network, and after-sales programmes that cover products from commissioning through O&M.',
  },
]

const benefits = [
  {
    title: 'Brand endorsement',
    body: 'Partner certification and opportunities to be featured as an authorized Oriana distributor.',
  },
  {
    title: 'Operational support',
    body: 'Performance plans tailored to your capabilities and market, with realistic goals and dedicated account support.',
  },
  {
    title: 'Digital tools',
    body: 'Partner accounts for order management, logistics visibility, and commercial tracking as your volume grows.',
  },
  {
    title: 'Marketing resources',
    body: 'Datasheets, videos, technical decks, and campaign assets to support both solutions and products.',
  },
  {
    title: 'Incentives and rewards',
    body: 'Development-based incentive policies, partner events, and opportunities to visit Oriana facilities with key customers.',
  },
  {
    title: 'Major project support',
    body: 'For tenders and large bids: solution workshops, customer visits, and joint meetings until the deal is secured.',
  },
]

export default function DistributorsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Partners"
        title="Joint growth. Shared success."
        description="Oriana offers distributors a bankable product line, a robust support network, and a clear path to grow residential, C&I, and utility sales together."
      />
      <Breadcrumbs
        items={[{ label: 'Partners', href: '/partners' }, { label: 'Distributors' }]}
      />

      <section className="py-12 lg:py-16">
        <div className="container">
          <h2 className="font-display text-2xl font-bold text-oriana-navy">
            Exceptional value, reliable support, a bright future
          </h2>
          <p className="mt-3 max-w-3xl text-oriana-muted">
            Cutting-edge power conversion and storage technology, manufactured for compatibility and reliability. Partner
            with Oriana for growth — backed by training, supply, and service coverage.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {coverage.map((item) => (
              <div key={item.title} className="rounded border border-oriana-navy/8 p-6">
                <h3 className="font-semibold text-oriana-navy">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-oriana-muted">{item.body}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-16 font-display text-2xl font-bold text-oriana-navy">
            What other benefits do we offer?
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((item) => (
              <div key={item.title} className="rounded border border-oriana-navy/8 bg-oriana-silver/30 p-6">
                <h3 className="font-semibold text-oriana-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-oriana-muted">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/resources/downloads"
              className="text-sm font-semibold text-oriana-blue hover:underline"
            >
              Product Documentation →
            </Link>
            <Link href="/case-studies" className="text-sm font-semibold text-oriana-blue hover:underline">
              Cases & Stories →
            </Link>
            <Link href="/support" className="text-sm font-semibold text-oriana-blue hover:underline">
              Service & Support →
            </Link>
          </div>

          <div className="mt-16 rounded border border-oriana-blue/20 bg-oriana-navy p-8 text-white lg:p-12">
            <h2 className="font-display text-2xl font-bold">Become an Oriana distributor</h2>
            <p className="mt-3 max-w-xl text-white/70">
              Inquire about distribution rights in your territory. We will follow up with portfolio details, commercial
              terms, and onboarding next steps.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded bg-white px-6 py-3 text-sm font-bold text-oriana-navy hover:bg-oriana-silver"
              >
                Partner Inquiry
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
