import Link from 'next/link'
import type { Metadata } from 'next'
import { BookOpen, Globe, Headset, Megaphone } from 'lucide-react'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Oriana for Installers',
    description:
      'Join Oriana as a certified installer. Access technical support, training, a global service network, and marketing resources.',
  }
}

const pillars = [
  {
    icon: Headset,
    title: 'Technical Support',
    body: 'Remote diagnostics, on-site assistance, and a dedicated headquarters interface for regional teams — plus localized guides that close service gaps in the field.',
  },
  {
    icon: BookOpen,
    title: 'Training Resources',
    body: 'Online courses, hands-on workshops, and academy programmes covering product installation, commissioning, and after-sales service skills.',
  },
  {
    icon: Globe,
    title: 'Global Service Network',
    body: 'Certified technicians, regional hubs, and responsive call centres so you can resolve issues quickly wherever you install Oriana equipment.',
  },
  {
    icon: Megaphone,
    title: 'Marketing Support',
    body: 'Campaign collateral, solution decks, and real-world case studies to help you win homeowners, businesses, and repeat project work.',
  },
]

export default function InstallersPage() {
  return (
    <main>
      <PageHero
        eyebrow="Partners"
        title="Join us. Be professional."
        description="Oriana works with installers worldwide to deliver reliable PV, hybrid, and storage systems — backed by dedicated sales and support teams."
      />
      <Breadcrumbs
        items={[{ label: 'Partners', href: '/partners' }, { label: 'Installers' }]}
      />

      <section className="py-12 lg:py-16">
        <div className="container">
          <h2 className="font-display text-2xl font-bold text-oriana-navy">How we support you</h2>
          <p className="mt-3 max-w-2xl text-oriana-muted">
            With dedicated engineering teams and a growing partner network, we help your installation business thrive
            — from first commissioning through long-term O&M.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {pillars.map((item) => (
              <div key={item.title} className="rounded border border-oriana-navy/8 p-6">
                <item.icon className="h-8 w-8 text-oriana-blue" />
                <h3 className="mt-4 font-semibold text-oriana-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-oriana-muted">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/solutions/residential"
              className="flex items-center justify-between rounded border border-oriana-navy/8 bg-oriana-silver/30 px-6 py-4 font-medium text-oriana-navy transition hover:border-oriana-blue hover:bg-white"
            >
              Solutions for Home
              <span className="text-oriana-blue">→</span>
            </Link>
            <Link
              href="/solutions/commercial"
              className="flex items-center justify-between rounded border border-oriana-navy/8 bg-oriana-silver/30 px-6 py-4 font-medium text-oriana-navy transition hover:border-oriana-blue hover:bg-white"
            >
              Solutions for Business
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
              href="/partners/training"
              className="flex items-center justify-between rounded border border-oriana-navy/8 bg-oriana-silver/30 px-6 py-4 font-medium text-oriana-navy transition hover:border-oriana-blue hover:bg-white"
            >
              Installer Training
              <span className="text-oriana-blue">→</span>
            </Link>
            <Link
              href="/resources/downloads"
              className="flex items-center justify-between rounded border border-oriana-navy/8 bg-oriana-silver/30 px-6 py-4 font-medium text-oriana-navy transition hover:border-oriana-blue hover:bg-white"
            >
              Product Documentation
              <span className="text-oriana-blue">→</span>
            </Link>
            <Link
              href="/support/warranty"
              className="flex items-center justify-between rounded border border-oriana-navy/8 bg-oriana-silver/30 px-6 py-4 font-medium text-oriana-navy transition hover:border-oriana-blue hover:bg-white"
            >
              Warranty
              <span className="text-oriana-blue">→</span>
            </Link>
          </div>

          <div className="mt-16 rounded border border-oriana-blue/20 bg-oriana-navy p-8 text-white lg:p-12">
            <h2 className="font-display text-2xl font-bold">Become an Oriana installer</h2>
            <p className="mt-3 max-w-xl text-white/70">
              Work with dedicated Oriana sales and support teams. Grow your company and customer base with a
              bankable inverter and storage portfolio.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/partners/become-an-installer"
                className="rounded bg-white px-6 py-3 text-sm font-bold text-oriana-navy hover:bg-oriana-silver"
              >
                Become an Installer
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
