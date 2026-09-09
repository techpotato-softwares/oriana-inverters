'use client'

import Link from 'next/link'
import { useEffect, useRef, type RefObject } from 'react'
import { useReducedMotion } from 'framer-motion'

import { GrowingAccentLine } from './GrowingAccentLine'
import {
  readSiteHeaderHeightPx,
  STICKY_BELOW_NAV_HEIGHT,
  STICKY_BELOW_NAV_TOP,
  useStickyScrub,
} from './useStickyScrub'

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

/** Sticky pin runway: lift beats + short hold so the card can unpin and scroll away. */
const LIFT_VH_PER_CARD = 90
const EXIT_HOLD_VH = 40
const CARD_RADIUS = 40

function CompactVisionCards({
  title,
  cards,
  sectionRef,
  ariaLabel,
  className,
}: {
  title?: string
  cards: VisionMissionCard[]
  sectionRef: RefObject<HTMLElement | null>
  ariaLabel: string
  className: string
}) {
  return (
    <section
      ref={sectionRef}
      className={`relative bg-white py-14 lg:py-16 ${className}`.trim()}
      aria-label={ariaLabel}
    >
      <div className="container">
        {title ? (
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <h2 className="font-display text-3xl font-semibold text-[#606060] md:text-4xl lg:text-5xl">
              {title}
            </h2>
            <GrowingAccentLine reduceMotion size="heading" className="mt-3" progress={1} />
          </div>
        ) : null}
        <div className="grid gap-4 lg:grid-cols-2">
          {cards.map((card) => {
            const primary = card.headline || card.body
            const support = card.headline && card.body ? card.body : null
            return (
              <article key={card.id} className="overflow-hidden rounded-[2rem] border border-black/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.image}
                  alt={card.alt || card.label}
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="p-6 text-center sm:p-8 sm:text-left">
                  <p className="font-display text-[#8a8a8a]">{card.label}</p>
                  {primary ? (
                    <p className="mt-4 font-display text-xl text-[#606060]">{primary}</p>
                  ) : null}
                  {support ? (
                    <p className="mt-3 text-sm leading-relaxed text-oriana-muted">{support}</p>
                  ) : null}
                  {card.href ? (
                    <Link
                      href={card.href}
                      className="mt-6 inline-flex min-h-11 items-center justify-center border border-oriana-blue bg-white px-7 py-3 text-center text-sm font-semibold text-oriana-blue transition hover:bg-oriana-blue hover:text-white"
                      style={{ borderRadius: '0.8rem', minWidth: '10.5rem' }}
                    >
                      {card.ctaLabel || 'Explore more'}
                    </Link>
                  ) : null}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/**
 * Sticky split cards — Sungrow “Greener Tomorrow” stack:
 * top image slides up as a panel; next image is visible underneath the whole time.
 * After the last lift, the sticky card unpins and scrolls up before the next section.
 * Compact / short viewports use a stacked card grid (same content).
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
  const useStickyLayout = useStickyScrub()

  const liftVh = Math.max(cards.length - 1, 1) * LIFT_VH_PER_CARD
  const runwayVh = 100 + liftVh + EXIT_HOLD_VH

  useEffect(() => {
    if (!cards.length || reduceMotion || !useStickyLayout) return

    const readRatio = () => {
      const section = sectionRef.current
      if (!section) return 0
      const headerH = readSiteHeaderHeightPx()
      const pinHeight = Math.max(window.innerHeight - headerH, 1)
      const rect = section.getBoundingClientRect()
      const scrollSpan = Math.max(section.offsetHeight - pinHeight, 1)
      // 0 while the heading is still approaching the nav; effect starts once pinned below it
      const scrolled = Math.min(Math.max(headerH - rect.top, 0), scrollSpan)
      // Map only the lift portion — exit hold keeps last card fully visible while unpin starts
      const liftSpan = Math.max(scrollSpan * (liftVh / (liftVh + EXIT_HOLD_VH)), 1)
      return clamp01(scrolled / liftSpan)
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
  }, [cards, reduceMotion, useStickyLayout, liftVh])

  if (!cards.length) return null

  if (reduceMotion || !useStickyLayout) {
    return (
      <CompactVisionCards
        title={title}
        cards={cards}
        sectionRef={sectionRef}
        ariaLabel={ariaLabel}
        className={className}
      />
    )
  }

  return (
    <section
      ref={sectionRef}
      className={`relative bg-white ${className}`.trim()}
      style={{
        height: `${runwayVh}svh`,
        marginTop: '1.5rem',
        // Small breathing room before Our Impact (no negative overlap)
        marginBottom: '1.25rem',
      }}
      aria-label={ariaLabel}
    >
      <div
        className="sticky z-10 flex flex-col overflow-hidden bg-white"
        style={{
          top: STICKY_BELOW_NAV_TOP,
          height: STICKY_BELOW_NAV_HEIGHT,
          maxHeight: STICKY_BELOW_NAV_HEIGHT,
        }}
      >
        <div
          className="flex shrink-0 flex-col items-center px-4"
          style={{ paddingTop: '0.75rem' }}
        >
          {title ? (
            <>
              <h2 className="text-center font-display text-3xl font-semibold text-[#606060] md:text-4xl lg:text-5xl">
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
              borderRadius: CARD_RADIUS,
              border: '1px solid rgba(7, 21, 37, 0.06)',
            }}
          >
            {/* Copy panel — scrollable so Explore stays reachable on constrained heights */}
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
                    className="absolute inset-0 box-border min-h-0 overflow-y-auto overscroll-contain"
                    style={{
                      opacity: i === 0 ? 1 : 0,
                      zIndex: i === 0 ? 2 : 1,
                      pointerEvents: i === 0 ? 'auto' : 'none',
                      transform: 'translateY(0px)',
                      willChange: 'opacity, transform',
                      // Inset past 40px radius so text/CTA never merge into clipped corners
                      padding:
                        'max(1.5rem, min(2.5rem, 3.5vw)) max(1.5rem, min(3.5rem, 4.2vw)) max(1.75rem, min(2.5rem, 3.5vw))',
                    }}
                    aria-hidden={i !== 0}
                  >
                    <div className="flex min-h-full w-full max-w-lg flex-col justify-center py-1">
                      <div className="shrink-0">
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
                          fontSize: 'clamp(1.2rem, 1.7vw, 2.1rem)',
                          lineHeight: 1.35,
                          maxWidth: '26rem',
                          marginTop: 'clamp(0.85rem, 1.5vw, 1.5rem)',
                        }}
                      >
                        {primary}
                      </p>
                      {support ? (
                        <p
                          className="text-oriana-muted"
                          style={{
                            fontSize: 'clamp(0.9rem, 1.05vw, 1.05rem)',
                            lineHeight: 1.65,
                            marginTop: 'clamp(0.65rem, 1vw, 1rem)',
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
                          className="inline-flex w-fit shrink-0 items-center justify-center border border-oriana-blue font-medium text-oriana-blue transition hover:bg-oriana-blue hover:text-white"
                          style={{
                            marginTop: 'clamp(1.25rem, 2vw, 2.25rem)',
                            marginBottom: '0.25rem',
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
