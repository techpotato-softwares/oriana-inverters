import Link from 'next/link'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'
import { getPartners } from '@/utilities/getMarketing'
import type { Partner } from '@/payload-types'

export const metadata = {
  title: 'Partners',
  description: 'Oriana strategic partners — distributors, EPCs, and technology alliances.',
}

const fallbackPartnerTypes = [
  {
    category: 'Distribution Partners',
    partners: ['SolarEdge Distribution NA', 'GreenPower Wholesale', 'EuroSolar Components', 'APAC Energy Solutions'],
  },
  {
    category: 'Technology Alliances',
    partners: ['Leading Battery OEMs', 'Monitoring Platform Integrators', 'EV Charger Manufacturers', 'Smart Home Ecosystems'],
  },
  {
    category: 'EPC & Developer Partners',
    partners: ['Tier-1 Solar Developers', 'Commercial Rooftop Specialists', 'Utility-Scale EPC Firms', 'Microgrid Integrators'],
  },
]

function groupPartners(docs: Partner[]) {
  const order: string[] = []
  const map = new Map<string, string[]>()
  for (const doc of docs) {
    const group = doc.group || 'Partners'
    if (!map.has(group)) {
      map.set(group, [])
      order.push(group)
    }
    map.get(group)!.push(doc.name)
  }
  return order.map((category) => ({
    category,
    partners: map.get(category) || [],
  }))
}

export default async function PartnersPage() {
  const docs = (await getPartners()) as Partner[]
  const partnerTypes = docs.length > 0 ? groupPartners(docs) : fallbackPartnerTypes

  return (
    <main>
      <PageHero
        eyebrow="About"
        title="Partners"
        description="We work with a global network of distributors, installers, and technology partners to deliver bankable solar solutions."
      />
      <Breadcrumbs items={[{ label: 'About', href: '/about' }, { label: 'Partners' }]} />

      <section className="py-12 lg:py-16">
        <div className="container">
          {partnerTypes.map((group) => (
            <div key={group.category} className="mb-12">
              <h2 className="font-display text-xl font-bold text-oriana-navy">{group.category}</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {group.partners.map((partner) => (
                  <div
                    key={partner}
                    className="flex items-center justify-center rounded border border-oriana-navy/8 bg-oriana-silver/30 px-6 py-8 text-center text-sm font-medium text-oriana-navy"
                  >
                    {partner}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="rounded border border-oriana-blue/20 bg-oriana-navy p-8 text-white lg:p-12">
            <h2 className="font-display text-2xl font-bold">Partner with Oriana</h2>
            <p className="mt-3 max-w-xl text-white/70">
              Access technical training, co-marketing resources, and dedicated commercial support as an authorized
              Oriana partner.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded bg-white px-6 py-3 text-sm font-bold text-oriana-navy hover:bg-oriana-silver"
              >
                Become a Partner
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
