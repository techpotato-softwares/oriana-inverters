import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { DistributorApplicationForm } from '@/components/oriana/DistributorApplicationForm'
import { FadeIn } from '@/components/oriana/FadeIn'
import { MediaHero } from '@/components/oriana/MediaHero'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Become a Distributor',
    description:
      'Apply to distribute Oriana inverters and storage. Tell us about your territory and we will follow up with portfolio and commercial details.',
  }
}

const points = [
  {
    title: 'A full product line',
    body: 'Residential, commercial, and utility inverters and storage, sold under one brand with shared documentation.',
  },
  {
    title: 'Supply and service',
    body: 'Account support, training, and after-sales programmes that stay with the product after it leaves your warehouse.',
  },
  {
    title: 'Room to grow',
    body: 'Marketing assets, project support on larger bids, and a clear path as your territory expands.',
  },
]

export default function BecomeADistributorPage() {
  return (
    <main>
      <MediaHero
        eyebrow="Partners"
        title="Become a distributor"
        description="Bring Oriana inverters and storage to your market. Share a few details and our channel team will follow up with next steps."
        imageSrc="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2400&q=80"
        imageAlt="Solar array under a clear sky"
        primary={{ href: '#distributor-form', label: 'Start your application' }}
        secondary={{ href: '/where-to-buy', label: 'Find a distributor' }}
      />
      <Breadcrumbs
        items={[
          { label: 'Partners', href: '/partners' },
          { label: 'Distributors', href: '/partners/distributors' },
          { label: 'Become a Distributor' },
        ]}
      />

      <section className="py-16 lg:py-24">
        <div className="container">
          <FadeIn>
            <h2 className="max-w-2xl font-display text-3xl font-semibold text-oriana-navy md:text-4xl">
              What distribution with Oriana looks like
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-oriana-muted">
              Authorized distributors get a bankable portfolio, commercial support, and a service network behind every
              shipment.
            </p>
          </FadeIn>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {points.map((point, index) => (
              <FadeIn key={point.title} delay={index * 0.06}>
                <h3 className="font-display text-xl font-semibold text-oriana-navy">{point.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-oriana-muted">{point.body}</p>
              </FadeIn>
            ))}
          </div>
          <p className="mt-10 text-sm text-oriana-muted">
            Already looking for stock?{' '}
            <Link href="/partners/distributors" className="font-semibold text-oriana-blue hover:underline">
              Read the distributor programme
            </Link>
            .
          </p>
        </div>
      </section>

      <section id="distributor-form" className="scroll-mt-32 bg-oriana-surface py-16 lg:py-24">
        <div className="container grid gap-12 lg:grid-cols-5 lg:gap-16">
          <FadeIn className="lg:col-span-2">
            <h2 className="font-display text-3xl font-semibold text-oriana-navy">Apply</h2>
            <p className="mt-4 text-sm leading-relaxed text-oriana-muted">
              Your application is saved for our channel team and emailed to info@orianainverters.com.
            </p>
          </FadeIn>
          <FadeIn delay={0.08} className="lg:col-span-3">
            <DistributorApplicationForm />
          </FadeIn>
        </div>
      </section>
    </main>
  )
}
