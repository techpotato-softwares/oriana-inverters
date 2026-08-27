'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ChevronRight } from 'lucide-react'

import type { NavMegaCategory } from '@/config/navigation'
import { cn } from '@/utilities/ui'

type NavMegaPanelProps = {
  label?: string
  categories: NavMegaCategory[]
  ariaLabel?: string
  viewAllLabel?: string
}

export function NavMegaPanel({
  label = 'Menu',
  categories,
  ariaLabel,
  viewAllLabel = 'View category →',
}: NavMegaPanelProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = categories[activeIndex] ?? categories[0]

  if (!active) return null

  return (
    <div
      className="absolute left-0 right-0 top-full z-40 border-t border-white/60 shadow-[0_12px_40px_rgba(7,21,37,0.12)] backdrop-blur-2xl backdrop-saturate-150"
      style={{
        background: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
      }}
      role="region"
      aria-label={ariaLabel ?? `${label} menu`}
    >
      <div className="container flex min-h-[320px] items-start gap-6 py-8 lg:min-h-[360px] lg:gap-8 lg:py-10">
        <aside
          className="h-fit w-52 shrink-0 rounded-xl border border-white/50 p-5 shadow-[0_4px_24px_rgba(7,21,37,0.08)] backdrop-blur-lg lg:w-64 lg:p-6"
          style={{
            background: 'rgba(255, 255, 255, 0.78)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: 16,
          }}
        >
          <p className="mb-5 font-display text-xl font-semibold text-oriana-navy lg:mb-6 lg:text-2xl">
            {label}
          </p>
          <ul className="space-y-1">
            {categories.map((category, index) => {
              const isActive = activeIndex === index
              return (
                <li key={category.href}>
                  <Link
                    href={category.href}
                    className={cn(
                      'flex items-center justify-between border-b-2 py-3.5 text-sm transition',
                      isActive
                        ? 'border-oriana-blue font-semibold text-oriana-blue'
                        : 'border-transparent text-oriana-navy/80 hover:text-oriana-blue',
                    )}
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                  >
                    <span className="pr-2 leading-snug">{category.label}</span>
                    {isActive ? <ChevronRight className="h-4 w-4 shrink-0" aria-hidden /> : null}
                  </Link>
                </li>
              )
            })}
          </ul>
        </aside>

        <div className="min-w-0 flex-1 lg:pl-2">
          <div className="mb-6 flex items-center justify-between">
            <Link
              href={active.href}
              className="text-base font-semibold text-oriana-navy transition hover:text-oriana-blue"
            >
              {active.label}
            </Link>
            <Link
              href={active.href}
              className="text-sm text-oriana-muted transition hover:text-oriana-blue"
            >
              {viewAllLabel}
            </Link>
          </div>

          <div
            className={cn(
              'grid gap-8',
              active.columns.length >= 4
                ? 'sm:grid-cols-2 lg:grid-cols-4'
                : 'sm:grid-cols-2 lg:grid-cols-3',
            )}
          >
            {active.columns.map((column) => (
              <div
                key={column.title}
                className="rounded-xl border border-white/50 p-5 shadow-[0_4px_24px_rgba(7,21,37,0.08)] backdrop-blur-lg"
                style={{
                  background: 'rgba(255, 255, 255, 0.78)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  borderRadius: 16,
                }}
              >
                <p className="text-base font-semibold text-oriana-navy">{column.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-oriana-muted transition hover:text-oriana-blue"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
