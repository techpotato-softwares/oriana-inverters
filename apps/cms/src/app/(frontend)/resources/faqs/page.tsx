import Link from 'next/link'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'
import { getFaqs } from '@/utilities/getMarketing'
import type { Faq } from '@/payload-types'

export const metadata = {
  title: 'FAQs',
  description: 'Frequently asked questions about Oriana solar inverters, installation, warranty, and monitoring.',
}

const fallbackFaqGroups = [
  {
    title: 'Product Selection',
    items: [
      {
        q: 'How do I choose between single-phase and three-phase inverters?',
        a: 'Single-phase inverters are designed for residential systems up to ~11.4 kW. Three-phase models are required for commercial rooftops and systems above typical residential limits. Contact your distributor or our sales team for sizing assistance.',
      },
      {
        q: 'Are Oriana hybrid inverters compatible with third-party batteries?',
        a: 'Yes. Oriana hybrid inverters support leading lithium battery brands via standard communication protocols. Refer to the compatibility list in each product datasheet.',
      },
    ],
  },
  {
    title: 'Installation & Commissioning',
    items: [
      {
        q: 'Who can install Oriana inverters?',
        a: 'Installation must be performed by licensed electricians familiar with local electrical codes and solar interconnection requirements. Certified installer training is available through our distributor network.',
      },
      {
        q: 'How do I register my inverter for warranty?',
        a: 'Register your product within 60 days of installation via the Oriana Monitoring app or the warranty portal linked from our Support page.',
      },
    ],
  },
  {
    title: 'Monitoring & Troubleshooting',
    items: [
      {
        q: 'How do I connect my inverter to WiFi?',
        a: 'Use the Oriana Monitoring app to scan the QR code on the inverter label and follow the on-screen pairing steps. Ethernet is also supported on most models.',
      },
      {
        q: 'What should I do if my inverter shows a fault code?',
        a: 'Note the fault code displayed on the unit or app, then consult the troubleshooting section of your installation manual or contact our support hotline.',
      },
    ],
  },
]

function groupFaqs(docs: Faq[]) {
  const order: string[] = []
  const map = new Map<string, { q: string; a: string }[]>()
  for (const doc of docs) {
    const group = doc.group || 'General'
    if (!map.has(group)) {
      map.set(group, [])
      order.push(group)
    }
    map.get(group)!.push({ q: doc.question, a: doc.answer })
  }
  return order.map((title) => ({
    title,
    items: map.get(title) || [],
  }))
}

export default async function FaqsPage() {
  const docs = (await getFaqs()) as Faq[]
  const faqGroups = docs.length > 0 ? groupFaqs(docs) : fallbackFaqGroups

  return (
    <main>
      <PageHero
        eyebrow="Resources"
        title="Frequently Asked Questions"
        description="Answers to common questions about product selection, installation, warranty, and monitoring."
      />
      <Breadcrumbs items={[{ label: 'Resources', href: '/resources/downloads' }, { label: 'FAQs' }]} />

      <section className="py-12 lg:py-16">
        <div className="container max-w-3xl">
          {faqGroups.map((group) => (
            <div key={group.title} className="mb-12">
              <h2 className="font-display text-xl font-bold text-oriana-navy">{group.title}</h2>
              <dl className="mt-6 space-y-6">
                {group.items.map((item) => (
                  <div key={item.q} className="rounded border border-oriana-navy/8 p-6">
                    <dt className="font-semibold text-oriana-navy">{item.q}</dt>
                    <dd className="mt-3 text-sm leading-relaxed text-oriana-muted">{item.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}

          <div className="rounded border border-oriana-blue/20 bg-oriana-silver/50 p-8 text-center">
            <p className="text-oriana-navy">Still have questions?</p>
            <Link
              href="/support"
              className="mt-4 inline-block rounded bg-oriana-blue px-6 py-3 text-sm font-bold text-white hover:bg-oriana-navy"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
