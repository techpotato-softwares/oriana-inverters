'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/Logo/Logo'
import { cn } from '@/utilities/ui'
import {
  aboutMegaMenuCategories,
  mainNav as defaultMainNav,
  productsMegaMenuCategories,
  supportMegaMenuCategories,
  type MainNavEntry,
} from '@/config/navigation'
import { NavMegaPanel } from '@/components/oriana/NavMegaPanel'
import type { CatalogueNavItem } from '@/types/catalogue'

export type SiteHeaderNav = {
  localeLabel?: string
  loginLabel?: string
  loginHref?: string
  whereToBuy?: { label: string; href: string }
  requestQuote?: { label: string; href: string }
  mainNav?: MainNavEntry[]
}

type MegaMenuKey = 'products' | 'support' | 'about'

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

  const openMegaItem =
    openMenu != null
      ? (mainNavItems.find((item) => item.type === openMenu) ?? megaMenuFallbacks[openMenu])
      : null

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
    'relative px-3 py-5 text-sm font-medium text-oriana-navy transition-colors hover:text-oriana-blue'

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/90 shadow-sm backdrop-blur-xl backdrop-saturate-150 transition-all duration-300">
      <div className="relative border-b border-oriana-navy/8" onMouseLeave={() => setOpenMenu(null)}>
        <div className="container">
          <div className="flex h-16 items-center justify-between lg:h-[4.25rem]">
            <Link href="/" className="shrink-0">
              <Logo priority variant="light" />
            </Link>

            <nav className="hidden flex-1 items-center justify-center gap-1 xl:flex">
              {mainNavItems.map((item) => {
                if (item.type === 'link') {
                  const active = pathname === item.href
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={cn(linkClass, active && 'text-oriana-blue')}
                    >
                      {item.label}
                    </Link>
                  )
                }

                if (!isMegaMenuItem(item)) return null

                const open = openMenu === item.type
                return (
                  <button
                    key={item.label}
                    type="button"
                    className={cn(linkClass, open && 'text-oriana-blue')}
                    onMouseEnter={() => setOpenMenu(item.type)}
                    onFocus={() => setOpenMenu(item.type)}
                    aria-expanded={open}
                    aria-haspopup="true"
                  >
                    {item.label}
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
              <Link href={whereToBuy.href} className={linkClass}>
                {whereToBuy.label}
              </Link>
              <Link
                href={requestQuote.href}
                className="ml-1 rounded-md bg-oriana-blue px-5 py-2 text-sm font-semibold text-white transition hover:bg-oriana-navy"
              >
                {requestQuote.label}
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

        {openMegaItem && isMegaMenuItem(openMegaItem) && (
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
        )}
      </div>

      {mobileOpen && (
        <div className="max-h-[80vh] overflow-y-auto border-t border-oriana-navy/10 bg-white px-4 py-4 xl:hidden">
          {mainNavItems.map((item) => {
            if (item.type === 'link') {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="mb-4 block py-2 text-sm font-semibold text-oriana-navy hover:text-oriana-blue"
                >
                  {item.label}
                </Link>
              )
            }

            if (!isMegaMenuItem(item)) return null

            return (
              <div key={item.label} className="mb-6">
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-oriana-blue">
                  {item.label}
                </p>
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
