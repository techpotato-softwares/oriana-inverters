'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
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
  const reduceMotion = useReducedMotion()
  const refreshedEmptyMenu = useRef(false)
  const lastScrollY = useRef(0)
  const scrollTicking = useRef(false)
  const scrollAccum = useRef(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<MegaMenuKey | null>(null)
  const [headerHidden, setHeaderHidden] = useState(false)

  const mainNavItems = nav?.mainNav ?? defaultMainNav
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
    setHeaderHidden(false)
  }, [pathname])

  useEffect(() => {
    lastScrollY.current = window.scrollY
    scrollAccum.current = 0

    const onScroll = () => {
      if (scrollTicking.current) return
      scrollTicking.current = true

      window.requestAnimationFrame(() => {
        const current = window.scrollY
        const delta = current - lastScrollY.current

        if (current <= 24) {
          setHeaderHidden(false)
          scrollAccum.current = 0
        } else {
          const reversed =
            (delta > 0 && scrollAccum.current < 0) || (delta < 0 && scrollAccum.current > 0)
          if (reversed) scrollAccum.current = 0
          scrollAccum.current += delta

          if (scrollAccum.current > 12 && !mobileOpen) {
            setHeaderHidden(true)
            setOpenMenu(null)
          } else if (scrollAccum.current < -12) {
            setHeaderHidden(false)
          }
        }

        lastScrollY.current = current
        scrollTicking.current = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [mobileOpen])

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
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 bg-white/90 shadow-sm backdrop-blur-xl backdrop-saturate-150',
        reduceMotion
          ? 'transition-none'
          : 'transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
        headerHidden ? '-translate-y-full' : 'translate-y-0',
      )}
    >
      <div className="relative" onMouseLeave={() => setOpenMenu(null)}>
        <div className="container">
          <div className="grid h-[4.5rem] grid-cols-[1fr_auto_1fr] items-center lg:h-20">
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
              <Logo priority variant="light" className="h-12 w-auto md:h-16" />
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
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-full z-40 hidden xl:block">
          <AnimatePresence>
            {showMegaPanel && openMegaItem ? (
              <motion.div
                key="mega-panel"
                className="pointer-events-auto overflow-hidden"
                initial={reduceMotion ? false : { height: 0, opacity: 0.4 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={reduceMotion ? undefined : { height: 0, opacity: 0.4 }}
                transition={{
                  height: {
                    duration: reduceMotion ? 0 : 0.38,
                    ease: [0.22, 1, 0.36, 1],
                  },
                  opacity: {
                    duration: reduceMotion ? 0 : 0.24,
                    ease: 'easeOut',
                  },
                }}
                onMouseEnter={() => setOpenMenu(openMegaItem.type)}
              >
                <div className="pb-10">
                  <NavMegaPanel
                    key={openMegaItem.type}
                    label={openMegaItem.label}
                    categories={openMegaItem.categories}
                    ariaLabel={`${openMegaItem.label} menu`}
                  />
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
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
        </div>
      )}
    </header>
  )
}
