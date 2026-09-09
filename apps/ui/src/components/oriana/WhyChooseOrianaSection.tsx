'use client'

import Link from 'next/link'
import { useEffect, useRef, type RefObject } from 'react'
import { useReducedMotion } from 'framer-motion'

import { GrowingAccentLine } from './GrowingAccentLine'
import { ScrollRevealText } from './ScrollRevealText'
import {
  readSiteHeaderHeightPx,
  STICKY_BELOW_NAV_HEIGHT,
  STICKY_BELOW_NAV_TOP,
  useStickyScrub,
} from './useStickyScrub'

export type WhyChooseCard = {
  id: string
  title: string
  image: string
  alt?: string
  href?: string
  ctaLabel?: string
}

export type WhyChooseOrianaSectionProps = {
  title?: string
  body?: string
  cards: WhyChooseCard[]
  ariaLabel?: string
  className?: string
}

const TRACK_GUTTER = 'max(1rem, 4vw)'
const CARD_RADIUS = 24

/**
 * Sungrow "Our Commitment to Innovation and Excellence" pattern:
 * - all viewports: sticky full viewport; scroll drives horizontal translateX
 * - reduced-motion: normal flow + horizontal scroll-snap (avoids motion)
 * - title + GrowingAccentLine + ScrollRevealText (same as Introduction)
 * @see https://www.sungrowpower.com/en
 */
function clamp01(n: number) {
  return Math.min(1, Math.max(0, n))
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / Math.max(edge1 - edge0, 1e-6))
  return t * t * (3 - 2 * t)
}

function WhyChooseCardFace({ card }: { card: WhyChooseCard }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={card.image}
        alt={card.alt || card.title}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        draggable={false}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-oriana-deep/85 via-oriana-deep/25 to-oriana-deep/10"
        aria-hidden
      />
      <div
        className="relative flex h-full flex-col justify-start text-center text-white lg:text-left"
        style={{ padding: 'clamp(1rem, 2.5vw, 2.25rem)' }}
      >
        <h3
          className="mx-auto max-w-sm font-display font-medium leading-tight lg:mx-0"
          style={{ fontSize: 'clamp(1.1rem, 2vw, 1.85rem)' }}
        >
          {card.title}
        </h3>
        {card.href ? (
          <div className="mt-4 flex justify-center lg:mt-5 lg:justify-start">
            <Link
              href={card.href}
              className="inline-flex min-h-10 items-center justify-center rounded-full border border-oriana-blue bg-oriana-blue px-6 py-2 text-sm font-semibold text-white transition hover:border-oriana-deep hover:bg-oriana-deep sm:min-h-11 sm:px-7 sm:py-2.5"
              style={{ minWidth: '10.5rem' }}
            >
              {card.ctaLabel || 'Explore more'}
            </Link>
          </div>
        ) : null}
      </div>
    </>
  )
}

