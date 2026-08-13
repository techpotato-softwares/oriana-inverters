import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'
import { Logo } from '@/components/Logo/Logo'
import { ScrollToTop } from '@/components/oriana/ScrollToTop'
import type { SiteSettingsView } from '@/types/siteSettings'

const socialIcons = {
  linkedin: Linkedin,
  facebook: Facebook,
  youtube: Youtube,
  instagram: Instagram,
} as const

const socialLabels = {
  linkedin: 'LinkedIn',
  facebook: 'Facebook',
  youtube: 'YouTube',
  instagram: 'Instagram',
} as const

export function SiteFooter({ settings }: { settings: SiteSettingsView }) {
  const year = new Date().getFullYear()
  const copyright =
    settings.copyrightText || `© ${year} ${settings.siteName}. All rights reserved.`

  return (
    <>
      <footer className="mt-auto border-t border-oriana-navy/8 bg-oriana-surface">
        <div className="container py-14 lg:py-16">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
            {settings.footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold text-oriana-navy">{col.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={`${col.title}-${link.href}`}>
                      <Link
                        href={link.href}
                        className="text-sm text-oriana-muted transition hover:text-oriana-blue"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-start justify-between gap-8 border-t border-oriana-navy/8 pt-10 md:flex-row md:items-center">
            <div>
              <Logo variant="light" />
              <p className="mt-4 text-xs text-oriana-muted">{copyright}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {settings.socialLinks.map((s) => {
                const Icon = socialIcons[s.platform]
                return (
                  <a
                    key={s.platform}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={socialLabels[s.platform]}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-oriana-navy/10 bg-white text-oriana-muted transition hover:border-oriana-blue hover:text-oriana-blue"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-6 text-xs text-oriana-muted">
            {settings.legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-oriana-blue">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
      <ScrollToTop />
    </>
  )
}
