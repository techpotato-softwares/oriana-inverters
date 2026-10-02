import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'
import { CtaBand } from '@/components/oriana/marketing/CtaBand'
import { InlineLinks } from '@/components/oriana/marketing/LinkTiles'
import { partnersDistributors as defaults } from '@/components/oriana/partners/partnersData'
import { getPartnersPage } from '@/utilities/getMarketing'
import {
  resolveCards,
  resolveCta,
  resolveHero,
  resolveIntro,
  resolveLinks,
  resolveMeta,
  resolveText,
} from '@/utilities/cmsContent'

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPartnersPage()
  return resolveMeta(data?.distributors?.meta, defaults.meta)
}

export default async function DistributorsPage() {
  const cms = (await getPartnersPage())?.distributors
  const hero = resolveHero(cms?.hero, defaults.hero)
  const intro = resolveIntro(cms?.intro, defaults.intro)
  const coverage = resolveCards(cms?.coverage, defaults.coverage)
  const benefits = resolveCards(cms?.benefits, defaults.benefits)

  return (
    <main>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} description={hero.description} />
      <Breadcrumbs items={[{ label: 'Partners', href: '/partners' }, { label: 'Distributors' }]} />

      <section className="py-12 lg:py-16">
        <div className="container">
          <h2 className="font-display text-2xl font-bold text-oriana-navy">{intro.title}</h2>
          {intro.description ? <p className="mt-3 max-w-3xl text-oriana-muted">{intro.description}</p> : null}

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {coverage.map((item) => (
              <div key={item.title} className="rounded border border-oriana-navy/8 p-6">
                <h3 className="font-semibold text-oriana-navy">{item.title}</h3>
                {item.body ? <p className="mt-3 text-sm leading-relaxed text-oriana-muted">{item.body}</p> : null}
              </div>
            ))}
          </div>

          <h2 className="mt-16 font-display text-2xl font-bold text-oriana-navy">
            {resolveText(cms?.benefitsTitle, defaults.benefitsTitle)}
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((item) => (
              <div key={item.title} className="rounded border border-oriana-navy/8 bg-oriana-silver/30 p-6">
                <h3 className="font-semibold text-oriana-navy">{item.title}</h3>
                {item.body ? <p className="mt-2 text-sm leading-relaxed text-oriana-muted">{item.body}</p> : null}
              </div>
            ))}
          </div>

          <InlineLinks links={resolveLinks(cms?.links, defaults.links)} />
          <CtaBand {...resolveCta(cms?.cta, defaults.cta)} />
        </div>
      </section>
    </main>
  )
}
