import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'
import { Logo } from '@/components/Logo/Logo'
import { ScrollToTop } from '@/components/oriana/ScrollToTop'
import { footerNav, socialLinks as defaultSocial } from '@/config/footer'
import type { FooterChrome } from '@/types/chrome'

const socialIcons = {
  LinkedIn: Linkedin,
  Facebook: Facebook,
  YouTube: Youtube,
  Instagram: Instagram,
} as const

type SiteFooterProps = {
  chrome?: FooterChrome
}

export function SiteFooter({ chrome }: SiteFooterProps) {
  const columns =
    chrome?.columns ??
    footerNav.map((c) => ({
      title: c.title,
      links: c.links.map((l) => ({ label: l.label, href: l.href })),
    }))
  const socialLinks = chrome?.socialLinks ?? defaultSocial.map((s) => ({ label: s.label, href: s.href }))
  const legalLinks = chrome?.legalLinks ?? [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Disclaimer', href: '/disclaimer' },
    { label: 'Terms of Use', href: '/terms' },
  ]
  const copyright = (chrome?.copyright ?? '© {year} Oriana Inverters. All rights reserved.').replace(
    '{year}',
    String(new Date().getFullYear()),
  )

  return (
    <>
      <footer className="mt-auto border-t border-oriana-navy/8 bg-oriana-surface">
        <div className="container py-14 lg:py-16">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold text-oriana-navy">{col.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={`${link.href}-${link.label}`}>
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
              {socialLinks.map((s) => {
                const Icon = socialIcons[s.label as keyof typeof socialIcons]
                if (!Icon) return null
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-oriana-navy/10 bg-white text-oriana-muted transition hover:border-oriana-blue hover:text-oriana-blue"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-6 text-xs text-oriana-muted">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-oriana-blue">
                {link.label}
              </Link>
            ))}
            <Link href="/sitemap.xml" className="hover:text-oriana-blue">
              Sitemap
            </Link>
          </div>
        </div>
      </footer>
      <ScrollToTop />
    </>
  )
}
