import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { AboutHero } from '@/components/oriana/about/shared/AboutHero'
import { PartnersPageNav } from '@/components/oriana/partners/PartnersPageNav'
import { heroImages } from '@/components/oriana/heroImages'
import { CtaBand } from '@/components/oriana/marketing/CtaBand'
import { LinkTiles } from '@/components/oriana/marketing/LinkTiles'
import { MarketingIcon } from '@/components/oriana/marketing/MarketingIcon'
import { partnersInstallers as defaults } from '@/components/oriana/partners/partnersData'
import { getPartnersPage } from '@/utilities/getMarketing'
import {
  resolveCards,
  resolveCta,
  resolveHero,
  resolveIntro,
  resolveLinks,
  resolveMeta,
} from '@/utilities/cmsContent'
import { isHidden } from '@/utilities/visibility'

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPartnersPage()
  return resolveMeta(data?.installers?.meta, defaults.meta)
}

export default async function InstallersPage() {
  const cms = (await getPartnersPage())?.installers
  const hero = resolveHero(cms?.hero, defaults.hero)
  const intro = resolveIntro(cms?.intro, defaults.intro)
  const pillars = resolveCards(cms?.pillars, defaults.pillars)

  return (
    <main>
      <AboutHero
        eyebrow={hero.eyebrow || 'Partners'}
        title={hero.title}
        description={hero.description}
        media={{ kind: 'image', ...(hero.image ? { src: hero.image, alt: hero.title } : heroImages.installers) }}
        primary={{ label: 'Become an installer', href: '/partners/become-an-installer' }}
        secondary={{ label: 'Installer training', href: '/partners/training' }}
        nav={<PartnersPageNav />}
      />
      <Breadcrumbs items={[{ label: 'Partners', href: '/partners' }, { label: 'Installers' }]} />

      <section className="py-12 lg:py-16">
        <div className="container">
          <h2 className="font-display text-2xl font-bold text-oriana-navy">{intro.title}</h2>
          {intro.description ? <p className="mt-3 max-w-2xl text-oriana-muted">{intro.description}</p> : null}
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {pillars.map((item) => (
              <div key={item.title} className="rounded border border-oriana-navy/8 p-6">
                <MarketingIcon name={item.icon} className="h-8 w-8 text-oriana-blue" />
                <h3 className="mt-4 font-semibold text-oriana-navy">{item.title}</h3>
                {item.body ? <p className="mt-2 text-sm leading-relaxed text-oriana-muted">{item.body}</p> : null}
              </div>
            ))}
          </div>

          <LinkTiles links={resolveLinks(cms?.quickLinks, defaults.quickLinks)} />
          {isHidden(cms?.cta) ? null : <CtaBand {...resolveCta(cms?.cta, defaults.cta)} />}
        </div>
      </section>
    </main>
  )
}
