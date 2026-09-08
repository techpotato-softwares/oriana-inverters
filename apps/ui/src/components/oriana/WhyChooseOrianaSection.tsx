'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, type RefObject } from 'react'
import { useReducedMotion } from 'framer-motion'

import { GrowingAccentLine } from './GrowingAccentLine'
import { ScrollRevealText } from './ScrollRevealText'

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

const TRACK_GUTTER = 'max(1.5rem, 6vw)'
const CARD_RADIUS = 24
/** Sticky horizontal scrub needs room; below this use scroll-snap instead. */
const STICKY_MIN_WIDTH = 1024
const STICKY_MIN_HEIGHT = 820
/** Floor so sticky cards never collapse into thin strips on short viewports. */
const STICKY_CARD_MIN_HEIGHT = 'min(320px, 45svh)'

/**
 * Sungrow "Our Commitment to Innovation and Excellence" pattern:
 * - desktop: sticky full viewport; scroll drives horizontal translateX
 * - compact: normal flow + horizontal scroll-snap (avoids clipped cards)
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
        style={{ padding: 'clamp(1.25rem, 3vw, 2.25rem)' }}
      >
        <h3
          className="mx-auto max-w-sm font-display font-medium leading-tight lg:mx-0"
          style={{ fontSize: 'clamp(1.25rem, 2vw, 1.85rem)' }}
        >
          {card.title}
        </h3>
        {card.href ? (
          <div className="mt-5 flex justify-center lg:justify-start">
            <Link
              href={card.href}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-oriana-blue bg-oriana-blue px-7 py-2.5 text-sm font-semibold text-white transition hover:border-oriana-deep hover:bg-oriana-deep"
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
}: {
  title: string
  body: string
  sectionRef: RefObject<HTMLElement | null>
  reduceMotion: boolean
  textProgressRef?: RefObject<number>
}) {
  return (
    <div className="w-full shrink-0">
      <div className="container">
        <div className="mx-auto w-full max-w-4xl text-center">
          <h2
            className="font-display font-medium leading-snug tracking-tight"
            style={{ color: '#606060', fontSize: 'clamp(1.75rem, 3vw, 2.75rem)' }}
          >
            {title}
          </h2>

          <GrowingAccentLine
            sectionRef={sectionRef}
            reduceMotion={reduceMotion}
            className="mt-8 lg:mt-10"
            progress={reduceMotion ? 1 : undefined}
          />

          {reduceMotion ? (
            <p
              className="mx-auto mt-4 font-medium leading-relaxed text-[#606060]"
              style={{ maxWidth: '56rem', fontSize: 'clamp(1rem, 1.55vw, 1.4rem)' }}
            >
              {body}
            </p>
          ) : (
            <ScrollRevealText
              text={body}
              reduceMotion={false}
              progressRef={textProgressRef}
              className="mx-auto font-medium leading-relaxed"
              style={{
                maxWidth: '56rem',
                fontSize: 'clamp(1rem, 1.55vw, 1.4rem)',
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
  const [useStickyScrub, setUseStickyScrub] = useState(false)

  useEffect(() => {
    const widthMq = window.matchMedia(`(min-width: ${STICKY_MIN_WIDTH}px)`)
    const heightMq = window.matchMedia(`(min-height: ${STICKY_MIN_HEIGHT}px)`)
    const sync = () => setUseStickyScrub(widthMq.matches && heightMq.matches)
    sync()
    widthMq.addEventListener('change', sync)
    heightMq.addEventListener('change', sync)
    return () => {
      widthMq.removeEventListener('change', sync)
      heightMq.removeEventListener('change', sync)
    }
  }, [])

  useEffect(() => {
    if (!cards.length || reduceMotion || !useStickyScrub) return

    const getMaxTranslate = () => {
      const track = trackRef.current
      const viewport = viewportRef.current
      if (!track || !viewport) return 0
      return Math.max(0, track.scrollWidth - viewport.clientWidth)
    }

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
  }, [cards, reduceMotion, useStickyScrub])

  if (!cards.length) return null

  // Compact / reduced-motion: full cards in normal flow (no sticky clip)
  if (reduceMotion || !useStickyScrub) {
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
        className="sticky top-0 z-10 flex h-[100svh] max-h-[100svh] flex-col overflow-hidden bg-white"
        style={{
          paddingTop: 'calc(4.5rem + env(safe-area-inset-top, 0px))',
          paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom, 0px))',
          gap: 'clamp(1rem, 2vw, 1.75rem)',
        }}
      >
        <SectionIntro
          title={title}
          body={body}
          sectionRef={sectionRef}
          reduceMotion={false}
          textProgressRef={textProgressRef}
        />

        {/* flex-1 + min-h-0 keeps cards inside the sticky viewport (fixes clipped bottoms / square corners) */}
        <div className="relative flex min-h-0 w-full flex-1 flex-col justify-center py-1">
          <div
            ref={viewportRef}
            className="relative w-full overflow-hidden"
            style={{
              height: 'min(420px, 100%)',
              minHeight: STICKY_CARD_MIN_HEIGHT,
              maxHeight: '100%',
            }}
          >
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
                gap: '1.5rem',
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
                    width: 'min(551px, 42vw)',
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
