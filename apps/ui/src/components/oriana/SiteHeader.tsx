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
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<MegaMenuKey | null>(null)
  const [navCollapsed, setNavCollapsed] = useState(false)

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
    setNavCollapsed(window.scrollY > 16)
  }, [pathname])

  useEffect(() => {
    const update = () => {
      const collapsed = window.scrollY > 16 && !mobileOpen
      setNavCollapsed((prev) => (prev === collapsed ? prev : collapsed))
      if (collapsed) setOpenMenu(null)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
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
    <header className="fixed inset-x-0 top-0 z-50 bg-white/90 shadow-sm backdrop-blur-xl backdrop-saturate-150">
      <div className="relative" onMouseLeave={() => setOpenMenu(null)}>
        <div className="container">
          <div
            className={cn(
              'grid grid-cols-[1fr_auto_1fr] items-center transition-[height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
              navCollapsed ? 'h-16 lg:h-[4.25rem]' : 'h-[4.5rem] lg:h-20',
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
                  navCollapsed ? 'h-10 md:h-12' : 'h-12 md:h-16',
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
            navCollapsed ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]',
          )}
          aria-hidden={navCollapsed}
        >
          <div
            className={cn(
              'min-h-0 overflow-hidden border-t border-oriana-navy/8',
              navCollapsed && 'pointer-events-none border-transparent',
            )}
          >
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
