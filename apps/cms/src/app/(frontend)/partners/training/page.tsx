import Link from 'next/link'
import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'
import { CtaBand } from '@/components/oriana/marketing/CtaBand'
import { LinkTiles } from '@/components/oriana/marketing/LinkTiles'
import { partnersTraining as defaults } from '@/components/oriana/partners/partnersData'
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
  return resolveMeta(data?.training?.meta, defaults.meta)
}

export default async function InstallerTrainingPage() {
  const cms = (await getPartnersPage())?.training
  const hero = resolveHero(cms?.hero, defaults.hero)
  const topics = resolveCards(cms?.topics, defaults.topics)

  return (
    <main>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} description={hero.description} />
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
                href={topic.href || '/resources/downloads'}
                className="group rounded border border-oriana-navy/8 p-6 transition hover:border-oriana-blue"
              >
                <h2 className="font-semibold text-oriana-navy group-hover:text-oriana-blue">{topic.title}</h2>
                {topic.body ? <p className="mt-2 text-sm leading-relaxed text-oriana-muted">{topic.body}</p> : null}
                <span className="mt-4 inline-block text-sm font-semibold text-oriana-blue">
                  {topic.linkLabel || 'Open resources'} →
                </span>
              </Link>
            ))}
          </div>

          <LinkTiles links={resolveLinks(cms?.quickLinks, defaults.quickLinks)} className="mt-12" />
          <CtaBand {...resolveCta(cms?.cta, defaults.cta)} />
        </div>
      </section>
    </main>
  )
}
