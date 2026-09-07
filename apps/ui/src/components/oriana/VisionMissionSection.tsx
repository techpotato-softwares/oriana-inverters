'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

import { GrowingAccentLine } from './GrowingAccentLine'

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

/**
 * Copy stays on card N until its image is mostly gone, then crossfades.
 * Lift segments are only for cards that slide (count - 1).
 */
function textOpacitiesForLift(ratio: number, count: number): number[] {
  if (count <= 1) return [1]
  const lifts = Math.max(count - 1, 1)
  return Array.from({ length: count }, (_, i) => {
    if (i === 0) {
      // Fade out in the last ~30% of the first lift
      return 1 - smoothstep(0.7, 0.92, ratio)
    }
    if (i === count - 1 && count === 2) {
      return smoothstep(0.7, 0.92, ratio)
    }
    // 3+ cards: map each lift beat
    const start = (i - 1) / lifts
    const end = i / lifts
    const enter = smoothstep(start + (end - start) * 0.7, start + (end - start) * 0.92, ratio)
    if (i === count - 1) return enter
    const leave = 1 - smoothstep(end + (1 / lifts) * 0.7, end + (1 / lifts) * 0.92, ratio)
    return enter * leave
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
      className="h-[5px] w-10 text-oriana-blue"
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
 * Sticky split cards — Sungrow “Greener Tomorrow” stack:
 * top image slides up as a panel; next image is visible underneath the whole time.
 * @see https://www.sungrowpower.com/en
 */
export function VisionMissionSection({
  title = 'Vision & Mission',
  cards,
  ariaLabel = 'Vision and mission',
  className = '',
}: VisionMissionSectionProps) {
  const reduceMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const layerRefs = useRef<(HTMLDivElement | null)[]>([])
  const textRefs = useRef<(HTMLDivElement | null)[]>([])
  const targetRatio = useRef(0)

  useEffect(() => {
    if (!cards.length || reduceMotion) return

    const readRatio = () => {
      const section = sectionRef.current
      if (!section) return 0
      const vh = window.innerHeight
      const rect = section.getBoundingClientRect()
      const scrollSpan = Math.max(section.offsetHeight - vh, 1)
      const scrolled = Math.min(Math.max(-rect.top, 0), scrollSpan)
      return scrolled / scrollSpan
    }

    let raf = 0
    let current = 0
    let running = true

    const tick = () => {
      if (!running) return
      targetRatio.current = readRatio()
      current += (targetRatio.current - current) * 0.16
      if (Math.abs(targetRatio.current - current) < 0.00015) current = targetRatio.current

      const count = cards.length
      const lifts = Math.max(count - 1, 1)
      const opacities = textOpacitiesForLift(current, count)

      for (let i = 0; i < count; i++) {
        let progress = 0
        if (i < lifts) {
          const start = i / lifts
          const end = (i + 1) / lifts
          if (current <= start) progress = 0
          else if (current >= end) progress = 1
          else progress = (current - start) / (end - start)
        }

        const layer = layerRefs.current[i]
        if (layer) {
          // Whole panel slides up — next image stays fixed underneath (visible during the move)
          layer.style.transform = i < lifts ? `translate3d(0, ${-progress * 100}%, 0)` : 'translate3d(0, 0, 0)'
        }

        const text = textRefs.current[i]
        if (text) {
          const opacity = opacities[i] ?? 0
          text.style.opacity = String(opacity)
          text.style.zIndex = opacity > 0.45 ? '2' : '1'
          text.style.pointerEvents = opacity > 0.45 ? 'auto' : 'none'
          text.style.transform = `translateY(${(1 - opacity) * 8}px)`
          text.setAttribute('aria-hidden', opacity < 0.45 ? 'true' : 'false')
          const link = text.querySelector('a')
          if (link) link.tabIndex = opacity > 0.45 ? 0 : -1
        }
      }

      raf = window.requestAnimationFrame(tick)
    }

    raf = window.requestAnimationFrame(tick)
    return () => {
      running = false
      window.cancelAnimationFrame(raf)
    }
  }, [cards, reduceMotion])

  if (!cards.length) return null

  // One viewport of pin + one lift beat per sliding card (no dead hold on last card)
  const runwayVh = 100 + Math.max(cards.length - 1, 1) * 90
  const collapseDeadZone = runwayVh - 100

  if (reduceMotion) {
    return (
      <section
        ref={sectionRef}
        className={`relative bg-white py-14 lg:py-16 ${className}`.trim()}
        aria-label={ariaLabel}
      >
        <div className="container">
          {title ? (
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <h2 className="font-display text-3xl font-semibold text-oriana-navy md:text-4xl lg:text-5xl">
                {title}
              </h2>
              <GrowingAccentLine reduceMotion size="heading" className="mt-3" progress={1} />
            </div>
          ) : null}
          <div className="grid gap-4
           lg:grid-cols-2">
            {cards.map((card) => (
              <article key={card.id} className="overflow-hidden rounded-[2rem] border border-black/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={card.image} alt={card.alt || card.label} className="aspect-[4/3] w-full object-cover" />
                <div className="p-8">
                  <p className="font-display text-[#8a8a8a]">{card.label}</p>
                  <p className="mt-4 font-display text-xl text-[#606060]">{card.headline || card.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      className={`relative bg-white ${className}`.trim()}
      style={{
        height: `${runwayVh}svh`,
        marginTop: '1.5rem',
        // Pull Impact up over the unpin dead-zone (sectionH - 100svh)
        marginBottom: `calc(-${collapseDeadZone}svh)`,
      }}
      aria-label={ariaLabel}
    >
      <div
        className="sticky top-0 z-10 flex flex-col overflow-hidden bg-white"
        style={{ height: '100svh', maxHeight: '100svh' }}
      >
        <div
          className="flex shrink-0 flex-col items-center px-4"
          style={{
            paddingTop: 'max(3.75rem, calc(env(safe-area-inset-top, 0px) + 3.25rem))',
          }}
        >
          {title ? (
            <>
              <h2 className="text-center font-display text-3xl font-semibold text-oriana-navy md:text-4xl lg:text-5xl">
                {title}
              </h2>
              <GrowingAccentLine
                sectionRef={sectionRef}
                reduceMotion={!!reduceMotion}
                size="heading"
                className="mt-3"
              />
            </>
          ) : null}
        </div>

        <div className="flex min-h-0 flex-1 items-stretch justify-center px-4 pb-5 pt-2 sm:px-8 lg:px-12 xl:px-16">
          <div
            className="mx-auto grid h-full w-full max-w-7xl grid-cols-1 overflow-hidden lg:grid-cols-2"
            style={{
              borderRadius: 40,
              border: '1px solid rgba(7, 21, 37, 0.06)',
            }}
          >
            {/* Copy panel */}
            <div className="relative order-2 h-full min-h-0 bg-white lg:order-1">
              {cards.map((card, i) => {
                const primary = card.headline || card.body
                const support = card.headline && card.body ? card.body : null

                return (
                  <div
                    key={card.id}
                    ref={(node) => {
                      textRefs.current[i] = node
                    }}
                    className="absolute inset-0 box-border"
                    style={{
                      opacity: i === 0 ? 1 : 0,
                      zIndex: i === 0 ? 2 : 1,
                      pointerEvents: i === 0 ? 'auto' : 'none',
                      transform: 'translateY(0px)',
                      willChange: 'opacity, transform',
                      padding: 'clamp(2rem, 4.2vw, 3.5rem)',
                    }}
                    aria-hidden={i !== 0}
                  >
                    <div className="flex h-full w-full max-w-lg flex-col justify-center">
                      <div>
                        <p
                          className="font-display font-medium text-[#8a8a8a]"
                          style={{
                            fontSize: '1rem',
                            letterSpacing: '0.02em',
                            marginBottom: '0.75rem',
                          }}
                        >
                          {card.label}
                        </p>
                        <AccentMark />
                      </div>

                      <p
                        className="font-display font-medium text-[#606060]"
                        style={{
                          fontSize: 'clamp(1.35rem, 1.9vw, 2.1rem)',
                          lineHeight: 1.35,
                          maxWidth: '26rem',
                          marginTop: '1.5rem',
                        }}
                      >
                        {primary}
                      </p>
                      {support ? (
                        <p
                          className="text-oriana-muted"
                          style={{
                            fontSize: 'clamp(0.95rem, 1.05vw, 1.05rem)',
                            lineHeight: 1.65,
                            marginTop: '1rem',
                            maxWidth: '26rem',
                          }}
                        >
                          {support}
                        </p>
                      ) : null}

                      {card.href ? (
                        <Link
                          href={card.href}
                          tabIndex={i === 0 ? 0 : -1}
                          className="inline-flex w-fit items-center justify-center border border-oriana-blue font-medium text-oriana-blue transition hover:bg-oriana-blue hover:text-white"
                          style={{
                            marginTop: '2.25rem',
                            minWidth: '11.5rem',
                            padding: '0.85rem 1.85rem',
                            borderRadius: '0.8rem',
                            fontSize: '0.9rem',
                          }}
                        >
                          {card.ctaLabel || 'Explore more'}
                        </Link>
                      ) : null}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Image stack — top panel slides up; base image stays put and stays visible */}
            <div className="relative order-1 h-full min-h-0 overflow-hidden bg-oriana-silver lg:order-2">
              {cards.map((card, i) => (
                <div
                  key={card.id}
                  ref={(node) => {
                    layerRefs.current[i] = node
                  }}
                  className="absolute inset-0"
                  style={{
                    zIndex: cards.length - i,
                    transform: 'translate3d(0, 0, 0)',
                    willChange: 'transform',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.image}
                    alt={card.alt || card.label}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading={i === 0 ? 'eager' : 'lazy'}
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
