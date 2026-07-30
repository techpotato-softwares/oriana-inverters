import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

import { caseStudies, type CaseStudy } from '@/data/caseStudies'
import { staticDistributors, type Distributor } from '@/data/distributors'
import {
  staticAbout,
  staticCareers,
  staticCertifications,
  staticContact,
  staticContentPages,
  staticFaqGroups,
  staticHome,
  staticJobs,
  staticPageIntros,
  staticPartners,
  staticSolutions,
  staticSupport,
  staticSustainability,
  staticSustainabilityReports,
  staticVideos,
  staticWarranty,
  staticWhereToBuy,
} from '@/data/siteContent'
import { megaMenus, primaryNav, type MegaMenuKey } from '@/config/navigation'
import { footerNav, socialLinks } from '@/config/footer'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { FooterChrome, HeaderChrome } from '@/types/chrome'

async function getPayloadSafe() {
  try {
    return await getPayload({ config: configPromise })
  } catch (error) {
    console.error('[getSiteContent] Payload init failed:', error)
    return null
  }
}

function mediaUrl(media: unknown, fallback?: string | null): string | undefined {
  if (media && typeof media === 'object' && 'url' in media && typeof (media as { url?: string }).url === 'string') {
    return getMediaUrl((media as { url: string }).url) || fallback || undefined
  }
  return fallback || undefined
}

async function fetchGlobal<T>(slug: string, fallback: T): Promise<T> {
  const payload = await getPayloadSafe()
  if (!payload) return fallback
  try {
    const doc = await payload.findGlobal({ slug: slug as never, depth: 2 })
    if (!doc) return fallback
    return { ...fallback, ...(doc as object) } as T
  } catch (error) {
    console.error(`[getSiteContent] global ${slug} failed:`, error)
    return fallback
  }
}

export const getHomeContent = unstable_cache(
  () => fetchGlobal('home', staticHome),
  ['global-home'],
  { tags: ['global_home', 'home'] },
)

export const getAboutContent = unstable_cache(
  () => fetchGlobal('about', staticAbout),
  ['global-about'],
  { tags: ['global_about'] },
)

export const getContactContent = unstable_cache(
  () => fetchGlobal('contact', staticContact),
  ['global-contact'],
  { tags: ['global_contact'] },
)

export const getCareersContent = unstable_cache(
  () => fetchGlobal('careers', staticCareers),
  ['global-careers'],
  { tags: ['global_careers'] },
)

export const getSupportContent = unstable_cache(
  () => fetchGlobal('support', staticSupport),
  ['global-support'],
  { tags: ['global_support'] },
)

export const getWarrantyContent = unstable_cache(
  () => fetchGlobal('warranty', staticWarranty),
  ['global-warranty'],
  { tags: ['global_warranty'] },
)

export const getSustainabilityContent = unstable_cache(
  () => fetchGlobal('sustainability', staticSustainability),
  ['global-sustainability'],
  { tags: ['global_sustainability'] },
)

export const getSustainabilityReportsContent = unstable_cache(
  () => fetchGlobal('sustainability-reports', staticSustainabilityReports),
  ['global-sustainability-reports'],
  { tags: ['global_sustainability-reports'] },
)

export const getWhereToBuyContent = unstable_cache(
  () => fetchGlobal('where-to-buy', staticWhereToBuy),
  ['global-where-to-buy'],
  { tags: ['global_where-to-buy'] },
)

export const getPageIntros = unstable_cache(
  () => fetchGlobal('page-intros', staticPageIntros),
  ['global-page-intros'],
  { tags: ['global_page-intros'] },
)

const staticHeaderChrome: HeaderChrome = {
  hotlineLabel: 'Customer Hotline:',
  hotline: '+1 (800) ORIANA-1',
  languageLabel: 'USA · English',
  loginLabel: 'Login',
  loginHref: '/admin',
  whereToBuyLabel: 'Where to Buy',
  whereToBuyHref: '/where-to-buy',
  quoteLabel: 'Request Quote',
  quoteHref: '/contact',
  navKeys: primaryNav,
  menus: megaMenus,
}

