'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { inverterMegaMenu } from '@/config/navigation'
import { cn } from '@/utilities/ui'

const categoryPlaceholders: Record<string, string> = {
  'single-phase': '/assets/products/single-phase.svg',
  'three-phase': '/assets/products/three-phase.svg',
  'utility-scale': '/assets/products/utility-scale.svg',
  'energy-storage': '/assets/products/hybrid-storage.svg',
  accessories: '/assets/products/accessories.svg',
}

function categorySlugFromHref(href: string) {
  return href.split('/').pop() ?? 'single-phase'
}

/** Solis / Sungrow two-panel products megamenu — categories left, product cards right */
export function ProductsMegaMenuPanel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = inverterMegaMenu[activeIndex]
  const categorySlug = categorySlugFromHref(active.href)
  const placeholder = categoryPlaceholders[categorySlug] ?? categoryPlaceholders['single-phase']

  return (
    <div
      className="absolute left-0 right-0 top-full z-40 overflow-hidden border-t border-white/40 bg-white/90 shadow-[0_20px_50px_-12px_rgba(7,21,37,0.15)] backdrop-blur-xl backdrop-saturate-150"
      role="region"
      aria-label="Products menu"
    >
      <div className="container flex min-h-[300px] gap-0 py-8 lg:py-10">
        {/* Left — category sidebar (Solis / Sungrow) */}
        <aside className="w-52 shrink-0 border-r border-oriana-navy/8 pr-6 lg:w-60">
          <Link
            href="/products"
            className="mb-5 flex items-center gap-1 text-sm font-bold text-oriana-navy transition hover:text-oriana-blue"
          >
            All Products
            <ChevronRight className="h-4 w-4" />
          </Link>
          <ul className="space-y-0">
            {inverterMegaMenu.map((cat, i) => {
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

        {/* Right — product image grid for active category */}
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

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 lg:gap-8">
            {active.products.map((product) => (
              <Link
                key={product.href}
                href={product.href}
                className="group flex flex-col items-center text-center"
              >
                <div className="relative flex h-32 w-full max-w-[180px] items-center justify-center bg-gradient-to-b from-oriana-silver/60 to-white transition group-hover:from-oriana-silver">
                  <Image
                    src={placeholder}
                    alt={product.label}
                    width={140}
                    height={100}
                    className="h-auto max-h-[88px] w-auto max-w-[130px] object-contain p-2 transition group-hover:scale-105"
                    unoptimized
                  />
                </div>
                <p className="mt-3 max-w-[180px] font-mono text-[11px] leading-snug text-oriana-navy transition group-hover:text-oriana-blue lg:text-xs">
                  {product.label}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
