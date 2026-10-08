'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useLenis } from 'lenis/react'

export type SubNavSection = { label: string; id: string; number?: string }

/** Bottom edge of the bar once stuck, regardless of whether it is stuck yet. */
function getStickyBottom(nav: HTMLElement | null) {
  if (!nav) return 0
  return (parseFloat(getComputedStyle(nav).top) || 0) + nav.offsetHeight
}

/** Sticky in-page section menu: highlights the section in view and smooth-scrolls on click. */
export function SectionSubNav({
  sections,
  label,
  pillId,
  aside,
}: {
  sections: SubNavSection[]
  label: string
  /** Unique per page so the active pill animates only within this bar. */
  pillId: string
  aside?: ReactNode
}) {
  const [activeId, setActiveId] = useState(sections[0]?.id)
  const navRef = useRef<HTMLElement>(null)
  const scrollLockRef = useRef<number | null>(null)
  const clickRef = useRef(0)
  const lenis = useLenis()
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      if (scrollLockRef.current !== null) return

      const line = getStickyBottom(navRef.current) + 24
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2

      let current = sections[0]?.id
      for (const section of sections) {
        const el = document.getElementById(section.id)
        if (el && el.getBoundingClientRect().top <= line) current = section.id
      }
      if (atBottom) {
        const last = sections.at(-1)
        const lastEl = last && document.getElementById(last.id)
        if (lastEl && lastEl.getBoundingClientRect().top < window.innerHeight) current = last.id
      }
      setActiveId(current)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [sections])

  useEffect(
    () => () => {
      if (scrollLockRef.current !== null) window.clearTimeout(scrollLockRef.current)
    },
    [],
  )

  function handleClick(event: MouseEvent<HTMLAnchorElement>, id: string) {
    const target = document.getElementById(id)
    if (!target) return

    event.preventDefault()
    setActiveId(id)

    // Explicit pixel target: element targets would also add the section's scroll-margin.
    const targetTop = () =>
      target.getBoundingClientRect().top + window.scrollY - getStickyBottom(navRef.current)
    const duration = reduceMotion ? 0 : 1.1

    const lock = (ms: number) => {
      if (scrollLockRef.current !== null) window.clearTimeout(scrollLockRef.current)
      scrollLockRef.current = window.setTimeout(() => {
        scrollLockRef.current = null
      }, ms)
    }
    lock(duration * 1000 + 1200)

    if (!lenis) {
      window.scrollTo({ top: targetTop(), behavior: reduceMotion ? 'auto' : 'smooth' })
      return
    }

    // The site header collapses/expands with scroll direction (300ms), shifting the
    // sticky bar; once it settles, nudge so the section sits flush under the bar.
    const click = ++clickRef.current
    lenis.scrollTo(targetTop(), {
      duration,
      onComplete: () => {
        window.setTimeout(() => {
          if (click !== clickRef.current) return
          const top = targetTop()
          if (Math.abs(top - window.scrollY) > 2) {
            lock(800)
            lenis.scrollTo(top, { duration: reduceMotion ? 0 : 0.4 })
          }
        }, 320)
      },
    })
  }

  return (
    <nav
      ref={navRef}
      aria-label={label}
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
          {sections.map((item) => {
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
                      layoutId={pillId}
                      className="absolute inset-0 rounded-full bg-oriana-blue"
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { type: 'spring', stiffness: 380, damping: 34 }
                      }
                      aria-hidden
                    />
                  ) : null}
                  <span className="relative flex items-center gap-2">
                    {item.number ? (
                      <span
                        className={`text-xs font-semibold transition-colors duration-300 ${
                          active ? 'text-white/70' : 'text-oriana-blue'
                        }`}
                      >
                        {item.number}
                      </span>
                    ) : null}
                    {item.label}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>

        {aside}
      </div>
    </nav>
  )
}
