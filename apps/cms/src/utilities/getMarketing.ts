import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

import { mainNav, type MainNavEntry } from '@/config/navigation'
import type { Distributor } from '@/data/distributors'
import { slugifySeries } from '@/utilities/series'
import type { HomeHeroSlide } from '@/types/homeHero'

function relationId(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value !== '') {
    const n = Number(value)
    if (Number.isFinite(n)) return n
  }
  if (value && typeof value === 'object' && 'id' in value) {
    return relationId((value as { id: unknown }).id)
  }
  return null
}

function mediaUrl(value: unknown): string | null {
  if (value && typeof value === 'object' && 'url' in value) {
    const url = (value as { url?: string | null }).url
    return url || null
  }
  return null
}

export type HeaderNavView = {
  hotlineLabel: string
  localeLabel: string
  searchLabel: string
  loginLabel: string
  loginHref: string
  whereToBuy: { label: string; href: string }
  requestQuote: { label: string; href: string }
  mainNav: MainNavEntry[]
}

const defaultHeaderNav: HeaderNavView = {
  hotlineLabel: 'Customer Hotline',
  localeLabel: 'USA · English',
  searchLabel: 'Search',
  loginLabel: 'Login',
  loginHref: '/admin',
  whereToBuy: { label: 'Where to Buy', href: '/where-to-buy' },
  requestQuote: { label: 'Request Quote', href: '/contact' },
  mainNav: [...mainNav],
}

async function fetchHeaderNav(): Promise<HeaderNavView> {
  try {
    const payload = await getPayload({ config: configPromise })
    const doc = await payload.findGlobal({ slug: 'header', depth: 0 })

    return {
      hotlineLabel: doc?.hotlineLabel || defaultHeaderNav.hotlineLabel,
      localeLabel: doc?.localeLabel || defaultHeaderNav.localeLabel,
      searchLabel: doc?.searchLabel || defaultHeaderNav.searchLabel,
      loginLabel: doc?.loginLabel || defaultHeaderNav.loginLabel,
      loginHref: doc?.loginHref || defaultHeaderNav.loginHref,
      whereToBuy: {
        label: doc?.whereToBuy?.label || defaultHeaderNav.whereToBuy.label,
        href: doc?.whereToBuy?.href || defaultHeaderNav.whereToBuy.href,
      },
      requestQuote: {
        label: doc?.requestQuote?.label || defaultHeaderNav.requestQuote.label,
        href: doc?.requestQuote?.href || defaultHeaderNav.requestQuote.href,
      },
      mainNav: defaultHeaderNav.mainNav,
    }
  } catch (error) {
    console.error('[getHeaderNav] failed:', error)
    return defaultHeaderNav
  }
}

export const getHeaderNav = unstable_cache(fetchHeaderNav, ['header-nav'], {
  tags: ['global_header'],
})

async function fetchHomeHeroFromGlobal(): Promise<HomeHeroSlide[]> {
  try {
    const payload = await getPayload({ config: configPromise })
    const home = await payload.findGlobal({
      slug: 'home',
      depth: 1,
    })

    if (home.heroMode !== 'slides' || !home.heroSlides?.length) return []

    const productIds = new Set<number>()
    const postIds = new Set<number>()
    for (const slide of home.heroSlides) {
      const productId = relationId(slide.product)
      const postId = relationId(slide.post)
      if (slide.linkType === 'product' && productId !== null) productIds.add(productId)
      if (slide.linkType === 'post' && postId !== null) postIds.add(postId)
    }

    const [products, posts] = await Promise.all([
      productIds.size
        ? payload.find({
            collection: 'products',
            depth: 0,
            limit: productIds.size,
            pagination: false,
            where: { id: { in: [...productIds] } },
          })
        : Promise.resolve({ docs: [] as { id: number; slug: string; name: string; modelSeries?: string | null }[] }),
      postIds.size
        ? payload.find({
            collection: 'posts',
            depth: 0,
            limit: postIds.size,
            pagination: false,
            where: {
              and: [{ id: { in: [...postIds] } }, { _status: { equals: 'published' } }],
            },
          })
        : Promise.resolve({ docs: [] as { id: number; slug: string; title: string }[] }),
    ])

    const productsById = new Map(products.docs.map((doc) => [doc.id, doc]))
    const postsById = new Map(posts.docs.map((doc) => [doc.id, doc]))

    return home.heroSlides.flatMap((slide, index): HomeHeroSlide[] => {
      const image = slide.image
      const url = mediaUrl(image)
      if (!url) return []
      const alt =
        image && typeof image === 'object' && 'alt' in image
          ? String((image as { alt?: string }).alt || '')
          : ''

      if (slide.linkType === 'product') {
        const product = productsById.get(relationId(slide.product) ?? -1)
        if (!product?.slug) return []
        const seriesSlug = product.modelSeries ? slugifySeries(product.modelSeries) : product.slug
        const href =
          seriesSlug && seriesSlug !== product.slug
            ? `/products/${seriesSlug}?model=${encodeURIComponent(product.slug)}`
            : `/products/${product.slug}`
        return [
          {
            id: index,
            imageUrl: url,
            imageAlt: alt || product.name,
            href,
            headline: slide.headline?.trim() || product.name,
            ctaLabel: slide.ctaLabel?.trim() || 'View product',
            linkType: 'product',
          },
        ]
      }

      if (slide.linkType === 'post') {
        const post = postsById.get(relationId(slide.post) ?? -1)
        if (!post?.slug) return []
        return [
          {
            id: index,
            imageUrl: url,
            imageAlt: alt || post.title,
            href: `/posts/${post.slug}`,
            headline: slide.headline?.trim() || post.title,
            ctaLabel: slide.ctaLabel?.trim() || 'Read article',
            linkType: 'post',
          },
        ]
      }

      if (slide.linkType === 'custom' && slide.href) {
        return [
          {
            id: index,
            imageUrl: url,
            imageAlt: alt || slide.headline || 'Hero',
            href: slide.href,
            headline: slide.headline?.trim() || 'Oriana',
            ctaLabel: slide.ctaLabel?.trim() || 'Learn more',
            linkType: 'product',
          },
        ]
      }

      return []
    })
  } catch (error) {
    console.error('[getHomeHeroFromGlobal] failed:', error)
    return []
  }
}

