import type { FollowSocialLink } from '@/components/oriana/FollowOrianaSection'
import type { ProductCategoryItem } from '@/components/oriana/ProductCategoriesSection'
import type { PeekStackImage } from '@/components/oriana/PeekStackImages'
import type { VideoHeroProps } from '@/components/oriana/VideoHero'
import type { VisionMissionCard } from '@/components/oriana/VisionMissionSection'
import type { WhyChooseCard } from '@/components/oriana/WhyChooseOrianaSection'
import {
  HOME_FOLLOW_ORIANA,
  HOME_GREEN_MISSION,
  HOME_IMPACT,
  HOME_INTRODUCTION,
  HOME_PEEK_IMAGES,
  HOME_PRODUCT_CATEGORIES,
  HOME_VIDEO_HERO,
  HOME_VISION_MISSION,
  HOME_WHY_CHOOSE,
} from '@/data/homeFallback'
import type { SiteSocialLink } from '@/types/siteSettings'
import { isHidden, resolveCmsList } from '@/utilities/visibility'

function mediaUrl(value: unknown): string | undefined {
  if (value && typeof value === 'object' && 'url' in value && typeof value.url === 'string') {
    return value.url || undefined
  }
  return undefined
}

function mediaAlt(value: unknown): string | undefined {
  if (value && typeof value === 'object' && 'alt' in value && typeof value.alt === 'string') {
    return value.alt || undefined
  }
  return undefined
}

function text(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined
}

const followLabels: Record<FollowSocialLink['platform'], string> = {
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
  facebook: 'Facebook',
  x: 'X',
  youtube: 'YouTube',
}

function isFollowPlatform(value: string): value is FollowSocialLink['platform'] {
  return value === 'linkedin' || value === 'instagram' || value === 'facebook' || value === 'x' || value === 'youtube'
}

export function mapFollowLinks(socials: SiteSocialLink[]): FollowSocialLink[] {
  const links = socials.flatMap((item) => {
    if (!isFollowPlatform(item.platform) || !item.href) return []
    return [
      {
        platform: item.platform,
        href: item.href,
        label: followLabels[item.platform],
      } satisfies FollowSocialLink,
    ]
  })
  // Site settings already falls back to the default socials; an empty list means all were hidden.
  return links
}

type ImpactStat = (typeof HOME_IMPACT.stats)[number]

/** Older seeded homepage copy, replaced on the public site until the CMS global is edited. */
const IMPACT_STAT_REFRESH: Record<string, Pick<ImpactStat, 'value' | 'label'>> = {
  'Solar industry project experience': {
    value: '10+',
    label: 'Years experience in renewable sector',
  },
  'Inverter distribution & experience': {
    value: '5 GW+',
    label: 'Distribution and service experience',
  },
  'Channel & service partners': {
    value: '50+',
    label: 'Channels and service',
  },
}

function refreshImpactStat(stat: ImpactStat): ImpactStat {
  const next = IMPACT_STAT_REFRESH[stat.label]
  return next ? { ...stat, value: next.value, label: next.label } : stat
}

/** Sections an editor can hide are `null`; list sections hide by returning `[]`. */
export type HomePageView = {
  videoHero: VideoHeroProps
  introduction: typeof HOME_INTRODUCTION | null
  peekImages: PeekStackImage[]
  visionMission: VisionMissionCard[]
  impact: {
    title: string
    body: string
    link: { label: string; href: string }
    stats: ImpactStat[]
  } | null
  productCategories: {
    title?: string
    categories: ProductCategoryItem[]
  } | null
  whyChoose: {
    title: string
    body: string
    cards: WhyChooseCard[]
  } | null
  greenMission: typeof HOME_GREEN_MISSION | null
  news: {
    title?: string
    mode?: 'live' | 'manual' | null
    postsLimit?: number | null
    link?: { label: string; href: string }
    manualItems: {
      title: string
      date: string
      href: string
      type: string
      image?: string
    }[]
  } | null
  follow: {
    title: string
    links: FollowSocialLink[]
  } | null
}

const fallbackView = (followLinks: FollowSocialLink[]): HomePageView => ({
  videoHero: HOME_VIDEO_HERO,
  introduction: HOME_INTRODUCTION,
  peekImages: HOME_PEEK_IMAGES,
  visionMission: HOME_VISION_MISSION,
  impact: HOME_IMPACT,
  productCategories: { categories: HOME_PRODUCT_CATEGORIES },
  whyChoose: HOME_WHY_CHOOSE,
  greenMission: HOME_GREEN_MISSION,
  news: {
    title: 'Trending News & Events',
    mode: 'live',
    postsLimit: 5,
    link: { label: 'Explore more', href: '/posts' },
    manualItems: [],
  },
  follow: {
    title: HOME_FOLLOW_ORIANA.title,
    links: followLinks,
  },
})

function byKey<T extends { id: string }>(items: T[]): Map<string, T> {
  return new Map(items.map((item) => [item.id, item]))
}

