'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

import { categoryHasSubitems, type NavMegaCategory, type NavMenuColumn } from '@/config/navigation'
import { cn } from '@/utilities/ui'

type NavMegaPanelProps = {
  label?: string
  categories: NavMegaCategory[]
  ariaLabel?: string
  viewAllHref?: string
  viewAllLabel?: string
}

export function NavMegaPanel({
  label = 'Menu',
  categories,
  ariaLabel,
  viewAllHref = '/products',
  viewAllLabel = 'All Products',
}: NavMegaPanelProps) {
  const firstWithSubitems = categories.findIndex(categoryHasSubitems)
  const [activeIndex, setActiveIndex] = useState(firstWithSubitems >= 0 ? firstWithSubitems : 0)
  const reduceMotion = useReducedMotion()
  const active = categories[activeIndex] ?? categories[0]
  const activeHasSubitems = active ? categoryHasSubitems(active) : false
  const isSegmentMenu = Boolean(active?.columns.some((column) => column.image))

  if (!active) return null

  return (
    <div className="border-t border-oriana-navy/8 bg-white" role="region" aria-label={ariaLabel ?? `${label} menu`}>
      <div className="container flex min-h-[280px] items-start gap-10 py-10 lg:min-h-[320px] lg:gap-16 lg:py-12">
        <aside className="w-52 shrink-0 lg:w-60">
          {isSegmentMenu ? (
            <Link
              href={viewAllHref}
              className="mb-1 flex items-center gap-1 py-3 text-sm font-medium text-oriana-navy transition hover:text-oriana-blue"
            >
              {viewAllLabel}
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Link>
          ) : (
            <p className="mb-4 font-display text-xl font-semibold text-oriana-navy lg:text-2xl">{label}</p>
          )}
          <ul>
            {categories.map((category, index) => {
              const isActive = activeIndex === index
              return (
                <li key={category.href}>
                  <Link
                    href={category.href}
                    className={cn(
                      'block border-b-2 py-3.5 text-sm leading-snug transition',
                      isActive
                        ? 'border-oriana-blue font-medium text-oriana-navy'
                        : 'border-transparent text-oriana-navy/80 hover:text-oriana-blue',
                    )}
                    onMouseEnter={() => {
                      if (categoryHasSubitems(category)) setActiveIndex(index)
                    }}
                    onFocus={() => {
                      if (categoryHasSubitems(category)) setActiveIndex(index)
                    }}
                  >
                    {category.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </aside>

        {activeHasSubitems ? (
          <motion.div
            key={active.href}
            className="min-w-0 flex-1"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.18 }}
          >
            {isSegmentMenu ? (
              <SegmentTiles
                columns={active.columns}
                priority={activeIndex === (firstWithSubitems >= 0 ? firstWithSubitems : 0)}
              />
            ) : (
              <div
                className={cn(
                  'grid gap-10',
                  active.columns.length >= 4
                    ? 'sm:grid-cols-2 lg:grid-cols-4'
                    : 'sm:grid-cols-2 lg:grid-cols-3',
                )}
              >
                {active.columns
                  .filter((column) => column.links.length > 0)
                  .map((column) => (
                    <div key={column.title}>
                      <p className="text-sm font-medium text-oriana-navy">{column.title}</p>
                      <ul className="mt-4 space-y-2.5">
                        {column.links.map((link) => (
                          <li key={`${link.href}:${link.label}`}>
                            <Link
                              href={link.href}
                              className="break-words text-sm text-oriana-muted transition hover:text-oriana-blue"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
            )}
          </motion.div>
        ) : null}
      </div>
    </div>
  )
}

function SegmentTiles({ columns, priority }: { columns: NavMenuColumn[]; priority?: boolean }) {
  const tiles = columns.filter((column) => column.href && column.image)
  const cols = tiles.length >= 4 ? 'grid-cols-4' : 'grid-cols-3'

  return (
    <div className={cn('grid gap-x-10 gap-y-12', cols)}>
      {tiles.map((column) => (
        <Link key={column.href} href={column.href!} className="group flex h-full flex-col items-center">
          <span className="flex h-44 w-full items-center justify-center sm:h-52">
            <img
              src={column.image}
              alt={column.title}
              width={320}
              height={208}
              loading="eager"
              decoding="async"
              fetchPriority={priority ? 'high' : 'auto'}
              className="h-auto max-h-full w-auto max-w-full object-contain"
            />
          </span>
          <p className="mt-4 text-center text-sm font-medium leading-snug text-oriana-navy/80 transition group-hover:text-oriana-blue">
            {column.title}
          </p>
        </Link>
      ))}
    </div>
  )
}
