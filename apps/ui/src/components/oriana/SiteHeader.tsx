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
  partnersMegaMenuCategories,
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

type MegaMenuKey = 'products' | 'partners' | 'support' | 'about'

const megaHrefs: Record<MegaMenuKey, string> = {
  products: '/products',
  partners: '/partners',
  support: '/support',
  about: '/about',
}

const megaMenuFallbacks: Record<MegaMenuKey, MainNavEntry> = {
  products: { type: 'products', label: 'Products', categories: productsMegaMenuCategories },
  partners: { type: 'partners', label: 'Partners', categories: partnersMegaMenuCategories },
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
  return (
    item.type === 'products' ||
    item.type === 'partners' ||
    item.type === 'support' ||
    item.type === 'about'
  )
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
  const headerRef = useRef<HTMLElement>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<MegaMenuKey | null>(null)
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)
  const [navCollapsed, setNavCollapsed] = useState(false)
  /** Short viewports (Windows scaling, 13–14" laptops): keep a single compact bar. */
  const [compactViewport, setCompactViewport] = useState(false)

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
    const mq = window.matchMedia('(max-height: 52rem)')
    const sync = () => setCompactViewport(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setOpenMenu(null)
    setHoveredNav(null)
    lastScrollY.current = window.scrollY
    // Hero / page top: keep the logo + main nav row visible for easy navigation.
    setNavCollapsed(window.scrollY > 16)
  }, [pathname, compactViewport])

  useEffect(() => {
    lastScrollY.current = window.scrollY

    const update = () => {
      const y = Math.max(0, window.scrollY)
      const delta = y - lastScrollY.current
      lastScrollY.current = y

      if (mobileOpen) {
        setNavCollapsed(false)
        return
      }

      // At the hero (page top), always show the secondary nav under the logo.
      if (y <= 16) {
        setNavCollapsed(false)
        return
      }

      // Scroll down → collapse to free space; scroll up → reveal again.
      const downThreshold = compactViewport ? 4 : 6
      const upThreshold = compactViewport ? -6 : -6

      if (delta > downThreshold) {
        setNavCollapsed(true)
        setOpenMenu(null)
        setHoveredNav(null)
        return
      }

      if (delta < upThreshold) {
        setNavCollapsed(false)
      }
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [mobileOpen, compactViewport])

  useEffect(() => {
    if (catalogueMenu.length > 0 || refreshedEmptyMenu.current) return
    refreshedEmptyMenu.current = true
    router.refresh()
  }, [catalogueMenu.length, router])

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const syncHeight = () => {
      const heightPx = Math.ceil(header.getBoundingClientRect().height)
      const root = document.documentElement
      root.style.setProperty('--site-header-height', `${heightPx}px`)
      // Keep available viewport in sync with the live measured header (CSS calc alone
      // can stale when --site-header-height is set as an inline px override).
      root.style.setProperty(
        '--available-viewport',
        `calc(var(--viewport-height, 100svh) - ${heightPx}px)`,
      )
    }

    syncHeight()
    const observer = new ResizeObserver(syncHeight)
    observer.observe(header)
    window.addEventListener('resize', syncHeight)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', syncHeight)
    }
  }, [navCollapsed, mobileOpen, openMenu, compactViewport])

  const showSecondaryNav = !navCollapsed
  const linkClass = cn(
    'relative px-3 text-sm font-medium text-oriana-navy transition-colors hover:text-oriana-blue',
    compactViewport ? 'py-2.5' : 'py-3.5',
  )
  const utilityClass =
    'inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-oriana-navy/70 transition-colors hover:text-oriana-blue'

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 bg-white/90 shadow-sm backdrop-blur-xl backdrop-saturate-150"
    >
      <div
        className="relative"
        onMouseLeave={() => {
          setOpenMenu(null)
          setHoveredNav(null)
        }}
      >
        <div className="container">
          <div
            className={cn(
              'grid grid-cols-[1fr_auto_1fr] items-center transition-[height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
              compactViewport
                ? 'h-14 lg:h-16'
                : navCollapsed
                  ? 'h-14 sm:h-16 lg:h-[4.25rem]'
                  : 'h-16 sm:h-[4.5rem] lg:h-[4.75rem]',
            )}
          >
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
              <Logo
                priority
                variant="light"
                className={cn(
                  'w-auto transition-[height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
                  compactViewport
                    ? 'h-8 md:h-10'
                    : navCollapsed
                      ? 'h-9 md:h-11'
                      : 'h-10 md:h-12 lg:h-14',
                )}
              />
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

        <div
          className={cn(
            'grid max-xl:hidden transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
            reduceMotion && 'transition-none',
            showSecondaryNav ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          )}
          aria-hidden={!showSecondaryNav}
        >
          <div
            className={cn(
              'min-h-0 overflow-hidden border-t border-oriana-navy/8',
              !showSecondaryNav && 'pointer-events-none border-transparent',
            )}
          >
            <div className="container">
              <nav className="flex items-center justify-center gap-1">
                {mainNavItems.map((item) => {
                  const hasMenu = itemHasSubmenu(item)
                  const href = navHref(item)
                  const open = hasMenu && openMenu === item.type
                  const marked = open || hoveredNav === item.label

                  return (
                    <Link
                      key={item.label}
                      href={href}
                      className={cn(linkClass, marked && 'text-oriana-blue')}
                      onMouseEnter={() => {
                        setHoveredNav(item.label)
                        setOpenMenu(hasMenu ? item.type : null)
                      }}
                      onFocus={() => {
                        setHoveredNav(item.label)
                        setOpenMenu(hasMenu ? item.type : null)
                      }}
                      aria-expanded={hasMenu ? open : undefined}
                      aria-haspopup={hasMenu ? 'true' : undefined}
                    >
                      {item.label}
                      <span
                        className={cn(
                          'absolute inset-x-3 bottom-0 h-0.5 origin-center bg-oriana-blue transition-transform duration-300',
                          marked ? 'scale-x-100' : 'scale-x-0',
                        )}
                      />
                    </Link>
                  )
                })}
              </nav>
            </div>
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
                <NavMegaPanel
                  key={openMegaItem.type}
                  label={openMegaItem.label}
                  categories={openMegaItem.categories}
                  ariaLabel={`${openMegaItem.label} menu`}
                  viewAllHref={openMegaItem.type === 'products' ? '/products' : undefined}
                  viewAllLabel={openMegaItem.type === 'products' ? 'All Products' : undefined}
                />
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
                      col.href ? (
                        <Link
                          key={col.href}
                          href={col.href}
                          className="mt-1 block py-1.5 pl-2 text-sm text-oriana-muted"
                        >
                          {col.title}
                        </Link>
                      ) : (
                        <div key={col.title} className="mt-1 pl-2">
                          <p className="pt-1 text-[11px] font-semibold uppercase tracking-wider text-oriana-navy/50">
                            {col.title}
                          </p>
                          {col.links.map((link) => (
                            <Link
                              key={`${link.href}:${link.label}`}
                              href={link.href}
                              className="block py-1.5 text-sm text-oriana-muted"
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      ),
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