async function fetchHeaderChrome(): Promise<HeaderChrome> {
  const payload = await getPayloadSafe()
  if (!payload) return staticHeaderChrome
  try {
    const doc = await payload.findGlobal({ slug: 'header', depth: 1 })
    if (!doc?.navMenus?.length) {
      return {
        ...staticHeaderChrome,
        hotlineLabel: doc?.hotlineLabel || staticHeaderChrome.hotlineLabel,
        hotline: doc?.hotline || staticHeaderChrome.hotline,
        languageLabel: doc?.languageLabel || staticHeaderChrome.languageLabel,
        loginLabel: doc?.loginLabel || staticHeaderChrome.loginLabel,
        loginHref: doc?.loginHref || staticHeaderChrome.loginHref,
        whereToBuyLabel: doc?.whereToBuyLabel || staticHeaderChrome.whereToBuyLabel,
        whereToBuyHref: doc?.whereToBuyHref || staticHeaderChrome.whereToBuyHref,
        quoteLabel: doc?.quoteLabel || staticHeaderChrome.quoteLabel,
        quoteHref: doc?.quoteHref || staticHeaderChrome.quoteHref,
      }
    }

    const menus = { ...megaMenus } as typeof megaMenus
    const navKeys: MegaMenuKey[] = []
    for (const menu of doc.navMenus) {
      const key = menu.key as MegaMenuKey
      if (!key || !(key in megaMenus)) continue
      navKeys.push(key)
      menus[key] = {
        label: menu.label || megaMenus[key].label,
        columns: (menu.columns || []).map((col) => ({
          title: col.title || '',
          href: col.href || undefined,
          links: (col.links || []).map((l) => ({ label: l.label || '', href: l.href || '#' })),
        })),
      }
    }

    return {
      hotlineLabel: doc.hotlineLabel || staticHeaderChrome.hotlineLabel,
      hotline: doc.hotline || staticHeaderChrome.hotline,
      languageLabel: doc.languageLabel || staticHeaderChrome.languageLabel,
      loginLabel: doc.loginLabel || staticHeaderChrome.loginLabel,
      loginHref: doc.loginHref || staticHeaderChrome.loginHref,
      whereToBuyLabel: doc.whereToBuyLabel || staticHeaderChrome.whereToBuyLabel,
      whereToBuyHref: doc.whereToBuyHref || staticHeaderChrome.whereToBuyHref,
      quoteLabel: doc.quoteLabel || staticHeaderChrome.quoteLabel,
      quoteHref: doc.quoteHref || staticHeaderChrome.quoteHref,
      navKeys: navKeys.length ? navKeys : primaryNav,
      menus,
    }
  } catch (error) {
    console.error('[getSiteContent] header failed:', error)
    return staticHeaderChrome
  }
}

export const getHeaderChrome = unstable_cache(fetchHeaderChrome, ['global-header'], {
  tags: ['global_header'],
})

const staticFooterChrome: FooterChrome = {
  columns: footerNav.map((c) => ({
    title: c.title,
    links: c.links.map((l) => ({ label: l.label, href: l.href })),
  })),
  socialLinks: socialLinks.map((s) => ({ label: s.label, href: s.href })),
  legalLinks: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Disclaimer', href: '/disclaimer' },
    { label: 'Terms of Use', href: '/terms' },
  ],
  copyright: '© {year} Oriana Inverters. All rights reserved.',
}

async function fetchFooterChrome(): Promise<FooterChrome> {
  const payload = await getPayloadSafe()
  if (!payload) return staticFooterChrome
  try {
    const doc = await payload.findGlobal({ slug: 'footer', depth: 1 })
    if (!doc?.columns?.length) {
      return {
        ...staticFooterChrome,
        copyright: doc?.copyright || staticFooterChrome.copyright,
        socialLinks: doc?.socialLinks?.length
          ? doc.socialLinks.map((s) => ({ label: s.label || '', href: s.href || '#' }))
          : staticFooterChrome.socialLinks,
        legalLinks: doc?.legalLinks?.length
          ? doc.legalLinks.map((l) => ({ label: l.label || '', href: l.href || '#' }))
          : staticFooterChrome.legalLinks,
      }
    }
    return {
      columns: doc.columns.map((c) => ({
        title: c.title || '',
        links: (c.links || []).map((l) => ({ label: l.label || '', href: l.href || '#' })),
      })),
      socialLinks: (doc.socialLinks || []).map((s) => ({ label: s.label || '', href: s.href || '#' })),
      legalLinks: (doc.legalLinks || staticFooterChrome.legalLinks).map((l) => ({
        label: l.label || '',
        href: l.href || '#',
      })),
      copyright: doc.copyright || staticFooterChrome.copyright,
    }
  } catch (error) {
    console.error('[getSiteContent] footer failed:', error)
    return staticFooterChrome
  }
}

