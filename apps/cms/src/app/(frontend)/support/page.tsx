import type { Metadata } from 'next'
import { SupportHero } from '@/components/oriana/support/SupportHero'
import { SupportSubNav } from '@/components/oriana/support/SupportSubNav'
import { SupportStrengths } from '@/components/oriana/support/SupportStrengths'
import { SupportApproach } from '@/components/oriana/support/SupportApproach'
import { GlobalPresence } from '@/components/oriana/support/GlobalPresence'
import { ServiceStories } from '@/components/oriana/support/ServiceStories'
import { SupportResources } from '@/components/oriana/support/SupportResources'
import { SuccessStories } from '@/components/oriana/support/SuccessStories'
import {
  defaultApproachCta,
  defaultApproachIntro,
  defaultApproachSteps,
  defaultCases,
  defaultCasesCta,
  defaultCasesIntro,
  defaultPresence,
  defaultResources,
  defaultStories,
  defaultStoriesIntro,
  defaultStrengths,
  defaultStrengthsIntro,
  defaultSupportHero,
  supportMeta,
  type GlobalPresenceContent,
  type SupportHeroContent,
  type SupportResourcesContent,
} from '@/components/oriana/support/supportData'
import { getSupport } from '@/utilities/getMarketing'
import {
  mediaUrl,
  resolveCards,
  resolveIntro,
  resolveLink,
  resolveText,
} from '@/utilities/cmsContent'
import { isHidden, resolveCmsList, visibleItems } from '@/utilities/visibility'

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSupport()
  return {
    title: data?.seo?.metaTitle || supportMeta.title,
    description: data?.seo?.metaDescription || supportMeta.description,
  }
}

export default async function SupportPage() {
  const data = await getSupport()

  const heroCms = data?.hub?.hero
  const hero: SupportHeroContent = {
    eyebrow: resolveText(heroCms?.eyebrow, defaultSupportHero.eyebrow),
    title: resolveText(heroCms?.title, defaultSupportHero.title),
    highlight: heroCms?.title
      ? heroCms.highlight || ''
      : resolveText(heroCms?.highlight, defaultSupportHero.highlight),
    description: resolveText(heroCms?.description, defaultSupportHero.description),
    image: mediaUrl(heroCms?.image) || defaultSupportHero.image,
    primary: resolveLink(heroCms?.primary, defaultSupportHero.primary),
    secondary: resolveLink(heroCms?.secondary, defaultSupportHero.secondary),
    quickLinksLabel: resolveText(heroCms?.quickLinksLabel, defaultSupportHero.quickLinksLabel),
    quickLinks: resolveCards(heroCms?.quickLinks?.map(({ label, href, icon, hidden }) => ({
      title: label,
      href,
      icon,
      hidden,
    })), defaultSupportHero.quickLinks),
  }

  const presenceCms = data?.presence
  const presence: GlobalPresenceContent = {
    intro: resolveIntro(presenceCms?.intro, defaultPresence.intro),
    stats: resolveCmsList(
      presenceCms?.stats,
      visibleItems(presenceCms?.stats).map(({ value, label }) => ({ value, label })),
      defaultPresence.stats,
    ),
    cta: resolveLink(presenceCms?.cta, defaultPresence.cta),
    coverageLabel: resolveText(presenceCms?.coverageLabel, defaultPresence.coverageLabel),
    coverageBody: resolveText(presenceCms?.coverageBody, defaultPresence.coverageBody),
    locations: resolveCmsList(
      presenceCms?.locations,
      visibleItems(presenceCms?.locations).map(({ label, top, left }) => ({ label, top, left })),
      defaultPresence.locations,
    ),
    pillars: resolveCards(presenceCms?.pillars, defaultPresence.pillars),
  }

  const resourcesCms = data?.resources
  const feature = resourcesCms?.feature
  const resources: SupportResourcesContent = {
    intro: resolveIntro(resourcesCms?.intro, defaultResources.intro),
    feature: {
      eyebrow: resolveText(feature?.eyebrow, defaultResources.feature.eyebrow),
      title: resolveText(feature?.title, defaultResources.feature.title),
      body: resolveText(feature?.body, defaultResources.feature.body),
      image: mediaUrl(feature?.image) || defaultResources.feature.image,
      cta: resolveLink(feature?.cta, defaultResources.feature.cta),
    },
    items: resolveCards(resourcesCms?.items, defaultResources.items),
  }

  const strengthsIntro = resolveIntro(data?.strengths?.intro, defaultStrengthsIntro)
  const approachIntro = resolveIntro(data?.approach?.intro, defaultApproachIntro)
  const storiesIntro = resolveIntro(data?.stories?.intro, defaultStoriesIntro)
  const show = {
    strengths: !isHidden(data?.strengths),
    approach: !isHidden(data?.approach),
    presence: !isHidden(presenceCms),
    stories: !isHidden(data?.stories),
    resources: !isHidden(resourcesCms),
    cases: !isHidden(data?.cases),
  }
  const sections = [
    { label: 'Service brand', id: 'service-brand', visible: true },
    { label: strengthsIntro.eyebrow || 'Our strength', id: 'our-strengths', visible: show.strengths },
    { label: approachIntro.eyebrow || 'Our approach', id: 'our-approach', visible: show.approach },
    {
      label: presence.intro.eyebrow || 'Global presence',
      id: 'global-presence',
      visible: show.presence,
    },
    { label: storiesIntro.eyebrow || 'Service stories', id: 'service-stories', visible: show.stories },
    { label: resources.intro.eyebrow || 'Resources', id: 'resources', visible: show.resources },
  ].flatMap(({ visible, ...section }) => (visible ? [section] : []))

  return (
    <main className="min-h-screen">
      <SupportHero content={hero} />
      <SupportSubNav sections={sections} />
      {show.strengths ? (
        <SupportStrengths
          intro={strengthsIntro}
          items={resolveCards(data?.strengths?.items, defaultStrengths)}
        />
      ) : null}
      {show.approach ? (
        <SupportApproach
          intro={approachIntro}
          cta={resolveLink(data?.approach?.cta, defaultApproachCta)}
          steps={resolveCards(data?.approach?.steps, defaultApproachSteps)}
        />
      ) : null}
      {show.presence ? <GlobalPresence content={presence} /> : null}
      {show.stories ? (
        <ServiceStories
          intro={storiesIntro}
          stories={resolveCards(data?.stories?.items, defaultStories)}
        />
      ) : null}
      {show.resources ? <SupportResources content={resources} /> : null}
      {show.cases ? (
        <SuccessStories
          intro={resolveIntro(data?.cases?.intro, defaultCasesIntro)}
          cta={resolveLink(data?.cases?.cta, defaultCasesCta)}
          categories={resolveCards(data?.cases?.items, defaultCases)}
        />
      ) : null}
    </main>
  )
}
