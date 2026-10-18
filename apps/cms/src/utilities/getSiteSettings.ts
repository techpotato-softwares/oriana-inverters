import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

import { footerNav, socialLinks as defaultSocial } from '@/config/footer'
import { getHiddenCategorySlugs } from '@/utilities/getCatalogue'
import { DEFAULT_KEYWORDS, parseKeywords } from '@/utilities/seoKeywords'
import { isHidden, resolveCmsList } from '@/utilities/visibility'
import type {
  SiteFooterColumn,
  SiteNavLink,
  SiteSettingsView,
  SiteSocialLink,
} from '@/types/siteSettings'

export { parseKeywords } from '@/utilities/seoKeywords'

const defaultLegalLinks: SiteNavLink[] = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Disclaimer', href: '/disclaimer' },
  { label: 'Terms of Use', href: '/terms' },
  { label: 'Sitemap', href: '/sitemap.xml' },
]

const defaultSettings: SiteSettingsView = {
  siteName: 'Oriana Inverters',
  hotline: '+91 91452 28222',
  copyrightText: '',
  seoTitle: 'Oriana Inverters | Advanced Solar Inverter Solutions',
  seoTitleTemplate: '%s | Oriana Inverters',
  seoDescription:
    'High-efficiency string, hybrid, and utility-scale solar inverters for residential, commercial, and utility applications. Made in India by Oriana Inverters.',
  seoKeywords: DEFAULT_KEYWORDS,
  twitterHandle: '@OrianaInverters',
  ogImageUrl: null,
  googleAnalyticsId: null,
  googleTagManagerId: null,
  footerColumns: footerNav.map((col) => ({
    title: col.title,
    links: col.links.map((link) => ({ label: link.label, href: link.href })),
  })),
  legalLinks: defaultLegalLinks,
  socialLinks: defaultSocial.map((item) => ({
    platform: item.label.toLowerCase() as SiteSocialLink['platform'],
    href: item.href,
  })),
}

