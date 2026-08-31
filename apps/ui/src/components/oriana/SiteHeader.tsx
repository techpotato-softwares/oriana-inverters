'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, Search, User, X } from 'lucide-react'
import { Logo } from '@/components/Logo/Logo'
import { cn } from '@/utilities/ui'
import {
  aboutMegaMenuCategories,
  mainNav as defaultMainNav,
  megaItemHasSubitems,
  productsMegaMenuCategories,
  supportMegaMenuCategories,
  type MainNavEntry,
} from '@/config/navigation'
import { NavMegaPanel } from '@/components/oriana/NavMegaPanel'
import type { CatalogueNavItem } from '@/types/catalogue'

export type SiteHeaderNav = {
  localeLabel?: string
  searchLabel?: string
  loginLabel?: string
  loginHref?: string
  whereToBuy?: { label: string; href: string }
  requestQuote?: { label: string; href: string }
  mainNav?: MainNavEntry[]
}

type MegaMenuKey = 'products' | 'support' | 'about'

const megaHrefs: Record<MegaMenuKey, string> = {
  products: '/products',
  support: '/support',
  about: '/about',
}

const megaMenuFallbacks: Record<MegaMenuKey, MainNavEntry> = {
  products: { type: 'products', label: 'Products', categories: productsMegaMenuCategories },
  support: {
    type: 'support',
    label: 'Service & Support',
    categories: supportMegaMenuCategories,
  },
  about: { type: 'about', label: 'About Us', categories: aboutMegaMenuCategories },
}

function isMegaMenuItem(
  item: MainNavEntry,
): item is Extract<MainNavEntry, { type: MegaMenuKey }> {
  return item.type === 'products' || item.type === 'support' || item.type === 'about'
}

function itemHasSubmenu(
  item: MainNavEntry,
): item is Extract<MainNavEntry, { type: MegaMenuKey }> {
  return isMegaMenuItem(item) && megaItemHasSubitems(item.categories)
}

