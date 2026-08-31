'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export type VisionMissionCard = {
  id: string
  label: string
  headline?: string
  body?: string
  image: string
  alt?: string
  href?: string
  ctaLabel?: string
}

export type VisionMissionSectionProps = {
  title?: string
  cards: VisionMissionCard[]
  ariaLabel?: string
  className?: string
}

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n))
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / Math.max(edge1 - edge0, 1e-6))
  return t * t * (3 - 2 * t)
}

/** Crossfade opacities with the swap centered on each card boundary (50% for two cards). */
function textOpacitiesForRatio(ratio: number, count: number, fadeWindow = 0.36): number[] {
  if (count <= 1) return [1]
  return Array.from({ length: count }, (_, i) => {
    const start = i / count
    const end = (i + 1) / count
    const half = fadeWindow / 2
    const inStart = i === 0 ? -1 : start - half
    const inEnd = i === 0 ? 0 : start + half
    const outStart = i === count - 1 ? 1 : end - half
    const outEnd = i === count - 1 ? 2 : end + half
    return clamp01(smoothstep(inStart, inEnd, ratio) * (1 - smoothstep(outStart, outEnd, ratio)))
  })
}

function AccentMark() {
  return (
    <svg
      width="40"
      height="6"
      viewBox="0 0 40 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-[5px] w-10 text-oriana-sky"
      aria-hidden
    >
      <path
        d="M13.4948 5.50417H0V0H18.5913C18.5913 3.0428 16.3122 5.50417 13.4948 5.50417ZM40 5.50417H21.4087C21.4087 2.46783 23.6878 0 26.5052 0H40V5.50417Z"
        fill="currentColor"
      />
    </svg>
  )
}

/**
 * Sticky split-card section — left copy crossfades, right image peek stack on scroll.
 */
export function VisionMissionSection({
  title = 'Vision & Mission',
  cards,
  ariaLabel = 'Vision and mission',
  className = '',
}: VisionMissionSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const ticking = useRef(false)
  const [active, setActive] = useState(0)
  const [textOpacities, setTextOpacities] = useState<number[]>(() =>
    cards.map((_, i) => (i === 0 ? 1 : 0)),
  )
  const [imageProgress, setImageProgress] = useState<number[]>(() => cards.map(() => 0))

  useEffect(() => {
    if (!cards.length) return

    const update = () => {
      const section = sectionRef.current
      if (!section) return

      const vh = window.innerHeight
      const rect = section.getBoundingClientRect()
      const scrollSpan = Math.max(section.offsetHeight - vh, 1)
      const scrolled = Math.min(Math.max(-rect.top, 0), scrollSpan)
      const ratio = scrolled / scrollSpan

      const nextActive = Math.min(cards.length - 1, Math.floor(ratio * cards.length + 0.001))
      setActive(nextActive)

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduceMotion) {
        setTextOpacities(cards.map((_, i) => (i === nextActive ? 1 : 0)))
      } else {
        setTextOpacities(textOpacitiesForRatio(ratio, cards.length))
      }

      const progress = cards.map((_, i) => {
        const start = i / cards.length
        const end = (i + 1) / cards.length
        if (ratio <= start) return 0
        if (ratio >= end) return 1
        return (ratio - start) / (end - start)
      })
      setImageProgress(progress)
    }

    const onScroll = () => {
      if (ticking.current) return
      ticking.current = true
      window.requestAnimationFrame(() => {
        update()
        ticking.current = false
      })
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [cards])

  if (!cards.length) return null

  const runwayVh = cards.length * 100

  return (
    <section
      ref={sectionRef}
      className={`relative bg-white ${className}`.trim()}
      style={{ height: `${runwayVh}svh` }}
      aria-label={ariaLabel}
    >
      <div className="sticky top-0 min-h-[100svh]" style={{ height: '100svh' }}>
        <div className="box-border flex h-full w-full flex-col justify-center px-4 py-10 sm:px-8 lg:px-12 xl:px-20">
          {title ? (
            <h2 className="mb-8 text-center font-display text-3xl font-semibold tracking-tight text-oriana-navy md:mb-10 md:text-4xl lg:text-5xl">
              {title}
            </h2>
          ) : null}

          <div
            className="mx-auto grid w-full max-w-7xl grid-cols-1 overflow-hidden lg:grid-cols-2"
            style={{
              height: title ? 'min(72svh, 680px)' : 'min(78svh, 720px)',
              minHeight: '520px',
              borderRadius: 40,
              boxShadow: '0 28px 80px rgba(7, 21, 37, 0.12)',
            }}
          >
            {/* Copy panel */}
            <div className="relative order-2 h-full min-h-[280px] bg-white lg:order-1">
              {cards.map((card, i) => {
                const opacity = textOpacities[i] ?? 0
                const isActive = active === i
                return (
                  <div
                    key={card.id}
                    className="absolute inset-0 flex flex-col justify-center px-8 py-10 sm:px-12 lg:px-14 xl:px-16"
                    style={{
                      opacity,
                      zIndex: isActive ? 2 : 1,
                      pointerEvents: opacity > 0.45 ? 'auto' : 'none',
                      transform: `translateY(${(1 - opacity) * 14}px)`,
                      filter: `blur(${(1 - opacity) * 1.6}px)`,
                      willChange: 'opacity, transform, filter',
                    }}
                    aria-hidden={opacity < 0.45}
                  >
                    <div className="flex max-w-xl flex-col gap-6 lg:gap-8">
                      <div>
                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-oriana-blue">
                          {card.label}
                        </p>
                        <AccentMark />
                      </div>
                      <p className="font-display text-2xl font-semibold leading-snug text-oriana-navy sm:text-3xl lg:text-4xl lg:leading-tight">
                        {card.headline || card.body}
                      </p>
                      {card.headline && card.body ? (
                        <p className="text-base leading-relaxed text-oriana-muted md:text-lg">
                          {card.body}
                        </p>
                      ) : null}
                    </div>
                    {card.href ? (
                      <Link
                        href={card.href}
                        tabIndex={opacity > 0.45 ? 0 : -1}
                        className="mt-8 inline-flex w-fit min-w-[12rem] items-center justify-center rounded-full border-2 border-oriana-blue px-8 py-3.5 text-sm font-semibold text-oriana-blue transition hover:bg-oriana-blue hover:text-white sm:text-base"
                      >
                        {card.ctaLabel || 'Explore more'}
                      </Link>
                    ) : null}
                  </div>
                )
              })}
            </div>

            {/* Image peek stack */}
            <div className="relative order-1 h-full min-h-[240px] lg:order-2">
              {cards.map((card, i) => {
                const progress = imageProgress[i] ?? 0
                const lift = i < cards.length - 1 ? progress * -100 : 0
                return (
                  <div
                    key={card.id}
                    className="absolute inset-0 overflow-hidden"
                    style={{
                      zIndex: cards.length - i,
                      transform: `translateY(${lift}%)`,
                      transition: 'transform 0.15s linear',
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={card.image}
                      alt={card.alt || card.label}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading={i === 0 ? 'eager' : 'lazy'}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
