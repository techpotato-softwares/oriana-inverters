'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import type { CatalogueNavItem } from '@/types/catalogue'
import { cn } from '@/utilities/ui'

const categoryPlaceholders: Record<string, string> = {
  'residential-grid-tied': '/assets/products/single-phase.svg',
  'ci-grid-tied': '/assets/products/three-phase.svg',
  'utility-grid-tied': '/assets/products/utility-scale.svg',
  'residential-hybrid': '/assets/products/hybrid-storage.svg',
  'ci-hybrid': '/assets/products/hybrid-storage.svg',
  'single-phase': '/assets/products/single-phase.svg',
  'three-phase': '/assets/products/three-phase.svg',
  'utility-scale': '/assets/products/utility-scale.svg',
  'energy-storage': '/assets/products/hybrid-storage.svg',
  accessories: '/assets/products/accessories.svg',
}

function categorySlugFromHref(href: string) {
  return href.split('/').pop() ?? 'residential-grid-tied'
}

function placeholderFor(href: string, imageUrl?: string | null) {
  if (imageUrl) return imageUrl
  const slug = categorySlugFromHref(href)
  return categoryPlaceholders[slug] ?? categoryPlaceholders['residential-grid-tied']
}

function firstIndexWithProducts(items: CatalogueNavItem[]) {
  const i = items.findIndex((cat) => cat.products.length > 0)
  return i >= 0 ? i : 0
}

/** Products megamenu — categories and models come from Payload admin */
export function ProductsMegaMenuPanel({ menu }: { menu: CatalogueNavItem[] }) {
  const items = menu
  const [activeIndex, setActiveIndex] = useState(() => firstIndexWithProducts(items))
  const active = items[activeIndex] ?? items[0]

  if (!active) {
    return null
  }

  const categoryPlaceholder = placeholderFor(active.href)

  return (
    <div
      className="absolute left-0 right-0 top-full z-40 overflow-hidden border-t border-white/40 bg-white/90 shadow-[0_20px_50px_-12px_rgba(7,21,37,0.15)] backdrop-blur-xl backdrop-saturate-150"
      role="region"
      aria-label="Products menu"
    >
      <div className="container flex min-h-[300px] gap-0 py-8 lg:py-10">
        <aside className="w-52 shrink-0 border-r border-oriana-navy/8 pr-6 lg:w-60">
          <Link
            href="/products"
            className="mb-5 flex items-center gap-1 text-sm font-bold text-oriana-navy transition hover:text-oriana-blue"
          >
            All Products
            <ChevronRight className="h-4 w-4" />
          </Link>
          <ul className="space-y-0">
            {items.map((cat, i) => {
              const isActive = activeIndex === i
              return (
                <li key={cat.href}>
                  <button
                    type="button"
                    className={cn(
                      'flex w-full items-center justify-between border-b-2 py-3.5 text-left text-sm transition',
                      isActive
                        ? 'border-oriana-blue font-medium text-oriana-blue'
                        : 'border-transparent text-oriana-navy/80 hover:text-oriana-blue',
                    )}
                    onMouseEnter={() => setActiveIndex(i)}
                    onFocus={() => setActiveIndex(i)}
                  >
                    <span className="pr-2 leading-snug">{cat.title}</span>
                    {isActive && <ChevronRight className="h-4 w-4 shrink-0" />}
                  </button>
                </li>
              )
            })}
          </ul>
        </aside>

        <div className="min-w-0 flex-1 pl-8 lg:pl-12">
          <div className="mb-4 flex items-center justify-between">
            <Link
              href={active.href}
              className="text-sm font-semibold text-oriana-navy hover:text-oriana-blue"
            >
              {active.title}
            </Link>
            <Link href={active.href} className="text-xs text-oriana-muted hover:text-oriana-blue">
              View category →
            </Link>
          </div>

          {active.products.length === 0 ? (
            <p className="text-sm text-oriana-muted">
              View this category for details, or{' '}
              <Link href="/contact" className="font-semibold text-oriana-blue hover:underline">
                contact us
              </Link>{' '}
              for current models.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 lg:gap-8">
              {active.products.slice(0, 8).map((product) => {
                const src = placeholderFor(active.href, product.imageUrl)
                const isSvg = src.endsWith('.svg')
                return (
                  <Link
                    key={product.href}
                    href={product.href}
                    className="group flex flex-col items-center text-center"
                  >
                    <div className="relative flex h-32 w-full max-w-[180px] items-center justify-center bg-gradient-to-b from-oriana-silver/60 to-white transition group-hover:from-oriana-silver">
                      <Image
                        src={src}
                        alt={product.label}
                        width={140}
                        height={100}
                        className="h-auto max-h-[88px] w-auto max-w-[130px] object-contain p-2 transition group-hover:scale-105"
                        unoptimized={isSvg}
                      />
                    </div>
                    <p className="mt-3 max-w-[180px] font-mono text-[11px] leading-snug text-oriana-navy transition group-hover:text-oriana-blue lg:text-xs">
                      {product.label}
                    </p>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
