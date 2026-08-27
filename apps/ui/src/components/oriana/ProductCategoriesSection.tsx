'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { useState } from 'react'

import { cn } from '@/utilities/ui'

export type ProductCategoryItem = {
  id: string
  label: string
  href: string
  image: string
  alt?: string
}

export type ProductCategoriesSectionProps = {
  title?: string
  categories: ProductCategoryItem[]
  ariaLabel?: string
  className?: string
}

export function ProductCategoriesSection({
  title = 'Product Categories',
  categories,
  ariaLabel = 'Product categories',
  className = '',
}: ProductCategoriesSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)

  if (!categories.length) return null

  const displayIndex = hoverIndex ?? activeIndex
  const current = categories[displayIndex] ?? categories[0]

  return (
    <section
      className={cn('relative min-h-[100svh] overflow-hidden bg-oriana-navy', className)}
      style={{ height: '100svh' }}
      aria-label={ariaLabel}
      onMouseLeave={() => setHoverIndex(null)}
    >
      {categories.map((category, index) => (
        <div
          key={category.id}
          className="absolute inset-0 transition-opacity duration-500 ease-in-out"
          style={{
            opacity: displayIndex === index ? 1 : 0,
            zIndex: displayIndex === index ? 1 : 0,
          }}
          aria-hidden={displayIndex !== index}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={category.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading={index === 0 ? 'eager' : 'lazy'}
          />
          <div className="absolute inset-0 bg-oriana-navy/40" aria-hidden />
          <div
            className="absolute inset-0 bg-gradient-to-r from-oriana-navy/80 via-oriana-navy/45 to-oriana-navy/20"
            aria-hidden
          />
        </div>
      ))}

      <div className="relative z-10 flex h-full flex-col">
        <div className="container flex flex-1 flex-col justify-center pb-48 pt-24 sm:pb-52 lg:pb-56">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-oriana-sky">
            {title}
          </p>
          <Link
            href={current.href}
            className="group mt-6 inline-flex max-w-3xl items-start gap-3 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl"
          >
            <span>{current.label}</span>
            <ChevronRight
              className="mt-1 h-7 w-7 shrink-0 text-oriana-sky transition group-hover:translate-x-1 sm:h-8 sm:w-8"
              aria-hidden
            />
          </Link>
        </div>

        <div
          className="absolute inset-x-0 z-20 px-4 sm:px-8 lg:px-12"
          style={{ bottom: '2rem' }}
        >
          <div
            className="mx-auto flex w-full max-w-7xl items-stretch rounded-2xl border border-white/15 bg-white/10 p-1.5 backdrop-blur-md"
            role="tablist"
            aria-label={title}
          >
            {categories.map((category, index) => {
              const isHighlighted =
                hoverIndex === index || (hoverIndex === null && activeIndex === index)
              const isFirst = index === 0
              const isLast = index === categories.length - 1

              return (
                <Link
                  key={category.id}
                  href={category.href}
                  role="tab"
                  aria-selected={isHighlighted}
                  onMouseEnter={() => setHoverIndex(index)}
                  onFocus={() => setHoverIndex(index)}
                  onBlur={() => setHoverIndex(null)}
                  onClick={() => setActiveIndex(index)}
                  style={{ height: '5rem' }}
                  className={cn(
                    'flex min-w-0 flex-1 items-center justify-center border-r border-white/15 px-2 text-center text-xs font-semibold leading-snug transition last:border-r-0 sm:px-3 sm:text-sm lg:px-4 lg:text-base',
                    isHighlighted
                      ? cn(
                          'bg-white text-oriana-navy',
                          isFirst && 'rounded-l-xl',
                          isLast && 'rounded-r-xl',
                          !isFirst && !isLast && 'rounded-xl',
                        )
                      : 'text-white hover:ring-2 hover:ring-inset hover:ring-oriana-sky',
                  )}
                >
                  <span className="block max-w-full">{category.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
