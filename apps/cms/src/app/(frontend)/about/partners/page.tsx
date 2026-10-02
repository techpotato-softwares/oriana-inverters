import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { ComingSoon } from '@/components/oriana/ComingSoon'
import { PageHero } from '@/components/oriana/PageHero'
import { aboutPartners as defaults } from '@/components/oriana/about/aboutData'
import { getAbout, getPartners } from '@/utilities/getMarketing'
import { resolveLink, resolveMeta, resolveText } from '@/utilities/cmsContent'
import type { Partner } from '@/payload-types'

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAbout()
  return resolveMeta(about?.partnersNetwork?.meta, defaults.meta)
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
  const [docs, about] = await Promise.all([getPartners() as Promise<Partner[]>, getAbout()])
  const cms = about?.partnersNetwork
  const hero = {
    eyebrow: resolveText(cms?.hero?.eyebrow, defaults.hero.eyebrow),
    title: resolveText(cms?.hero?.title, defaults.hero.title),
    description: resolveText(cms?.hero?.description, defaults.hero.description),
  }
  const breadcrumbs = [{ label: 'About', href: '/about' }, { label: 'Partners' }]

  if (docs.length === 0) {
    const emptyCta = resolveLink(cms?.emptyCta, defaults.emptyCta)
    return (
      <main>
        <ComingSoon
          eyebrow={hero.eyebrow}
          title={hero.title}
          description={resolveText(cms?.emptyDescription, defaults.emptyDescription)}
          breadcrumbs={breadcrumbs}
          primaryHref={emptyCta.href}
          primaryLabel={emptyCta.label}
        />
      </main>
    )
  }

  const partnerTypes = groupPartners(docs)
  const programmeLink = resolveLink(cms?.programmeLink, defaults.programmeLink)

  return (
    <main>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} description={hero.description} />
      <Breadcrumbs items={breadcrumbs} />

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
            <Link
              href={programmeLink.href}
              className="text-sm font-semibold text-oriana-blue hover:underline"
            >
              {programmeLink.label} →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
