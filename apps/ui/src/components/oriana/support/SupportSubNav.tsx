'use client'

import Link from 'next/link'
import { useEffect, useState, type MouseEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useLenis } from 'lenis/react'

const supportSections = [
  { label: 'Service brand', id: 'service-brand' },
  { label: 'Our strength', id: 'our-strengths' },
  { label: 'Our approach', id: 'our-approach' },
  { label: 'Global presence', id: 'global-presence' },
  { label: 'Service stories', id: 'service-stories' },
  { label: 'Support for you', id: 'support-for-you' },
  { label: 'Resources', id: 'resources' },
]

export function SupportSubNav() {
  const [activeId, setActiveId] = useState(supportSections[0].id)
  const lenis = useLenis()
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible) setActiveId(visible.target.id)
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
    )

    for (const section of supportSections) {
      const el = document.getElementById(section.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  function handleClick(event: MouseEvent<HTMLAnchorElement>, id: string) {
    const target = document.getElementById(id)
    if (!target) return

    event.preventDefault()
    setActiveId(id)

    const header = document.querySelector('header')
    const offset = -((header?.getBoundingClientRect().height ?? 80) + 72)

    if (lenis) {
      lenis.scrollTo(target, { offset, duration: reduceMotion ? 0 : 1.1 })
      return
    }

    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY + offset,
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
  }

  return (
    <nav
      aria-label="Support page sections"
      className="sticky z-30 border-b border-oriana-deep/8 bg-white/95 backdrop-blur-md"
      style={{ top: 'var(--site-header-height, 5rem)' }}
    >
      <div className="container flex items-center gap-6">
        <ul
          className="-mx-1 flex min-w-0 flex-1 gap-1 overflow-x-auto px-1 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          /* Wheel stays with Lenis: this bar is always on screen, so blocking it would stall page scroll. */
          data-lenis-prevent-touch
          style={{ touchAction: 'pan-x pan-y pinch-zoom' }}
        >
          {supportSections.map((item) => {
            const active = item.id === activeId
            return (
              <li key={item.id} className="shrink-0">
                <Link
                  href={`#${item.id}`}
                  onClick={(event) => handleClick(event, item.id)}
                  aria-current={active ? 'true' : undefined}
                  className={`relative inline-flex min-h-11 items-center rounded-full px-4 text-sm font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oriana-blue ${
                    active ? 'text-white' : 'text-oriana-muted hover:text-oriana-deep'
                  }`}
                >
                  {active ? (
                    <motion.span
                      layoutId="support-subnav-pill"
                      className="absolute inset-0 rounded-full bg-oriana-blue"
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { type: 'spring', stiffness: 380, damping: 34 }
                      }
                      aria-hidden
                    />
                  ) : null}
                  <span className="relative">{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>

        <Link
          href="/contact"
          className="hidden shrink-0 items-center gap-2 text-sm font-semibold text-oriana-blue transition-colors hover:text-oriana-sky focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oriana-blue xl:inline-flex"
        >
          Contact support
          <span aria-hidden>›</span>
        </Link>
      </div>
    </nav>
  )
}