function SectionIntro({
  title,
  body,
  sectionRef,
  reduceMotion,
  textProgressRef,
  compact,
}: {
  title: string
  body: string
  sectionRef: RefObject<HTMLElement | null>
  reduceMotion: boolean
  textProgressRef?: RefObject<number>
  /** Sticky pin: shorter accent + tighter so cards fit the viewport. */
  compact?: boolean
}) {
  return (
    <div className="relative z-20 w-full shrink-0 bg-white">
      <div className="container">
        <div className="mx-auto w-full max-w-4xl text-center">
          <h2
            className="font-display font-medium leading-snug tracking-tight"
            style={{
              color: '#606060',
              fontSize: compact
                ? 'clamp(1.35rem, 2.6vw, 2.35rem)'
                : 'clamp(1.75rem, 3vw, 2.75rem)',
            }}
          >
            {title}
          </h2>

          <GrowingAccentLine
            sectionRef={sectionRef}
            reduceMotion={reduceMotion}
            size={compact ? 'fluid' : 'default'}
            className={compact ? 'mt-3 sm:mt-4' : 'mt-8 lg:mt-10'}
            progress={reduceMotion ? 1 : undefined}
          />

          {reduceMotion ? (
            <p
              className="mx-auto mt-3 font-medium leading-relaxed text-[#606060] sm:mt-4"
              style={{
                maxWidth: '56rem',
                fontSize: compact
                  ? 'clamp(0.9rem, 1.35vw, 1.2rem)'
                  : 'clamp(1rem, 1.55vw, 1.4rem)',
              }}
            >
              {body}
            </p>
          ) : (
            <ScrollRevealText
              text={body}
              reduceMotion={false}
              progressRef={textProgressRef}
              className="mx-auto mt-3 font-medium leading-relaxed sm:mt-4"
              style={{
                maxWidth: '56rem',
                fontSize: compact
                  ? 'clamp(0.9rem, 1.35vw, 1.2rem)'
                  : 'clamp(1rem, 1.55vw, 1.4rem)',
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

function CardsScrollSnap({ cards }: { cards: WhyChooseCard[] }) {
  return (
    <div
      className="mt-8 flex gap-4 overflow-x-auto overscroll-x-contain px-[max(1rem,5vw)] pb-3 sm:gap-6 sm:px-[max(1.5rem,6vw)]"
      data-lenis-prevent
      style={{
        scrollSnapType: 'x mandatory',
        WebkitOverflowScrolling: 'touch',
        touchAction: 'pan-x pinch-zoom',
      }}
    >
      {cards.map((card) => (
        <article
          key={card.id}
          className="relative shrink-0 overflow-hidden"
          style={{
            width: 'min(551px, 85vw)',
            height: 'max(280px, min(400px, 58svh))',
            borderRadius: CARD_RADIUS,
            scrollSnapAlign: 'center',
          }}
        >
          <WhyChooseCardFace card={card} />
        </article>
      ))}
    </div>
  )
}

export function WhyChooseOrianaSection({
  title = 'Why Choose Oriana Inverters?',
  body = 'Oriana Inverters brings together advanced power electronics, intelligent technology, and precision engineering to deliver reliable solar power solutions for homes, businesses, and large-scale applications.',
  cards,
  ariaLabel = 'Why choose Oriana',
  className = '',
}: WhyChooseOrianaSectionProps) {
  const reduceMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const targetRatio = useRef(0)
  /** Finishes Introduction-style char reveal once the sticky pin freezes layout */
  const textProgressRef = useRef(0)
  const useStickyLayout = useStickyScrub()

  useEffect(() => {
    if (!cards.length || reduceMotion || !useStickyLayout) return

    const getMaxTranslate = () => {
      const track = trackRef.current
      const viewport = viewportRef.current
      if (!track || !viewport) return 0
      return Math.max(0, track.scrollWidth - viewport.clientWidth)
    }

    const readRatio = () => {
      const section = sectionRef.current
      if (!section) return 0
      const headerH = readSiteHeaderHeightPx()
      const pinHeight = Math.max(window.innerHeight - headerH, 1)
      const rect = section.getBoundingClientRect()
      const scrollSpan = Math.max(section.offsetHeight - pinHeight, 1)
      // 0 while the heading is still approaching the nav; effect starts once pinned below it
      return Math.min(Math.max(headerH - rect.top, 0), scrollSpan) / scrollSpan
    }

    let raf = 0
    let current = 0
    let running = true

    const onResize = () => {
      targetRatio.current = readRatio()
    }

    const tick = () => {
      if (!running) return
      targetRatio.current = readRatio()
      current += (targetRatio.current - current) * 0.12
      if (Math.abs(targetRatio.current - current) < 0.00015) current = targetRatio.current

      textProgressRef.current = smoothstep(0, 0.08, current)

      const max = getMaxTranslate()
      const scrub = smoothstep(0.02, 0.98, current)
      const track = trackRef.current
      if (track) {
        track.style.transform = `translate3d(-${scrub * max}px, 0, 0)`
      }
      raf = window.requestAnimationFrame(tick)
    }

    raf = window.requestAnimationFrame(tick)
    window.addEventListener('resize', onResize)

    return () => {
      running = false
      window.cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [cards, reduceMotion, useStickyLayout])

  if (!cards.length) return null

  // Compact / reduced-motion: full cards in normal flow (no sticky clip)
  if (reduceMotion || !useStickyLayout) {
    return (
      <section
        ref={sectionRef}
        className={`relative bg-white py-14 lg:py-16 ${className}`.trim()}
        aria-label={ariaLabel}
      >
        <SectionIntro
          title={title}
          body={body}
          sectionRef={sectionRef}
          reduceMotion
        />
        <CardsScrollSnap cards={cards} />
      </section>
    )
  }

  // Desktop sticky scrub — scale runway with card count
  const runwayVh = Math.max(280, 80 + cards.length * 55)

  return (
    <section
      ref={sectionRef}
      className={`relative bg-white ${className}`.trim()}
      style={{ height: `${runwayVh}svh` }}
      aria-label={ariaLabel}
    >
      <div
        className="sticky z-10 flex flex-col overflow-hidden bg-white"
        style={{
          top: STICKY_BELOW_NAV_TOP,
          height: STICKY_BELOW_NAV_HEIGHT,
          maxHeight: STICKY_BELOW_NAV_HEIGHT,
          paddingTop: '0.5rem',
          paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom, 0px))',
          gap: 'clamp(0.5rem, 1.2svh, 1rem)',
        }}
      >
        <SectionIntro
          title={title}
          body={body}
          sectionRef={sectionRef}
          reduceMotion={false}
          textProgressRef={textProgressRef}
          compact
        />

        {/* Remaining sticky height only — no min-height / justify-center (those overlapped the copy). */}
        <div className="relative z-10 flex min-h-0 w-full flex-1 flex-col pt-1">
          <div ref={viewportRef} className="relative h-full min-h-0 w-full flex-1 overflow-hidden">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 sm:w-12"
              style={{
                background: 'linear-gradient(90deg, #fff 0%, rgba(255,255,255,0) 100%)',
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 sm:w-12"
              style={{
                background: 'linear-gradient(270deg, #fff 0%, rgba(255,255,255,0) 100%)',
              }}
            />

            <div
              ref={trackRef}
              className="flex h-full w-max items-stretch"
              style={{
                gap: 'clamp(0.75rem, 1.5vw, 1.5rem)',
                paddingLeft: TRACK_GUTTER,
                paddingRight: TRACK_GUTTER,
                transform: 'translate3d(0, 0, 0)',
                willChange: 'transform',
              }}
            >
              {cards.map((card) => (
                <article
                  key={card.id}
                  className="relative h-full shrink-0 overflow-hidden"
                  style={{
                    width: 'clamp(14rem, 58vw, 34.4rem)',
                    borderRadius: CARD_RADIUS,
                    isolation: 'isolate',
                  }}
                >
                  <WhyChooseCardFace card={card} />
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