function text(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

function optionalId(value: unknown): string | null {
  if (typeof value === 'string' && value.trim()) return value.trim()
  return null
}

function mapLinks(value: unknown): SiteNavLink[] {
  if (!Array.isArray(value)) return []
  return value.flatMap((item) => {
    if (!item || typeof item !== 'object' || isHidden(item)) return []
    const row = item as { label?: unknown; href?: unknown }
    if (typeof row.label !== 'string' || typeof row.href !== 'string') return []
    if (!row.label.trim() || !row.href.trim()) return []
    return [{ label: row.label.trim(), href: row.href.trim() }]
  })
}

async function fetchSiteSettings(): Promise<SiteSettingsView> {
  try {
    const payload = await getPayload({ config: configPromise })
    const doc = await payload.findGlobal({
      slug: 'site-settings',
      depth: 0,
    })

    const footerColumns = Array.isArray(doc.footerColumns)
      ? doc.footerColumns.flatMap((col) => {
          if (isHidden(col)) return []
          const title = typeof col?.title === 'string' ? col.title.trim() : ''
          const links = mapLinks(col?.links)
          if (!title || !links.length) return []
          return [{ title, links } satisfies SiteFooterColumn]
        })
      : []

    const legalLinks = mapLinks(doc.legalLinks)
    const socialLinks = Array.isArray(doc.socialLinks)
      ? doc.socialLinks.flatMap((item) => {
          if (isHidden(item)) return []
          const platform = item?.platform
          const href = typeof item?.href === 'string' ? item.href.trim() : ''
          if (
            (platform === 'linkedin' ||
              platform === 'facebook' ||
              platform === 'youtube' ||
              platform === 'instagram' ||
              platform === 'x') &&
            href
          ) {
            return [{ platform, href } satisfies SiteSocialLink]
          }
          return []
        })
      : []

    let ogImageUrl: string | null = null
    const ogId =
      typeof doc.ogImage === 'number'
        ? doc.ogImage
        : doc.ogImage && typeof doc.ogImage === 'object'
          ? doc.ogImage.id
          : null
    if (typeof ogId === 'number') {
      try {
        const media = await payload.findByID({
          collection: 'media',
          id: ogId,
          depth: 0,
        })
        ogImageUrl = media.url ?? null
      } catch {
        ogImageUrl = null
      }
    }

    const removedFooterLabels = new Set([
      'Residential Solutions',
      'C&I PV Solutions',
      'Utility PV Solutions',
      'Energy Storage',
      'Oriana for Installers',
      'Oriana for Distributors',
    ])
    const removedFooterHrefs = new Set([
      '/solutions/residential',
      '/solutions/commercial',
      '/solutions/utility',
      '/solutions/storage',
      '/partners/installers',
    ])

    const resolvedFooter = resolveCmsList(
      doc.footerColumns,
      footerColumns,
      defaultSettings.footerColumns,
    )
    const partnersFromConfig = defaultSettings.footerColumns.find((col) => col.title === 'Partners')
    const productsFromConfig = defaultSettings.footerColumns.find(
      (col) => col.title === 'Products & Solutions',
    )
    const footerWithConfigColumns = resolvedFooter.flatMap((col) => {
      if (col.title === 'Partners' && partnersFromConfig) return [partnersFromConfig]
      if (col.title === 'Products & Solutions' && productsFromConfig) return [productsFromConfig]
      const links = col.links.filter(
        (link) => !removedFooterLabels.has(link.label) && !removedFooterHrefs.has(link.href),
      )
      if (!links.length) return []
      return [{ ...col, links }]
    })

    return {
      siteName: text(doc.siteName, defaultSettings.siteName),
      hotline: text(doc.hotline, defaultSettings.hotline),
      copyrightText: typeof doc.copyrightText === 'string' ? doc.copyrightText.trim() : '',
      seoTitle: text(doc.seoTitle, defaultSettings.seoTitle),
      seoTitleTemplate: text(doc.seoTitleTemplate, defaultSettings.seoTitleTemplate),
      seoDescription: text(doc.seoDescription, defaultSettings.seoDescription),
      seoKeywords: parseKeywords(
        (doc as { seoKeywords?: unknown }).seoKeywords,
        defaultSettings.seoKeywords,
      ),
      twitterHandle: text(doc.twitterHandle, defaultSettings.twitterHandle),
      ogImageUrl,
      googleAnalyticsId: optionalId(doc.googleAnalyticsId),
      googleTagManagerId: optionalId(doc.googleTagManagerId),
      footerColumns: footerWithConfigColumns,
      legalLinks: resolveCmsList(doc.legalLinks, legalLinks, defaultSettings.legalLinks),
      socialLinks: resolveCmsList(doc.socialLinks, socialLinks, defaultSettings.socialLinks),
    }
  } catch (error) {
    console.error('[getSiteSettings] failed:', error)
    return defaultSettings
  }
}

const getCachedSiteSettings = unstable_cache(fetchSiteSettings, ['site-settings', 'seo-keywords-2026-10'], {
  tags: ['global_site-settings'],
})

const CATEGORY_HREF = /^\/products\/category\/([^/?#]+)/

function withoutHiddenCategoryLinks(
  columns: SiteFooterColumn[],
  hidden: ReadonlySet<string>,
): SiteFooterColumn[] {
  if (!hidden.size) return columns
  return columns.flatMap((col) => {
    const links = col.links.filter((link) => {
      const slug = CATEGORY_HREF.exec(link.href)?.[1]
      return !slug || !hidden.has(slug)
    })
    return links.length ? [{ ...col, links }] : []
  })
}

/** Site settings with footer links to hidden categories removed. */
export async function getSiteSettings(): Promise<SiteSettingsView> {
  const [settings, hidden] = await Promise.all([getCachedSiteSettings(), getHiddenCategorySlugs()])
  return { ...settings, footerColumns: withoutHiddenCategoryLinks(settings.footerColumns, hidden) }
}
