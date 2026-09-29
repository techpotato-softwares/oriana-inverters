import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

import { mainNav, type MainNavEntry } from '@/config/navigation'
import type { Distributor } from '@/data/distributors'
import { isPlaceholderSlug, withoutPlaceholderDocs } from '@/utilities/placeholderContent'

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
  requestQuote: { label: 'Request Quote', href: '/contact?intent=quote#contact-form' },
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
        href: quoteHref(doc?.requestQuote?.href),
      },
      mainNav: defaultHeaderNav.mainNav,
    }
  } catch (error) {
    console.error('[getHeaderNav] failed:', error)
    return defaultHeaderNav
  }
}

function quoteHref(href: string | null | undefined): string {
  const value = href?.trim()
  if (!value || value === '/contact' || value === '/contact/') {
    return '/contact?intent=quote#contact-form'
  }
  return value
}

export const getHeaderNav = unstable_cache(fetchHeaderNav, ['header-nav', 'nav-ia-2026-09'], {
  tags: ['global_header'],
})

export const getHome = unstable_cache(
  async () => {
    try {
      const payload = await getPayload({ config: configPromise })
      const home = await payload.findGlobal({ slug: 'home', depth: 1 })
      return { home }
    } catch (error) {
      console.error('[getHome] failed:', error)
      return { home: null }
    }
  },
  ['home-global'],
  { tags: ['home'] },
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
    return withoutPlaceholderDocs(collection, result.docs)
  } catch (error) {
    console.error(`[fetch ${collection}] failed:`, error)
    return []
  }
}

export const getCaseStudies = unstable_cache(
  () => fetchPublishedCollection('case-studies', '-year'),
  ['case-studies-list', 'hide-placeholders'],
  { tags: ['case-studies'] },
)

export const getCaseStudyBySlug = async (slug: string) => {
  if (isPlaceholderSlug('case-studies', slug)) return null
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
  ['faqs-list', 'hide-placeholders'],
  { tags: ['faqs'] },
)

export const getVideos = unstable_cache(
  () => fetchPublishedCollection('videos'),
  ['videos-list', 'hide-placeholders'],
  { tags: ['videos'] },
)

export const getJobs = unstable_cache(
  () => fetchPublishedCollection('jobs'),
  ['jobs-list', 'hide-placeholders'],
  { tags: ['jobs'] },
)

export const getCertifications = unstable_cache(
  () => fetchPublishedCollection('certifications'),
  ['certifications-list', 'hide-placeholders'],
  { tags: ['certifications'] },
)

export const getAwards = unstable_cache(
  () => fetchPublishedCollection('awards'),
  ['awards-list', 'hide-placeholders'],
  { tags: ['awards'] },
)

export const getPartners = unstable_cache(
  () => fetchPublishedCollection('partners'),
  ['partners-list', 'hide-placeholders'],
  { tags: ['partners'] },
)

export const getWarrantyPlans = unstable_cache(
  () => fetchPublishedCollection('warranty-plans'),
  ['warranty-plans-list', 'hide-placeholders'],
  { tags: ['warranty-plans'] },
)

export const getSustainabilityReports = unstable_cache(
  () => fetchPublishedCollection('sustainability-reports'),
  ['sustainability-reports-list', 'hide-placeholders'],
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
    return withoutPlaceholderDocs('distributors', result.docs).map((doc) => ({
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
