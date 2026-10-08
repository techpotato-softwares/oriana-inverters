import type { Metadata } from 'next'

import type {
  CardItem,
  CtaBandContent,
  HeroContent,
  Intro,
  LinkItem,
  PageMeta,
} from '@/components/oriana/marketing/types'
import type { Media } from '@/payload-types'

type Maybe<T> = T | null | undefined

type CmsText = Maybe<string>
type CmsLink = Maybe<{ label?: CmsText; href?: CmsText }>
type CmsIntro = Maybe<{ eyebrow?: CmsText; title?: CmsText; description?: CmsText }>
type CmsHero = Maybe<{
  eyebrow?: CmsText
  title?: CmsText
  description?: CmsText
  image?: Maybe<number | Media>
}>
type CmsCta = Maybe<{ title?: CmsText; body?: CmsText; primary?: CmsLink; secondary?: CmsLink }>
type CmsCard = {
  title: string
  body?: CmsText
  icon?: CmsText
  image?: Maybe<number | Media>
  href?: CmsText
  linkLabel?: CmsText
  tag?: CmsText
  highlights?: Maybe<{ text: string }[]>
}

export function mediaUrl(value: unknown): string | undefined {
  if (value && typeof value === 'object' && 'url' in value) {
    const url = (value as Media).url
    if (url) return url
  }
  return undefined
}

export function resolveText(value: CmsText, fallback: string): string {
  return value?.trim() || fallback
}

export function resolveHero(cms: CmsHero, fallback: HeroContent): HeroContent {
  return {
    eyebrow: cms?.eyebrow || fallback.eyebrow,
    title: cms?.title || fallback.title,
    description: cms?.description || fallback.description,
    image: mediaUrl(cms?.image) || fallback.image,
  }
}

export function resolveIntro(cms: CmsIntro, fallback: Intro): Intro {
  return {
    eyebrow: cms?.eyebrow || fallback.eyebrow,
    title: cms?.title || fallback.title,
    description: cms?.description || fallback.description,
  }
}

export function resolveLink(cms: CmsLink, fallback: LinkItem): LinkItem
export function resolveLink(cms: CmsLink, fallback?: LinkItem): LinkItem | undefined
export function resolveLink(cms: CmsLink, fallback?: LinkItem): LinkItem | undefined {
  return cms?.label && cms?.href ? { label: cms.label, href: cms.href } : fallback
}

export function resolveLinks(cms: Maybe<{ label: string; href: string }[]>, fallback: LinkItem[]): LinkItem[] {
  return cms && cms.length > 0 ? cms.map(({ label, href }) => ({ label, href })) : fallback
}

export function resolveCta(cms: CmsCta, fallback: CtaBandContent): CtaBandContent {
  return {
    title: cms?.title || fallback.title,
    body: cms?.body || fallback.body,
    primary: resolveLink(cms?.primary, fallback.primary),
    secondary: resolveLink(cms?.secondary, fallback.secondary),
  }
}

/** CMS cards replace the defaults; missing images/icons/links borrow from the default at the same index. */
export function resolveCards(cms: Maybe<CmsCard[]>, fallback: CardItem[]): CardItem[] {
  if (!cms || cms.length === 0) return fallback
  return cms.map((card, index) => {
    const base = fallback.length > 0 ? fallback[index % fallback.length] : undefined
    const highlights = card.highlights?.map((item) => item.text).filter(Boolean)
    return {
      title: card.title,
      body: card.body || undefined,
      icon: card.icon || base?.icon,
      image: mediaUrl(card.image) || base?.image,
      href: card.href || undefined,
      linkLabel: card.linkLabel || base?.linkLabel,
      tag: card.tag || undefined,
      highlights: highlights && highlights.length > 0 ? highlights : undefined,
    }
  })
}

export function resolveMeta(cms: Maybe<{ title?: CmsText; description?: CmsText }>, fallback: PageMeta): Metadata {
  return {
    title: cms?.title || fallback.title,
    description: cms?.description || fallback.description,
  }
}