export const getFooterChrome = unstable_cache(fetchFooterChrome, ['global-footer'], {
  tags: ['global_footer'],
})

async function fetchCaseStudies(): Promise<CaseStudy[]> {
  const payload = await getPayloadSafe()
  if (!payload) return caseStudies
  try {
    const result = await payload.find({
      collection: 'case-studies',
      depth: 1,
      limit: 50,
      pagination: false,
      sort: '-year',
    })
    if (!result.docs.length) return caseStudies
    return result.docs.map((doc) => ({
      slug: doc.slug,
      title: doc.title,
      segment: doc.segment,
      capacity: doc.capacity || '',
      products: doc.products || '',
      productSlugs: (doc.productSlugs || []).map((p) => p.slug).filter(Boolean) as string[],
      location: doc.location || '',
      image: mediaUrl(doc.image, doc.imageUrl) || '/assets/products/three-phase.svg',
      summary: doc.summary,
      challenge: doc.challenge || '',
      solution: doc.solution || '',
      results: (doc.results || []).map((r) => r.text).filter(Boolean) as string[],
      stats: (doc.stats || []).map((s) => ({ label: s.label || '', value: s.value || '' })),
      year: doc.year || '',
    }))
  } catch (error) {
    console.error('[getSiteContent] case-studies failed:', error)
    return caseStudies
  }
}

export const getCaseStudiesContent = unstable_cache(fetchCaseStudies, ['case-studies'], {
  tags: ['case-studies'],
})

export async function getCaseStudyBySlugContent(slug: string): Promise<CaseStudy | null> {
  const all = await getCaseStudiesContent()
  return all.find((c) => c.slug === slug) ?? null
}

async function fetchFaqs() {
  const payload = await getPayloadSafe()
  if (!payload) return staticFaqGroups
  try {
    const result = await payload.find({
      collection: 'faqs',
      depth: 0,
      limit: 50,
      pagination: false,
      sort: 'sortOrder',
    })
    if (!result.docs.length) return staticFaqGroups
    return result.docs.map((d) => ({
      title: d.title,
      sortOrder: d.sortOrder ?? 0,
      items: (d.items || []).map((i) => ({
        question: i.question || '',
        answer: i.answer || '',
      })),
    }))
  } catch {
    return staticFaqGroups
  }
}

export const getFaqsContent = unstable_cache(fetchFaqs, ['faqs'], { tags: ['faqs'] })

type VideoItem = {
  title: string
  category: string
  duration: string
  sortOrder: number
  videoUrl?: string
}

async function fetchVideos(): Promise<VideoItem[]> {
  const payload = await getPayloadSafe()
  if (!payload) return staticVideos
  try {
    const result = await payload.find({
      collection: 'videos',
      depth: 0,
      limit: 50,
      pagination: false,
      sort: 'sortOrder',
    })
    if (!result.docs.length) return staticVideos
    return result.docs.map((d) => ({
      title: d.title,
      category: d.category,
      duration: d.duration || '',
      sortOrder: d.sortOrder ?? 0,
      videoUrl: d.videoUrl || undefined,
    }))
  } catch {
    return staticVideos
  }
}

export const getVideosContent = unstable_cache(fetchVideos, ['videos'], { tags: ['videos'] })

type JobItem = {
  title: string
  location: string
  department: string
  type: string
  sortOrder: number
  applyUrl: string
}

async function fetchJobs(): Promise<JobItem[]> {
  const payload = await getPayloadSafe()
  if (!payload) return staticJobs.map((j) => ({ ...j, applyUrl: '/contact' }))
  try {
    const result = await payload.find({
      collection: 'jobs',
      depth: 0,
      limit: 50,
      pagination: false,
      sort: 'sortOrder',
      where: { active: { equals: true } },
    })
    if (!result.docs.length) return staticJobs.map((j) => ({ ...j, applyUrl: '/contact' }))
    return result.docs.map((d) => ({
      title: d.title,
      location: d.location,
      department: d.department,
      type: d.type,
      sortOrder: d.sortOrder ?? 0,
      applyUrl: d.applyUrl || '/contact',
    }))
  } catch {
    return staticJobs.map((j) => ({ ...j, applyUrl: '/contact' }))
  }
}

export const getJobsContent = unstable_cache(fetchJobs, ['jobs'], { tags: ['jobs'] })