function navHref(item: MainNavEntry): string {
  return item.type === 'link' ? item.href : megaHrefs[item.type]
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

  const mainNavItems = nav?.mainNav ?? defaultMainNav
  const whereToBuy = nav?.whereToBuy ?? { label: 'Where to Buy', href: '/where-to-buy' }
  const requestQuote = nav?.requestQuote ?? { label: 'Request Quote', href: '/contact' }
  const localeLabel = nav?.localeLabel ?? 'USA · English'
  const searchLabel = nav?.searchLabel ?? 'Search'
  const loginLabel = nav?.loginLabel ?? 'Login'
  const loginHref = nav?.loginHref ?? '/admin'

  const openMegaItem =
    openMenu != null
      ? (mainNavItems.find((item) => item.type === openMenu) ?? megaMenuFallbacks[openMenu])
      : null
  const showMegaPanel = openMegaItem != null && itemHasSubmenu(openMegaItem)

  useEffect(() => {
    setMobileOpen(false)
    setOpenMenu(null)
  }, [pathname])

  useEffect(() => {
    if (catalogueMenu.length > 0 || refreshedEmptyMenu.current) return
    refreshedEmptyMenu.current = true
    router.refresh()
  }, [catalogueMenu.length, router])

  const linkClass =
    'relative px-3 py-3.5 text-sm font-medium text-oriana-navy transition-colors hover:text-oriana-blue'
  const utilityClass =
    'inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-oriana-navy/70 transition-colors hover:text-oriana-blue'

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/90 shadow-sm backdrop-blur-xl backdrop-saturate-150 transition-all duration-300">
      <div className="relative" onMouseLeave={() => setOpenMenu(null)}>
        <div className="container">
          <div className="grid h-[4.25rem] grid-cols-[1fr_auto_1fr] items-center lg:h-[4.75rem]">
            <div className="flex items-center justify-start gap-2">
              <button
                type="button"
                className="p-2 text-oriana-navy xl:hidden"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menu"
              >
                {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              <span className={cn(utilityClass, 'hidden xl:inline-flex')}>{localeLabel}</span>
            </div>

            <Link href="/" className="justify-self-center">
              <Logo priority variant="light" className="h-11 w-auto md:h-[3.25rem]" />
            </Link>

            <div className="flex items-center justify-end gap-3 sm:gap-4">
              <Link href="/search" className={utilityClass} aria-label={searchLabel}>
                <Search className="h-4 w-4" />
                <span className="sr-only xl:not-sr-only">{searchLabel}</span>
              </Link>
              <Link href={loginHref} className={cn(utilityClass, 'hidden sm:inline-flex')}>
                <User className="h-4 w-4" />
                <span className="uppercase">{loginLabel}</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden border-t border-oriana-navy/8 xl:block">
          <div className="container">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center">
              <div />
              <nav className="flex items-center justify-center gap-1">
                {mainNavItems.map((item) => {
                  const hasMenu = itemHasSubmenu(item)
                  const href = navHref(item)
                  const open = hasMenu && openMenu === item.type
                  const active = item.type === 'link' && pathname === item.href

                  return (
                    <Link
                      key={item.label}
                      href={href}
                      className={cn(linkClass, (open || active) && 'text-oriana-blue')}
                      onMouseEnter={() =>
                        setOpenMenu(itemHasSubmenu(item) ? item.type : null)
                      }
                      onFocus={() =>
                        setOpenMenu(itemHasSubmenu(item) ? item.type : null)
                      }
                      aria-expanded={itemHasSubmenu(item) ? open : undefined}
                      aria-haspopup={itemHasSubmenu(item) ? 'true' : undefined}
                    >
                      {item.label}
                      <span
                        className={cn(
                          'absolute inset-x-3 bottom-0 h-0.5 origin-center bg-oriana-blue transition-transform duration-300',
                          open || active ? 'scale-x-100' : 'scale-x-0',
                        )}
                      />
                    </Link>
                  )
                })}
              </nav>

              <div className="flex items-center justify-end gap-2">
                <Link
                  href={whereToBuy.href}
                  className={linkClass}
                  onMouseEnter={() => setOpenMenu(null)}
                >
                  {whereToBuy.label}
                </Link>
                <Link
                  href={requestQuote.href}
                  className="ml-1 rounded-md bg-oriana-blue px-5 py-2 text-sm font-semibold text-white transition hover:bg-oriana-navy"
                  onMouseEnter={() => setOpenMenu(null)}
                >
                  {requestQuote.label}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {showMegaPanel && openMegaItem ? (
          <div
            className="hidden xl:block"
            onMouseEnter={() => setOpenMenu(openMegaItem.type)}
          >
            <NavMegaPanel
              label={openMegaItem.label}
              categories={openMegaItem.categories}
              ariaLabel={`${openMegaItem.label} menu`}
            />
          </div>
        ) : null}
      </div>

      {mobileOpen && (
        <div className="max-h-[80vh] overflow-y-auto border-t border-oriana-navy/10 bg-white px-4 py-4 xl:hidden">
          {mainNavItems.map((item) => {
            if (!itemHasSubmenu(item)) {
              return (
                <Link
                  key={item.label}
                  href={navHref(item)}
                  className="mb-4 block py-2 text-sm font-semibold text-oriana-navy hover:text-oriana-blue"
                >
                  {item.label}
                </Link>
              )
            }

            return (
              <div key={item.label} className="mb-6">
                <Link
                  href={navHref(item)}
                  className="mb-2 block text-xs font-bold uppercase tracking-widest text-oriana-blue"
                >
                  {item.label}
                </Link>
                {item.categories.map((category) => (
                  <div key={category.href} className="mb-3">
                    <Link
                      href={category.href}
                      className="text-sm font-semibold text-oriana-navy hover:text-oriana-blue"
                    >
                      {category.label}
                    </Link>
                    {category.columns.map((col) =>
                      col.links.slice(0, 3).map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block py-1.5 pl-2 text-sm text-oriana-muted"
                        >
                          {link.label}
                        </Link>
                      )),
                    )}
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
