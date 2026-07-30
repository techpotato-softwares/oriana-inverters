import type { MegaMenuKey } from '@/config/navigation'
import type { megaMenus } from '@/config/navigation'

export type HeaderChrome = {
  hotlineLabel: string
  hotline: string
  languageLabel: string
  loginLabel: string
  loginHref: string
  whereToBuyLabel: string
  whereToBuyHref: string
  quoteLabel: string
  quoteHref: string
  navKeys: MegaMenuKey[]
  menus: typeof megaMenus
}

export type FooterChrome = {
  columns: { title: string; links: { label: string; href: string }[] }[]
  socialLinks: { label: string; href: string }[]
  legalLinks: { label: string; href: string }[]
  copyright: string
}
