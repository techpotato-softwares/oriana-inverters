'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'
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

const TAB_RADIUS = '0.8rem'
const TAB_EASE = 'cubic-bezier(0.4, 0, 0.2, 1)'

/**
 * Sungrow-style category hero tabs:
 * frosted bar (no border), per-tab white active state with CSS transition
 * (avoids layoutId border-radius flash).
 */
export function ProductCategoriesSection({
  title = 'Product Categories',
  categories,
  ariaLabel = 'Product categories',
  className = '',
}: ProductCategoriesSectionProps) {
  const reduceMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)

  if (!categories.length) return null

  const displayIndex = hoverIndex ?? activeIndex
  const current = categories[displayIndex] ?? categories[0]
  const transition = reduceMotion ? 'none' : `background-color 0.3s ${TAB_EASE}, color 0.3s ${TAB_EASE}, box-shadow 0.3s ${TAB_EASE}, font-weight 0.3s ${TAB_EASE}`

  return (
    <section
      className={cn('relative min-h-[100svh] overflow-hidden bg-oriana-deep', className)}
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
          <div className="absolute inset-0 bg-oriana-deep/40" aria-hidden />
          <div
            className="absolute inset-0 bg-gradient-to-r from-oriana-deep/80 via-oriana-deep/45 to-oriana-deep/20"
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
            className="mx-auto flex w-full max-w-7xl items-stretch"
            style={{
              height: 'clamp(4.5rem, 6.5vw, 5.75rem)',
              borderRadius: TAB_RADIUS,
              backgroundColor: 'rgba(230, 230, 230, 0.5)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
            }}
            role="tablist"
            aria-label={title}
          >
            {categories.map((category, index) => {
              const isHighlighted =
                hoverIndex === index || (hoverIndex === null && activeIndex === index)
              const showDividerAfter =
                index < categories.length - 1 &&
                displayIndex !== index &&
                displayIndex !== index + 1

              return (
                <div
                  key={category.id}
                  className="relative flex min-w-0 flex-1 items-center justify-center"
                  style={{ height: '100%' }}
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isHighlighted}
                    onMouseEnter={() => setHoverIndex(index)}
                    onFocus={() => setHoverIndex(index)}
                    onBlur={() => setHoverIndex(null)}
                    onClick={() => setActiveIndex(index)}
                    className="flex h-full w-full items-center justify-center px-2 text-center text-xs leading-snug sm:px-3 sm:text-sm lg:px-4 lg:text-base"
                    style={{
                      borderRadius: TAB_RADIUS,
                      transition,
                      backgroundColor: isHighlighted ? '#ffffff' : 'transparent',
                      color: isHighlighted ? '#606060' : '#ffffff',
                      fontWeight: isHighlighted ? 500 : 400,
                      boxShadow: isHighlighted ? '0 10px 25px rgba(7, 21, 37, 0.12)' : 'none',
                    }}
                  >
                    <span className="block max-w-full">{category.label}</span>
                  </button>

                  {index < categories.length - 1 ? (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute right-0 top-1/2 z-[1] -translate-y-1/2 text-black/35"
                      style={{
                        opacity: showDividerAfter ? 1 : 0,
                        transition: reduceMotion ? undefined : 'opacity 0.3s ease',
                        fontSize: '0.85rem',
                        lineHeight: 1,
                      }}
                    >
                      |
                    </span>
                  ) : null}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
