'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/Logo/Logo'
import { cn } from '@/utilities/ui'
import {
  megaMenus as defaultMegaMenus,
  primaryNav as defaultPrimaryNav,
  type MegaMenuKey,
} from '@/config/navigation'
import { ProductsMegaMenuPanel } from '@/components/oriana/ProductsMegaMenu'
import type { CatalogueNavItem } from '@/types/catalogue'

export type SiteHeaderNav = {
  localeLabel?: string
  loginLabel?: string
  loginHref?: string
  whereToBuy?: { label: string; href: string }
  requestQuote?: { label: string; href: string }
  primaryNav?: MegaMenuKey[]
  megaMenus?: typeof defaultMegaMenus
}

function MegaMenuPanel({
  menuKey,
  menus,
}: {
  menuKey: MegaMenuKey
  menus: typeof defaultMegaMenus
}) {
  const menu = menus[menuKey]

  return (
    <div
      className="absolute left-0 right-0 top-full z-40 overflow-hidden border-t border-white/40 bg-white/80 shadow-[0_20px_50px_-12px_rgba(7,21,37,0.18)] backdrop-blur-xl backdrop-saturate-150"
      role="region"
      aria-label={`${menu.label} menu`}
    >
      <div className="container py-10 lg:py-12">
        <div className="flex gap-8 lg:gap-12">
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

export function SiteHeader({
  catalogueMenu = [],
  nav,
}: {
  catalogueMenu?: CatalogueNavItem[]
  nav?: SiteHeaderNav
}) {
  const pathname = usePathname()
  const router = useRouter()
  const refreshedEmptyMenu = useRef(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<MegaMenuKey | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const isHome = pathname === '/'
  const overHero = isHome && !scrolled && !openMenu && !mobileOpen

  const megaMenus = nav?.megaMenus ?? defaultMegaMenus
  const primaryNav = nav?.primaryNav ?? defaultPrimaryNav
  const whereToBuy = nav?.whereToBuy ?? { label: 'Where to Buy', href: '/where-to-buy' }
  const requestQuote = nav?.requestQuote ?? { label: 'Request Quote', href: '/contact' }

  useEffect(() => {
    setMobileOpen(false)
    setOpenMenu(null)
  }, [pathname])

  useEffect(() => {
    if (catalogueMenu.length > 0 || refreshedEmptyMenu.current) return
    refreshedEmptyMenu.current = true
    router.refresh()
  }, [catalogueMenu.length, router])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkClass = cn(
    'relative px-3 py-5 text-sm font-medium transition-colors',
    overHero
      ? 'text-white/85 hover:text-white'
      : 'text-oriana-navy hover:text-oriana-blue',
  )

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        overHero
          ? 'bg-transparent'
          : 'bg-white/90 shadow-sm backdrop-blur-xl backdrop-saturate-150',
      )}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <div className={cn('relative border-b', overHero ? 'border-white/10' : 'border-oriana-navy/8')}>
        <div className="container">
          <div className="flex h-16 items-center justify-between lg:h-[4.25rem]">
            <Link href="/" className="shrink-0">
              <Logo priority variant={overHero ? 'dark' : 'light'} />
            </Link>

            <nav className="hidden flex-1 items-center justify-center gap-1 xl:flex">
              {primaryNav.map((key) => {
                const open = openMenu === key
                return (
                  <button
                    key={key}
                    type="button"
                    className={cn(linkClass, open && (overHero ? 'text-white' : 'text-oriana-blue'))}
                    onMouseEnter={() => setOpenMenu(key)}
                    onFocus={() => setOpenMenu(key)}
                    aria-expanded={open}
                    aria-haspopup="true"
                  >
                    {megaMenus[key].label}
                    <span
                      className={cn(
                        'absolute inset-x-3 bottom-0 h-0.5 origin-center transition-transform duration-300',
                        overHero ? 'bg-oriana-sky' : 'bg-oriana-blue',
                        open ? 'scale-x-100' : 'scale-x-0',
                      )}
                    />
                  </button>
                )
              })}
            </nav>

            <div className="hidden shrink-0 items-center gap-2 xl:flex">
              <Link href={whereToBuy.href} className={linkClass}>
                {whereToBuy.label}
              </Link>
              <Link
                href={requestQuote.href}
                className={cn(
                  'ml-1 rounded-md px-5 py-2 text-sm font-semibold transition',
                  overHero
                    ? 'bg-oriana-sky text-oriana-navy hover:bg-white'
                    : 'bg-oriana-blue text-white hover:bg-oriana-navy',
                )}
              >
                {requestQuote.label}
              </Link>
            </div>

            <button
              type="button"
              className={cn('p-2 xl:hidden', overHero ? 'text-white' : 'text-oriana-navy')}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {openMenu && (
          <div className="hidden xl:block">
            {openMenu === 'products' ? (
              <ProductsMegaMenuPanel menu={catalogueMenu} />
            ) : (
              <MegaMenuPanel menuKey={openMenu} menus={megaMenus} />
            )}
          </div>
        )}
      </div>

      {mobileOpen && (
        <div className="max-h-[80vh] overflow-y-auto border-t border-oriana-navy/10 bg-white px-4 py-4 xl:hidden">
          {primaryNav.map((key) => {
            if (key === 'products') {
              return (
                <div key={key} className="mb-6">
                  <p className="mb-2 text-xs font-bold uppercase tracking-widest text-oriana-blue">
                    Products
                  </p>
                  {catalogueMenu.map((cat) => (
                    <div key={cat.href} className="mb-3">
                      <Link
                        href={cat.href}
                        className="text-sm font-semibold text-oriana-navy hover:text-oriana-blue"
                      >
                        {cat.title}
                      </Link>
                      {cat.products.slice(0, 4).map((l) => (
                        <Link
                          key={l.href}
                          href={l.href}
                          className="block py-1.5 pl-2 text-sm text-oriana-muted"
                        >
                          {l.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )
            }

            return (
              <div key={key} className="mb-6">
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-oriana-blue">
                  {megaMenus[key].label}
                </p>
                {megaMenus[key].columns.map((col) => (
                  <div key={col.title} className="mb-3">
                    <p className="text-sm font-semibold text-oriana-navy">{col.title}</p>
                    {col.links.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className="block py-1.5 pl-2 text-sm text-oriana-muted"
                      >
                        {l.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )
          })}
          <Link href={whereToBuy.href} className="block py-2 text-sm font-semibold text-oriana-blue">
            {whereToBuy.label}
          </Link>
          <Link
            href={requestQuote.href}
            className="mt-4 block rounded-md bg-oriana-blue py-3 text-center text-sm font-semibold text-white"
          >
            {requestQuote.label}
          </Link>
        </div>
      )}
    </header>
  )
}
