export type SiteNavLink = {
  label: string
  href: string
}

export type SiteFooterColumn = {
  title: string
  links: SiteNavLink[]
}

export type SiteSocialLink = {
  platform: 'linkedin' | 'facebook' | 'youtube' | 'instagram'
  href: string
}

export type SiteSettingsView = {
  siteName: string
  hotline: string
  copyrightText: string
  seoTitle: string
  seoTitleTemplate: string
  seoDescription: string
  twitterHandle: string
  ogImageUrl: string | null
  googleAnalyticsId: string | null
  googleTagManagerId: string | null
  footerColumns: SiteFooterColumn[]
  legalLinks: SiteNavLink[]
  socialLinks: SiteSocialLink[]
}
