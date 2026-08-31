import Link from 'next/link'
import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Installer Training',
    description:
      'Oriana installer training community — installation, O&M, troubleshooting videos, and product documentation for PV and storage.',
  }
}

const topics = [
  {
    title: 'PV inverters',
    body: 'String and hybrid installation skills, commissioning checklists, and common fault-code walkthroughs.',
    href: '/resources/videos',
  },
  {
    title: 'Energy storage',
    body: 'Hybrid and BESS installation practices, safety, and operations guidance for residential and C&I storage.',
    href: '/resources/videos',
  },
  {
    title: 'O&M training',
    body: 'Preventive maintenance, remote diagnostics, and after-sales workflows that keep systems performing.',
    href: '/support',
  },
  {
    title: 'Product documentation',
    body: 'Datasheets, manuals, certificates, and warranty documents in the download centre.',
    href: '/resources/downloads',
  },
]

export default function InstallerTrainingPage() {
  return (
    <main>
      <PageHero
        eyebrow="Partners"
        title="Installer training community"
        description="We power your growth journey — today and beyond. Installation training, O&M modules, and troubleshooting resources for Oriana professionals."
      />
      <Breadcrumbs
        items={[
          { label: 'Partners', href: '/partners' },
          { label: 'Installers', href: '/partners/installers' },
          { label: 'Training' },
        ]}
      />

      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2">
            {topics.map((topic) => (
              <Link
                key={topic.title}
                href={topic.href}
                className="group rounded border border-oriana-navy/8 p-6 transition hover:border-oriana-blue"
              >
                <h2 className="font-semibold text-oriana-navy group-hover:text-oriana-blue">{topic.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-oriana-muted">{topic.body}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-oriana-blue">Open resources →</span>
              </Link>
            ))}
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/resources/videos"
              className="flex items-center justify-between rounded border border-oriana-navy/8 bg-oriana-silver/30 px-6 py-4 font-medium text-oriana-navy transition hover:border-oriana-blue hover:bg-white"
            >
              Installation Videos
              <span className="text-oriana-blue">→</span>
            </Link>
            <Link
              href="/resources/faqs"
              className="flex items-center justify-between rounded border border-oriana-navy/8 bg-oriana-silver/30 px-6 py-4 font-medium text-oriana-navy transition hover:border-oriana-blue hover:bg-white"
            >
              FAQs
              <span className="text-oriana-blue">→</span>
            </Link>
            <Link
              href="/resources/downloads"
              className="flex items-center justify-between rounded border border-oriana-navy/8 bg-oriana-silver/30 px-6 py-4 font-medium text-oriana-navy transition hover:border-oriana-blue hover:bg-white"
            >
              Download Centre
              <span className="text-oriana-blue">→</span>
            </Link>
          </div>

          <div className="mt-16 rounded border border-oriana-blue/20 bg-oriana-navy p-8 text-white lg:p-12">
            <h2 className="font-display text-2xl font-bold">Unlock professional growth</h2>
            <p className="mt-3 max-w-xl text-white/70">
              Certified Oriana installers get structured academy access, field guides, and a direct line to technical
              support.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/partners/become-an-installer"
                className="rounded bg-white px-6 py-3 text-sm font-bold text-oriana-navy hover:bg-oriana-silver"
              >
                Become an Installer
              </Link>
              <Link
                href="/contact"
                className="rounded border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Contact Training
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
