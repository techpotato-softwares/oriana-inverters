import Link from 'next/link'
import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'
import { CtaBand } from '@/components/oriana/marketing/CtaBand'
import { partnersPartnership as defaults } from '@/components/oriana/partners/partnersData'
import { getPartnersPage } from '@/utilities/getMarketing'
import {
  resolveCards,
  resolveCta,
  resolveHero,
  resolveIntro,
  resolveMeta,
} from '@/utilities/cmsContent'

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPartnersPage()
  return resolveMeta(data?.partnership?.meta, defaults.meta)
}

export default async function PartnershipPage() {
  const cms = (await getPartnersPage())?.partnership
  const hero = resolveHero(cms?.hero, defaults.hero)
  const intro = resolveIntro(cms?.intro, defaults.intro)
  const paths = resolveCards(cms?.paths, defaults.paths)
  const enablement = resolveCards(cms?.enablement, defaults.enablement)

  return (
    <main>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} description={hero.description} />
      <Breadcrumbs items={[{ label: 'Partners', href: '/partners' }, { label: 'Partnership' }]} />

      <section className="py-12 lg:py-16">
        <div className="container">
          <h2 className="font-display text-2xl font-bold text-oriana-navy">{intro.title}</h2>
          {intro.description ? <p className="mt-3 max-w-2xl text-oriana-muted">{intro.description}</p> : null}
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {paths.map((path) => (
              <Link
                key={path.title}
                href={path.href || '/contact'}
                className="group rounded border border-oriana-navy/8 p-6 transition hover:border-oriana-blue"
              >
                <h3 className="font-semibold text-oriana-navy group-hover:text-oriana-blue">{path.title}</h3>
                {path.body ? <p className="mt-2 text-sm leading-relaxed text-oriana-muted">{path.body}</p> : null}
                <span className="mt-4 inline-block text-sm font-semibold text-oriana-blue">
                  {path.linkLabel || 'Learn more'} →
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {enablement.map((item) => (
              <div key={item.title} className="rounded border border-oriana-navy/8 bg-oriana-silver/30 p-6">
                <h3 className="font-semibold text-oriana-navy">{item.title}</h3>
                {item.body ? <p className="mt-2 text-sm text-oriana-muted">{item.body}</p> : null}
              </div>
            ))}
          </div>

          <CtaBand {...resolveCta(cms?.cta, defaults.cta)} />
        </div>
      </section>
    </main>
  )
}
