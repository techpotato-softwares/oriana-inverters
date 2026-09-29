import Link from 'next/link'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { ComingSoon } from '@/components/oriana/ComingSoon'
import { PageHero } from '@/components/oriana/PageHero'
import { getPartners } from '@/utilities/getMarketing'
import type { Partner } from '@/payload-types'

export const metadata = {
  title: 'Partners',
  description: 'Oriana strategic partners — distributors, EPCs, and technology alliances.',
}

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

  if (docs.length === 0) {
    return (
      <main>
        <ComingSoon
          eyebrow="About"
          title="Partners"
          description="Named partner listings will appear here once published. Explore distributor programmes meanwhile."
          breadcrumbs={[{ label: 'About', href: '/about' }, { label: 'Partners' }]}
          primaryHref="/partners/become-a-distributor"
          primaryLabel="Become a distributor"
        />
      </main>
    )
  }

  const partnerTypes = groupPartners(docs)

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
              <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.partners.map((name) => (
                  <li
                    key={name}
                    className="rounded border border-oriana-navy/8 bg-white px-5 py-4 text-sm font-medium text-oriana-navy"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="mt-8">
            <Link href="/partners" className="text-sm font-semibold text-oriana-blue hover:underline">
              Explore partner programmes →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
