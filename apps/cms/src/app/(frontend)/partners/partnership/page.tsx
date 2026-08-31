import Link from 'next/link'
import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Partnership',
    description:
      'Become an Oriana partner — installers, distributors, EPCs, and technology alliances working together on solar and storage.',
  }
}

const paths = [
  {
    title: 'Certified installers',
    href: '/partners/become-an-installer',
    body: 'Specify and install Oriana inverters and storage with training, documentation, and dedicated installer support.',
  },
  {
    title: 'Authorized distributors',
    href: '/partners/distributors',
    body: 'Stock and sell the Oriana portfolio with supply-chain support, incentives, and joint marketing.',
  },
  {
    title: 'EPCs and developers',
    href: '/contact',
    body: 'Collaborate on C&I and utility projects with application engineering, bid support, and lifecycle service.',
  },
  {
    title: 'Technology alliances',
    href: '/about/partners',
    body: 'Integrate batteries, monitoring, EV charging, and smart-home platforms with Oriana power conversion.',
  },
]

export default function PartnershipPage() {
  return (
    <main>
      <PageHero
        eyebrow="Partners"
        title="Partnership with Oriana"
        description="We build long-term relationships with channel, project, and technology partners who share a commitment to reliable clean energy."
      />
      <Breadcrumbs
        items={[{ label: 'Partners', href: '/partners' }, { label: 'Partnership' }]}
      />

      <section className="py-12 lg:py-16">
        <div className="container">
          <h2 className="font-display text-2xl font-bold text-oriana-navy">Choose how you partner</h2>
          <p className="mt-3 max-w-2xl text-oriana-muted">
            Whether you install, distribute, develop projects, or integrate complementary technology, Oriana provides
            commercial support and a bankable product platform.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {paths.map((path) => (
              <Link
                key={path.title}
                href={path.href}
                className="group rounded border border-oriana-navy/8 p-6 transition hover:border-oriana-blue"
              >
                <h3 className="font-semibold text-oriana-navy group-hover:text-oriana-blue">{path.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-oriana-muted">{path.body}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-oriana-blue">Learn more →</span>
              </Link>
            ))}
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            <div className="rounded border border-oriana-navy/8 bg-oriana-silver/30 p-6">
              <h3 className="font-semibold text-oriana-navy">Training & enablement</h3>
              <p className="mt-2 text-sm text-oriana-muted">
                Online and on-site programmes that build technical, commercial, and service capability across your team.
              </p>
            </div>
            <div className="rounded border border-oriana-navy/8 bg-oriana-silver/30 p-6">
              <h3 className="font-semibold text-oriana-navy">Joint marketing</h3>
              <p className="mt-2 text-sm text-oriana-muted">
                Exhibitions, digital campaigns, and solution stories that raise your brand impact alongside Oriana.
              </p>
            </div>
            <div className="rounded border border-oriana-navy/8 bg-oriana-silver/30 p-6">
              <h3 className="font-semibold text-oriana-navy">Project collaboration</h3>
              <p className="mt-2 text-sm text-oriana-muted">
                Bid support, customer workshops, and engineering reviews for major rooftop, C&I, and utility deals.
              </p>
            </div>
          </div>

          <div className="mt-16 rounded border border-oriana-blue/20 bg-oriana-navy p-8 text-white lg:p-12">
            <h2 className="font-display text-2xl font-bold">Become a partner</h2>
            <p className="mt-3 max-w-xl text-white/70">
              Tell us which partnership path fits your business. We will connect you with the right Oriana team.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded bg-white px-6 py-3 text-sm font-bold text-oriana-navy hover:bg-oriana-silver"
              >
                Become a Partner
              </Link>
              <Link
                href="/about/partners"
                className="rounded border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                View Partner Network
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
