import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'
import { CtaBand } from '@/components/oriana/marketing/CtaBand'
import { InlineLinks } from '@/components/oriana/marketing/LinkTiles'
import { partnersApplyInstaller as defaults } from '@/components/oriana/partners/partnersData'
import { getPartnersPage } from '@/utilities/getMarketing'
import {
  resolveCards,
  resolveCta,
  resolveHero,
  resolveLinks,
  resolveMeta,
  resolveText,
} from '@/utilities/cmsContent'

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPartnersPage()
  return resolveMeta(data?.applyInstaller?.meta, defaults.meta)
}

export default async function BecomeAnInstallerPage() {
  const cms = (await getPartnersPage())?.applyInstaller
  const hero = resolveHero(cms?.hero, defaults.hero)
  const steps = resolveCards(cms?.steps, defaults.steps)
  const benefits = cms?.benefits?.length ? cms.benefits.map((item) => item.text) : defaults.benefits

  return (
    <main>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} description={hero.description} />
      <Breadcrumbs
        items={[
          { label: 'Partners', href: '/partners' },
          { label: 'Installers', href: '/partners/installers' },
          { label: 'Become an Installer' },
        ]}
      />

      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-bold text-oriana-navy">
                {resolveText(cms?.stepsTitle, defaults.stepsTitle)}
              </h2>
              <ol className="mt-8 space-y-6">
                {steps.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-oriana-blue text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-oriana-navy">{step.title}</h3>
                      {step.body ? <p className="mt-1 text-sm leading-relaxed text-oriana-muted">{step.body}</p> : null}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded border border-oriana-navy/8 bg-oriana-silver/30 p-8">
              <h2 className="font-display text-xl font-bold text-oriana-navy">
                {resolveText(cms?.benefitsTitle, defaults.benefitsTitle)}
              </h2>
              <ul className="mt-6 space-y-3">
                {benefits.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-oriana-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-oriana-blue" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <InlineLinks links={resolveLinks(cms?.links, defaults.links)} className="mt-8" />
            </div>
          </div>

          <CtaBand {...resolveCta(cms?.cta, defaults.cta)} />
        </div>
      </section>
    </main>
  )
}
