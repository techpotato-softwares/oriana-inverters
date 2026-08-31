import Link from 'next/link'
import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Become an Installer',
    description:
      'Apply to become a certified Oriana installer. Access training, technical support, warranty backing, and co-marketing resources.',
  }
}

const steps = [
  {
    title: 'Tell us about your business',
    body: 'Share your region, typical project sizes, and whether you focus on residential, C&I, or both.',
  },
  {
    title: 'Meet the channel team',
    body: 'An Oriana representative will review your application, introduce local distributors, and outline programme requirements.',
  },
  {
    title: 'Complete product training',
    body: 'Finish installer academy modules covering installation, commissioning, monitoring, and after-sales service.',
  },
  {
    title: 'Go live with Oriana',
    body: 'Access documentation, warranty processes, and marketing assets so you can specify and install Oriana systems with confidence.',
  },
]

const benefits = [
  'Priority technical support for certified partners',
  'Installation videos, manuals, and FAQs',
  'Standard and extended warranty programmes',
  'Case studies and solution decks for homeowners and businesses',
  'Introductions to authorized distributors in your market',
]

export default function BecomeAnInstallerPage() {
  return (
    <main>
      <PageHero
        eyebrow="Partners"
        title="Become an Oriana installer"
        description="Work with dedicated sales and support teams. Grow your company and customer base with Oriana PV, hybrid, and storage products."
      />
      <Breadcrumbs
        items={[
          { label: 'Partners', href: '/partners' },
          { label: 'Installers', href: '/partners/installers' },
          { label: 'Become an Installer' },
        ]}
      />

      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-bold text-oriana-navy">How to join</h2>
              <ol className="mt-8 space-y-6">
                {steps.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-oriana-blue text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-oriana-navy">{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-oriana-muted">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded border border-oriana-navy/8 bg-oriana-silver/30 p-8">
              <h2 className="font-display text-xl font-bold text-oriana-navy">What you get</h2>
              <ul className="mt-6 space-y-3">
                {benefits.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-oriana-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-oriana-blue" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/resources/videos"
                  className="text-sm font-semibold text-oriana-blue hover:underline"
                >
                  Installation Videos →
                </Link>
                <Link
                  href="/resources/faqs"
                  className="text-sm font-semibold text-oriana-blue hover:underline"
                >
                  FAQs →
                </Link>
                <Link
                  href="/support/warranty"
                  className="text-sm font-semibold text-oriana-blue hover:underline"
                >
                  Warranty →
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-16 rounded border border-oriana-blue/20 bg-oriana-navy p-8 text-white lg:p-12">
            <h2 className="font-display text-2xl font-bold">Start your installer application</h2>
            <p className="mt-3 max-w-xl text-white/70">
              Use the contact form and select installer partnership. Our team typically responds within one business
              day.
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
