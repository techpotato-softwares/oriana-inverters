import Link from 'next/link'
import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'
import { CtaBand } from '@/components/oriana/marketing/CtaBand'
import { LinkTiles } from '@/components/oriana/marketing/LinkTiles'
import { MarketingIcon } from '@/components/oriana/marketing/MarketingIcon'
import { partnersHub as defaults } from '@/components/oriana/partners/partnersData'
import { getPartnersPage } from '@/utilities/getMarketing'
import {
  resolveCards,
  resolveCta,
  resolveHero,
  resolveLinks,
  resolveMeta,
} from '@/utilities/cmsContent'

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPartnersPage()
  return resolveMeta(data?.hub?.meta, defaults.meta)
}

export default async function PartnersHubPage() {
  const cms = (await getPartnersPage())?.hub
  const hero = resolveHero(cms?.hero, defaults.hero)
  const tracks = resolveCards(cms?.tracks, defaults.tracks)

  return (
    <main>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} description={hero.description} />
      <Breadcrumbs items={[{ label: 'Partners' }]} />

      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-2">
            {tracks.map((track) => (
              <Link
                key={track.title}
                href={track.href || '/contact'}
                className="group rounded border border-oriana-navy/8 bg-white p-8 transition hover:border-oriana-blue hover:shadow-lg"
              >
                <MarketingIcon name={track.icon} className="h-8 w-8 text-oriana-blue" />
                <h2 className="mt-4 font-display text-xl font-bold text-oriana-navy">{track.title}</h2>
                {track.body ? (
                  <p className="mt-3 text-sm leading-relaxed text-oriana-muted">{track.body}</p>
                ) : null}
                <span className="mt-6 inline-block text-sm font-semibold text-oriana-blue group-hover:underline">
                  {track.linkLabel || 'Learn more'} →
                </span>
              </Link>
            ))}
          </div>

          <LinkTiles links={resolveLinks(cms?.quickLinks, defaults.quickLinks)} />
          <CtaBand {...resolveCta(cms?.cta, defaults.cta)} />
        </div>
      </section>
    </main>
  )
}