async function fetchPartners() {
  const payload = await getPayloadSafe()
  if (!payload) return staticPartners
  try {
    const result = await payload.find({
      collection: 'partners',
      depth: 0,
      limit: 100,
      pagination: false,
      sort: 'sortOrder',
    })
    if (!result.docs.length) return staticPartners
    return result.docs.map((d) => ({
      name: d.name,
      category: d.category as (typeof staticPartners)[number]['category'],
      sortOrder: d.sortOrder ?? 0,
    }))
  } catch {
    return staticPartners
  }
}

export const getPartnersContent = unstable_cache(fetchPartners, ['partners'], { tags: ['partners'] })

async function fetchCertifications() {
  const payload = await getPayloadSafe()
  if (!payload) return staticCertifications
  try {
    const result = await payload.find({
      collection: 'certifications',
      depth: 0,
      limit: 100,
      pagination: false,
      sort: 'sortOrder',
    })
    if (!result.docs.length) return staticCertifications
    return result.docs.map((d) => ({
      kind: d.kind as 'certification' | 'award',
      name: d.name,
      scope: d.scope || undefined,
      region: d.region || undefined,
      year: d.year || undefined,
      organization: d.organization || undefined,
      sortOrder: d.sortOrder ?? 0,
    }))
  } catch {
    return staticCertifications
  }
}

export const getCertificationsContent = unstable_cache(fetchCertifications, ['certifications'], {
  tags: ['certifications'],
})

async function fetchSolutions() {
  const payload = await getPayloadSafe()
  if (!payload) return staticSolutions
  try {
    const result = await payload.find({
      collection: 'solutions',
      depth: 1,
      limit: 10,
      pagination: false,
    })
    if (!result.docs.length) return staticSolutions
    return result.docs.map((d) => ({
      slug: d.slug as (typeof staticSolutions)[number]['slug'],
      title: d.title,
      description: d.description,
      benefits: (d.benefits || []).map((b) => ({ text: b.text || '' })),
      products: (d.products || []).map((p) => ({ name: p.name || '' })),
      imageUrl: mediaUrl(d.image, d.imageUrl) || '/assets/products/single-phase.svg',
    }))
  } catch {
    return staticSolutions
  }
}

export const getSolutionsContent = unstable_cache(fetchSolutions, ['solutions'], {
  tags: ['solutions'],
})

export async function getSolutionBySlug(slug: string) {
  const all = await getSolutionsContent()
  return all.find((s) => s.slug === slug) ?? null
}

async function fetchContentPages() {
  const payload = await getPayloadSafe()
  if (!payload) return staticContentPages
  try {
    const result = await payload.find({
      collection: 'content-pages',
      depth: 0,
      limit: 20,
      pagination: false,
    })
    if (!result.docs.length) return staticContentPages
    return result.docs.map((d) => ({
      slug: d.slug,
      title: d.title,
      eyebrow: d.eyebrow || '',
      description: d.description || '',
      breadcrumb: (d.breadcrumb || []).map((b) => ({ label: b.label || '', href: b.href || undefined })),
      sections: (d.sections || []).map((s) => ({
        heading: s.heading || undefined,
        paragraphs: (s.paragraphs || []).map((p) => ({ text: p.text || '' })),
      })),
      seo: d.seo
        ? { metaTitle: d.seo.metaTitle || undefined, metaDescription: d.seo.metaDescription || undefined }
        : undefined,
    }))
  } catch {
    return staticContentPages
  }
}

export const getContentPages = unstable_cache(fetchContentPages, ['content-pages'], {
  tags: ['content-pages'],
})

export async function getContentPageBySlug(slug: string) {
  const all = await getContentPages()
  return all.find((p) => p.slug === slug) ?? null
}

export async function getDistributorsFromCms(): Promise<Distributor[]> {
  const payload = await getPayloadSafe()
  if (!payload) return staticDistributors
  try {
    const result = await payload.find({
      collection: 'distributors',
      depth: 0,
      limit: 200,
      pagination: false,
      sort: 'name',
    })
    if (!result.docs.length) return staticDistributors
    return result.docs.map((d) => ({
      id: d.externalId || String(d.id),
      name: d.name,
      type: d.type as Distributor['type'],
      city: d.city,
      state: d.state || undefined,
      country: d.country,
      region: d.region,
      email: d.email || undefined,
      phone: d.phone || undefined,
    }))
  } catch {
    return staticDistributors
  }
}