const CATEGORY_HREF = /^\/products\/category\/([^/?#]+)/

function linksToHiddenCategory(href: string | undefined, hidden: ReadonlySet<string>): boolean {
  if (!href || !hidden.size) return false
  const slug = CATEGORY_HREF.exec(href)?.[1]
  return Boolean(slug && hidden.has(slug))
}

/** Drop home tiles that point at a category an editor has hidden. */
function withoutHiddenCategoryTiles(view: HomePageView, hidden: ReadonlySet<string>): HomePageView {
  if (!hidden.size) return view
  return {
    ...view,
    peekImages: view.peekImages.filter((item) => !linksToHiddenCategory(item.href, hidden)),
    productCategories: view.productCategories
      ? {
          ...view.productCategories,
          categories: view.productCategories.categories.filter(
            (item) => !linksToHiddenCategory(item.href, hidden),
          ),
        }
      : null,
  }
}

type MapHomeOptions = {
  hiddenCategorySlugs?: ReadonlySet<string>
}

/** Map Payload Home global → homepage view. `home === null` means the CMS fetch failed. */
export function mapHomePage(
  home: unknown,
  socials: SiteSocialLink[],
  { hiddenCategorySlugs = new Set() }: MapHomeOptions = {},
): HomePageView {
  return withoutHiddenCategoryTiles(mapHomeDoc(home, socials), hiddenCategorySlugs)
}

/** Text rows (`{ text }`) with hidden rows skipped. */
function textRows(rows: unknown): string[] {
  if (!Array.isArray(rows)) return []
  return rows.flatMap((row) => {
    if (isHidden(row)) return []
    const value = text((row as { text?: unknown }).text)
    return value ? [value] : []
  })
}

function mapHomeDoc(home: unknown, socials: SiteSocialLink[]): HomePageView {
  const followLinks = mapFollowLinks(socials)

  if (!home || typeof home !== 'object') {
    return fallbackView(HOME_FOLLOW_ORIANA.links)
  }

  const doc = home as Record<string, unknown>
  const hero = (doc.hero ?? {}) as Record<string, unknown>
  const introduction = (doc.introduction ?? {}) as Record<string, unknown>
  const impact = (doc.impactSection ?? {}) as Record<string, unknown>
  const products = (doc.productCategories ?? {}) as Record<string, unknown>
  const why = (doc.whySection ?? {}) as Record<string, unknown>
  const green = (doc.greenMission ?? {}) as Record<string, unknown>
  const news = (doc.newsSection ?? {}) as Record<string, unknown>
  const follow = (doc.followSection ?? {}) as Record<string, unknown>

  const captions = textRows(hero.captions)
  const paragraphs = textRows(introduction.paragraphs)

  const peekFallback = byKey(HOME_PEEK_IMAGES)
  const peekImages = Array.isArray(doc.peekImages)
    ? doc.peekImages.flatMap((row, index): PeekStackImage[] => {
        if (!row || typeof row !== 'object' || isHidden(row)) return []
        const item = row as Record<string, unknown>
        const id = text(item.idKey) || HOME_PEEK_IMAGES[index]?.id
        if (!id) return []
        const fallback = peekFallback.get(id) ?? HOME_PEEK_IMAGES[index]
        return [
          {
            id,
            title: text(item.title) || fallback?.title,
            href: text(item.href) || fallback?.href,
            image: mediaUrl(item.image) || fallback?.image || '',
            alt: text(item.alt) || mediaAlt(item.image) || fallback?.alt,
          },
        ]
      })
    : []

  const visionFallback = byKey(HOME_VISION_MISSION)
  const visionMission = Array.isArray(doc.visionMission)
    ? doc.visionMission.flatMap((row, index): VisionMissionCard[] => {
        if (!row || typeof row !== 'object' || isHidden(row)) return []
        const item = row as Record<string, unknown>
        const id = text(item.idKey) || HOME_VISION_MISSION[index]?.id
        if (!id) return []
        const fallback = visionFallback.get(id) ?? HOME_VISION_MISSION[index]
        return [
          {
            id,
            label: text(item.label) || fallback?.label || '',
            body: text(item.body) || fallback?.body,
            image: mediaUrl(item.image) || fallback?.image || '',
            alt: text(item.alt) || mediaAlt(item.image) || fallback?.alt,
            href: text(item.href) || fallback?.href,
            ctaLabel: text(item.ctaLabel) || fallback?.ctaLabel,
          },
        ]
      })
    : []

  const impactLink = (impact.link ?? {}) as Record<string, unknown>
  const stats = Array.isArray(impact.stats)
    ? impact.stats.flatMap((row): ImpactStat[] => {
        if (!row || typeof row !== 'object' || isHidden(row)) return []
        const item = row as Record<string, unknown>
        const value = text(item.value)
        const label = text(item.label)
        if (!value || !label) return []
        return [refreshImpactStat({ iconKey: text(item.iconKey) || 'globe', value, label })]
      })
    : []

  const productFallback = byKey(HOME_PRODUCT_CATEGORIES)
  const productItems = Array.isArray(products.items)
    ? products.items.flatMap((row, index): ProductCategoryItem[] => {
        if (!row || typeof row !== 'object' || isHidden(row)) return []
        const item = row as Record<string, unknown>
        const id = text(item.idKey) || HOME_PRODUCT_CATEGORIES[index]?.id
        if (!id) return []
        const fallback = productFallback.get(id) ?? HOME_PRODUCT_CATEGORIES[index]
        const href = text(item.href) || fallback?.href
        if (!href) return []
        return [
          {
            id,
            label: text(item.label) || fallback?.label || '',
            href,
            image: mediaUrl(item.image) || fallback?.image || '',
            alt: text(item.alt) || mediaAlt(item.image) || fallback?.alt,
          },
        ]
      })
    : []

  const whyFallback = new Map(HOME_WHY_CHOOSE.cards.map((card) => [card.id, card]))
  const whyCards = Array.isArray(why.cards)
    ? why.cards.flatMap((row, index): WhyChooseCard[] => {
        if (!row || typeof row !== 'object' || isHidden(row)) return []
        const item = row as Record<string, unknown>
        const id = text(item.idKey) || HOME_WHY_CHOOSE.cards[index]?.id
        if (!id) return []
        const fallback = whyFallback.get(id) ?? HOME_WHY_CHOOSE.cards[index]
        return [
          {
            id,
            title: text(item.title) || fallback?.title || '',
            href: text(item.href) || fallback?.href,
            image: mediaUrl(item.image) || fallback?.image || '',
            alt: text(item.alt) || mediaAlt(item.image) || fallback?.alt,
          },
        ]
      })
    : []

  const newsLink = (news.link ?? {}) as Record<string, unknown>
  const manualItems = Array.isArray(news.manualItems)
    ? news.manualItems.flatMap((row) => {
        if (!row || typeof row !== 'object' || isHidden(row)) return []
        const item = row as Record<string, unknown>
        const title = text(item.title)
        if (!title) return []
        return [
          {
            title,
            date: text(item.date) || '',
            href: text(item.href) || '/posts',
            type: text(item.type) || 'News',
            image: mediaUrl(item.image),
          },
        ]
      })
    : []

  return {
    videoHero: {
      videoSrc: mediaUrl(hero.video) || HOME_VIDEO_HERO.videoSrc,
      posterSrc: mediaUrl(hero.poster) || HOME_VIDEO_HERO.posterSrc,
      captions: resolveCmsList(hero.captions, captions, HOME_VIDEO_HERO.captions),
    },
    introduction: isHidden(introduction)
      ? null
      : {
          title: text(introduction.title) || HOME_INTRODUCTION.title,
          paragraphs: resolveCmsList(introduction.paragraphs, paragraphs, HOME_INTRODUCTION.paragraphs),
          tagline: text(introduction.tagline) || HOME_INTRODUCTION.tagline,
        },
    peekImages:
      doc.peekImagesHidden === true ? [] : resolveCmsList(doc.peekImages, peekImages, HOME_PEEK_IMAGES),
    visionMission:
      doc.visionMissionHidden === true
        ? []
        : resolveCmsList(doc.visionMission, visionMission, HOME_VISION_MISSION),
    impact: isHidden(impact)
      ? null
      : {
          title: text(impact.title) || HOME_IMPACT.title,
          body: text(impact.body) || HOME_IMPACT.body,
          link: {
            label: text(impactLink.label) || HOME_IMPACT.link.label,
            href: text(impactLink.href) || HOME_IMPACT.link.href,
          },
          stats: resolveCmsList(impact.stats, stats, HOME_IMPACT.stats),
        },
    productCategories: isHidden(products)
      ? null
      : {
          title: text(products.title),
          categories: resolveCmsList(products.items, productItems, HOME_PRODUCT_CATEGORIES),
        },
    whyChoose: isHidden(why)
      ? null
      : {
          title: text(why.title) || HOME_WHY_CHOOSE.title,
          body: text(why.body) || HOME_WHY_CHOOSE.body,
          cards: resolveCmsList(why.cards, whyCards, HOME_WHY_CHOOSE.cards),
        },
    greenMission: isHidden(green)
      ? null
      : {
          title: text(green.title) || HOME_GREEN_MISSION.title,
          image: mediaUrl(green.image) || HOME_GREEN_MISSION.image,
          alt: text(green.alt) || mediaAlt(green.image) || HOME_GREEN_MISSION.alt,
          href: text(green.href) || HOME_GREEN_MISSION.href,
          ctaLabel: text(green.ctaLabel) || HOME_GREEN_MISSION.ctaLabel,
        },
    news: isHidden(news)
      ? null
      : {
          title: text(news.title),
          mode: news.mode === 'manual' || news.mode === 'live' ? news.mode : 'live',
          postsLimit: typeof news.postsLimit === 'number' ? news.postsLimit : 5,
          link:
            text(newsLink.href) && text(newsLink.label)
              ? { label: text(newsLink.label)!, href: text(newsLink.href)! }
              : { label: 'Explore more', href: '/posts' },
          manualItems,
        },
    follow: isHidden(follow)
      ? null
      : {
          title: text(follow.title) || HOME_FOLLOW_ORIANA.title,
          links: followLinks,
        },
  }
}
