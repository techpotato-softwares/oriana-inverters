import type { Metadata } from 'next'

import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { ComingSoon } from '@/components/oriana/ComingSoon'
import { PageHero } from '@/components/oriana/PageHero'
import { FoundationProgrammes } from '@/components/oriana/about/FoundationProgrammes'
import { aboutFoundation as defaults } from '@/components/oriana/about/aboutData'
import { getAbout } from '@/utilities/getMarketing'
import {
  resolveCards,
  resolveIntro,
  resolveLink,
  resolveMeta,
  resolveText,
} from '@/utilities/cmsContent'

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAbout()
  return resolveMeta(about?.foundation?.meta, defaults.meta)
}

export default async function OrianaFoundationPage() {
  const about = await getAbout()
  const cms = about?.foundation
  const hero = {
    eyebrow: resolveText(cms?.hero?.eyebrow, defaults.hero.eyebrow),
    title: resolveText(cms?.hero?.title, defaults.hero.title),
    description: resolveText(cms?.hero?.description, defaults.hero.description),
  }
  const breadcrumbs = [{ label: 'About Us', href: '/about' }, { label: 'Oriana Foundation' }]
  const programmes = resolveCards(cms?.programmes, defaults.programmes)
  const cta = resolveLink(cms?.cta, defaults.cta)

  if (programmes.length === 0) {
    return (
      <main>
        <ComingSoon
          eyebrow={hero.eyebrow}
          title={hero.title}
          description={resolveText(cms?.emptyDescription, defaults.emptyDescription)}
          breadcrumbs={breadcrumbs}
          primaryHref={cta.href}
          primaryLabel={cta.label}
        />
      </main>
    )
  }

  return (
    <main>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} description={hero.description} />
      <Breadcrumbs items={breadcrumbs} />
      <FoundationProgrammes
        intro={resolveIntro(cms?.intro, defaults.intro)}
        programmes={programmes}
        cta={cta}
      />
    </main>
  )
}
