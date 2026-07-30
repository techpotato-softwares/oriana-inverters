import type { Metadata } from 'next'
import Link from 'next/link'

import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'
import { getPageIntros, getPartnersContent } from '@/utilities/getSiteContent'

export async function generateMetadata(): Promise<Metadata> {
  const intros = await getPageIntros()
  return {
    title: intros.partners.title,
    description: intros.partners.description,
  }
}

export default async function PartnersPage() {
  const [intros, partners] = await Promise.all([getPageIntros(), getPartnersContent()])
  const intro = intros.partners

  const groups: { category: string; partners: typeof partners }[] = []
  for (const partner of partners) {
    let group = groups.find((g) => g.category === partner.category)
    if (!group) {
      group = { category: partner.category, partners: [] }
      groups.push(group)
    }
    group.partners.push(partner)
  }
  for (const group of groups) {
    group.partners.sort((a, b) => a.sortOrder - b.sortOrder)
  }

  return (
    <main>
      <PageHero eyebrow={intro.eyebrow} title={intro.title} description={intro.description} />
      <Breadcrumbs items={[{ label: 'About', href: '/about' }, { label: 'Partners' }]} />

      <section className="py-12 lg:py-16">
        <div className="container">
          {groups.map((group) => (
            <div key={group.category} className="mb-12">
              <h2 className="font-display text-xl font-bold text-oriana-navy">{group.category}</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {group.partners.map((partner) => (
                  <div
                    key={partner.name}
                    className="flex items-center justify-center rounded border border-oriana-navy/8 bg-oriana-silver/30 px-6 py-8 text-center text-sm font-medium text-oriana-navy"
                  >
                    {partner.name}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="rounded border border-oriana-blue/20 bg-oriana-navy p-8 text-white lg:p-12">
            <h2 className="font-display text-2xl font-bold">{intro.cta.title}</h2>
            <p className="mt-3 max-w-xl text-white/70">{intro.cta.description}</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href={intro.cta.primaryCta.href}
                className="rounded bg-white px-6 py-3 text-sm font-bold text-oriana-navy hover:bg-oriana-silver"
              >
                {intro.cta.primaryCta.label}
              </Link>
              <Link
                href={intro.cta.secondaryCta.href}
                className="rounded border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                {intro.cta.secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
