'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Globe, Menu, Search, X } from 'lucide-react'
import { Logo } from '@/components/Logo/Logo'
import { cn } from '@/utilities/ui'
import {
  megaMenus,
  primaryNav,
  type MegaMenuKey,
} from '@/config/navigation'
import { ProductsMegaMenuPanel } from '@/components/oriana/ProductsMegaMenu'

function MegaMenuPanel({ menuKey }: { menuKey: MegaMenuKey }) {
  const menu = megaMenus[menuKey]

  return (
    <div
      className="absolute left-0 right-0 top-full z-40 overflow-hidden border-t border-white/40 bg-white/80 shadow-[0_20px_50px_-12px_rgba(7,21,37,0.18)] backdrop-blur-xl backdrop-saturate-150"
      role="region"
      aria-label={`${menu.label} menu`}
    >
      <div className="container py-10 lg:py-12">
        <div className="flex gap-8 lg:gap-12">
          {/* Sungrow-style ghost watermark */}
          <div className="hidden w-48 shrink-0 items-center lg:flex xl:w-56">
            <p
              className="font-display text-4xl font-light leading-tight text-oriana-navy/[0.07] xl:text-5xl"
              aria-hidden
            >
              {menu.label}
            </p>
          </div>

          <div
            className={cn(
              'grid flex-1 gap-10',
              menu.columns.length >= 5
                ? 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
                : 'sm:grid-cols-2 lg:grid-cols-3',
            )}
          >
            {menu.columns.map((col) => (
              <div key={col.title}>
                {col.href ? (
                  <Link
                    href={col.href}
                    className="text-base font-semibold text-oriana-navy transition hover:text-oriana-blue"
                  >
                    {col.title}
                  </Link>
                ) : (
                  <p className="text-base font-semibold text-oriana-navy">{col.title}</p>
                )}
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
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
        </div>
      </div>
    </div>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<MegaMenuKey | null>(null)

  useEffect(() => {
    setMobileOpen(false)
    setOpenMenu(null)
  }, [pathname])

  const linkClass =
    'relative px-3 py-5 text-sm font-medium text-oriana-navy transition-colors hover:text-oriana-blue'

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm"
      onMouseLeave={() => setOpenMenu(null)}
    >
      {/* Utility bar */}
      <div className="hidden border-b border-oriana-navy/6 bg-oriana-surface text-xs text-oriana-muted lg:block">
        <div className="container flex h-9 items-center justify-between">
          <span>Customer Hotline: +1 (800) ORIANA-1</span>
          <div className="flex items-center gap-5">
            <button type="button" className="flex items-center gap-1.5 hover:text-oriana-blue">
              <Globe className="h-3.5 w-3.5" />
              USA · English
            </button>
            <Link href="/search" className="hover:text-oriana-blue" aria-label="Search">
              <Search className="h-3.5 w-3.5" />
            </Link>
            <Link href="/admin" className="font-semibold uppercase tracking-wide hover:text-oriana-blue">
              Login
            </Link>
          </div>
        </div>
      </div>

      <div className="relative border-b border-oriana-navy/8">
        <div className="container">
          <div className="flex h-16 items-center justify-between lg:h-[4.25rem]">
            <Link href="/" className="shrink-0">
              <Logo priority variant="light" />
            </Link>

            {/* Sungrow-style centred nav triggers */}
            <nav className="hidden flex-1 items-center justify-center gap-1 xl:flex">
              {primaryNav.map((key) => {
                const open = openMenu === key
                return (
                  <button
                    key={key}
                    type="button"
                    className={cn(linkClass, open && 'text-oriana-blue')}
                    onMouseEnter={() => setOpenMenu(key)}
                    onFocus={() => setOpenMenu(key)}
                    aria-expanded={open}
                    aria-haspopup="true"
                  >
                    {megaMenus[key].label}
                    <span
                      className={cn(
                        'absolute inset-x-3 bottom-0 h-0.5 origin-center bg-oriana-blue transition-transform duration-300',
                        open ? 'scale-x-100' : 'scale-x-0',
                      )}
                    />
                  </button>
                )
              })}
            </nav>

            <div className="hidden shrink-0 items-center gap-2 xl:flex">
              <Link href="/where-to-buy" className={linkClass}>
                Where to Buy
              </Link>
              <Link
                href="/contact"
                className="ml-1 rounded-full bg-oriana-blue px-5 py-2 text-sm font-semibold text-white transition hover:bg-oriana-navy"
              >
                Request Quote
              </Link>
            </div>

            <button
              type="button"
              className="p-2 text-oriana-navy xl:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Full-width drop panel — Sungrow hover pattern */}
        {openMenu && (
          <div className="hidden xl:block">
            {openMenu === 'products' ? (
              <ProductsMegaMenuPanel />
            ) : (
              <MegaMenuPanel menuKey={openMenu} />
            )}
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="max-h-[80vh] overflow-y-auto border-t border-oriana-navy/10 bg-white px-4 py-4 xl:hidden">
          {primaryNav.map((key) => (
            <div key={key} className="mb-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-oriana-blue">
                {megaMenus[key].label}
              </p>
              {megaMenus[key].columns.map((col) => (
                <div key={col.title} className="mb-3">
                  <p className="text-sm font-semibold text-oriana-navy">{col.title}</p>
                  {col.links.map((l) => (
                    <Link key={l.href} href={l.href} className="block py-1.5 pl-2 text-sm text-oriana-muted">
                      {l.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          ))}
          <Link href="/where-to-buy" className="block py-2 text-sm font-semibold text-oriana-blue">
            Where to Buy
          </Link>
          <Link
            href="/contact"
            className="mt-4 block rounded-full bg-oriana-blue py-3 text-center text-sm font-semibold text-white"
          >
            Request a Quote
          </Link>
        </div>
      )}
    </header>
  )
}