export const getHome = unstable_cache(
  async () => {
    try {
      const payload = await getPayload({ config: configPromise })
      const [home, heroSlides] = await Promise.all([
        payload.findGlobal({ slug: 'home', depth: 1 }),
        fetchHomeHeroFromGlobal(),
      ])
      return { home, heroSlides }
    } catch (error) {
      console.error('[getHome] failed:', error)
      return { home: null, heroSlides: [] as HomeHeroSlide[] }
    }
  },
  ['home-global'],
  { tags: ['home', 'home-hero'] },
)

export const getAbout = unstable_cache(
  async () => {
    try {
      const payload = await getPayload({ config: configPromise })
      return await payload.findGlobal({ slug: 'about', depth: 1 })
    } catch {
      return null
    }
  },
  ['about-global'],
  { tags: ['about'] },
)

export const getCareers = unstable_cache(
  async () => {
    try {
      const payload = await getPayload({ config: configPromise })
      return await payload.findGlobal({ slug: 'careers', depth: 1 })
    } catch {
      return null
    }
  },
  ['careers-global'],
  { tags: ['careers'] },
)

export const getSupport = unstable_cache(
  async () => {
    try {
      const payload = await getPayload({ config: configPromise })
      return await payload.findGlobal({ slug: 'support', depth: 1 })
    } catch {
      return null
    }
  },
  ['support-global'],
  { tags: ['support'] },
)

export const getSustainability = unstable_cache(
  async () => {
    try {
      const payload = await getPayload({ config: configPromise })
      return await payload.findGlobal({ slug: 'sustainability', depth: 1 })
    } catch {
      return null
    }
  },
  ['sustainability-global'],
  { tags: ['sustainability'] },
)

export const getContact = unstable_cache(
  async () => {
    try {
      const payload = await getPayload({ config: configPromise })
      return await payload.findGlobal({ slug: 'contact', depth: 2 })
    } catch {
      return null
    }
  },
  ['contact-global'],
  { tags: ['contact'] },
)

async function fetchPublishedCollection<T extends string>(
  collection: T,
  sort = 'sortOrder',
): Promise<unknown[]> {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: collection as never,
      depth: 1,
      limit: 200,
      pagination: false,
      sort,
      where: { _status: { equals: 'published' } },
      overrideAccess: false,
    })
    return result.docs
  } catch (error) {
    console.error(`[fetch ${collection}] failed:`, error)
    return []
  }
}

export const getCaseStudies = unstable_cache(
  () => fetchPublishedCollection('case-studies', '-year'),
  ['case-studies-list'],
  { tags: ['case-studies'] },
)

export const getCaseStudyBySlug = async (slug: string) => {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'case-studies',
      depth: 1,
      limit: 1,
      where: {
        and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }],
      },
    })
    return result.docs[0] ?? null
  } catch {
    return null
  }
}

export const getFaqs = unstable_cache(
  () => fetchPublishedCollection('faqs'),
  ['faqs-list'],
  { tags: ['faqs'] },
)

export const getVideos = unstable_cache(
  () => fetchPublishedCollection('videos'),
  ['videos-list'],
  { tags: ['videos'] },
)

export const getJobs = unstable_cache(
  () => fetchPublishedCollection('jobs'),
  ['jobs-list'],
  { tags: ['jobs'] },
)

export const getCertifications = unstable_cache(
  () => fetchPublishedCollection('certifications'),
  ['certifications-list'],
  { tags: ['certifications'] },
)

export const getAwards = unstable_cache(
  () => fetchPublishedCollection('awards'),
  ['awards-list'],
  { tags: ['awards'] },
)

export const getPartners = unstable_cache(
  () => fetchPublishedCollection('partners'),
  ['partners-list'],
  { tags: ['partners'] },
)

export const getWarrantyPlans = unstable_cache(
  () => fetchPublishedCollection('warranty-plans'),
  ['warranty-plans-list'],
  { tags: ['warranty-plans'] },
)

export const getSustainabilityReports = unstable_cache(
  () => fetchPublishedCollection('sustainability-reports'),
  ['sustainability-reports-list'],
  { tags: ['sustainability-reports'] },
)

export const getSolutionBySlug = async (slug: string) => {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'solutions',
      depth: 1,
      limit: 1,
      where: {
        and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }],
      },
    })
    return result.docs[0] ?? null
  } catch {
    return null
  }
}

export async function fetchDistributorsFromCms(): Promise<Distributor[]> {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'distributors',
      depth: 0,
      limit: 500,
      pagination: false,
      where: { _status: { equals: 'published' } },
    })
    return result.docs.map((doc) => ({
      id: doc.slug || String(doc.id),
      name: doc.name,
      type: doc.type as Distributor['type'],
      city: doc.city,
      state: doc.state || undefined,
      country: doc.country,
      region: doc.region,
      email: doc.email || undefined,
      phone: doc.phone || undefined,
    }))
  } catch (error) {
    console.error('[getDistributors] failed:', error)
    return []
  }
}
