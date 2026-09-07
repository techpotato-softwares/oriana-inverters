'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
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

/**
 * Sungrow "Our Commitment to Innovation and Excellence" pattern:
 * - sticky full viewport, vertically centered
 * - title + GrowingAccentLine + ScrollRevealText (same as Introduction)
 * - cards always visible; scroll only drives horizontal translateX
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
        className="relative flex h-full flex-col justify-start text-white"
        style={{ padding: 'clamp(1.25rem, 3vw, 2.25rem)' }}
      >
        <h3
          className="max-w-sm font-display font-medium leading-tight"
          style={{ fontSize: 'clamp(1.25rem, 2vw, 1.85rem)' }}
        >
          {card.title}
        </h3>
        {card.href ? (
          <div className="mt-5">
            <Link
              href={card.href}
              className="inline-flex items-center justify-center rounded-full border border-oriana-blue bg-oriana-blue px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-oriana-deep hover:border-oriana-deep"
            >
              {card.ctaLabel || 'Explore more'}
            </Link>
          </div>
        ) : null}
      </div>
    </>
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

  useEffect(() => {
    if (!cards.length || reduceMotion) return

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

    const tick = () => {
      if (!running) return
      targetRatio.current = readRatio()
      // Soft follow (works with Lenis) — card scrub only
      current += (targetRatio.current - current) * 0.12
      if (Math.abs(targetRatio.current - current) < 0.00015) current = targetRatio.current

      // Sticky freezes viewport mid-reveal — finish chars in the first ~8% of the pin
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
    window.addEventListener('resize', () => {
      targetRatio.current = readRatio()
    })

    return () => {
      running = false
      window.cancelAnimationFrame(raf)
    }
  }, [cards, reduceMotion])

  if (!cards.length) return null

  // Sungrow Commitment runway ≈ 4.5× viewport for 4 cards → scale with count
  const runwayVh = Math.max(280, 80 + cards.length * 55)

  if (reduceMotion) {
    return (
      <section
        ref={sectionRef}
        className={`relative bg-white py-14 lg:py-16 ${className}`.trim()}
        aria-label={ariaLabel}
      >
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h2
              className="font-display font-semibold tracking-tight"
              style={{ color: '#606060', fontSize: 'clamp(1.85rem, 3.2vw, 3rem)' }}
            >
              {title}
            </h2>
            <GrowingAccentLine
              sectionRef={sectionRef}
              reduceMotion
              className="mt-10"
              progress={1}
            />
            <p
              className="mx-auto mt-4 font-medium leading-relaxed text-[#606060]"
              style={{ maxWidth: '56rem', fontSize: 'clamp(1rem, 1.55vw, 1.4rem)' }}
            >
              {body}
            </p>
          </div>
        </div>
        <div
          className="mt-10 flex gap-6 overflow-x-auto px-[max(1.5rem,6vw)] pb-2"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {cards.map((card) => (
            <article
              key={card.id}
              className="relative shrink-0 overflow-hidden"
              style={{
                width: 'min(551px, 78vw)',
                height: 'min(425px, 52svh)',
                borderRadius: 24,
                scrollSnapAlign: 'start',
              }}
            >
              <WhyChooseCardFace card={card} />
            </article>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      className={`relative bg-white ${className}`.trim()}
      style={{ height: `${runwayVh}svh`, marginTop: 0, marginBottom: 0 }}
      aria-label={ariaLabel}
    >
      {/* Sungrow: sticky top-0 flex flex-col justify-center h-dvh overflow-hidden */}
      <div
        className="sticky top-0 z-10 flex h-[100svh] flex-col justify-center overflow-hidden bg-white"
        style={{
          gap: 'clamp(1.25rem, 3.5vw, 2.75rem)',
          paddingTop: 'calc(4.5rem + env(safe-area-inset-top, 0px))',
          paddingBottom: '1.5rem',
        }}
      >
        <div className="w-full shrink-0">
          <div className="container">
            <div className="mx-auto w-full max-w-4xl text-center">
              <h2
                className="font-display font-medium leading-snug tracking-tight"
                style={{ color: '#606060', fontSize: 'clamp(1.75rem, 3vw, 2.75rem)' }}
              >
                {title}
              </h2>

              {/* Same GrowingAccentLine + ScrollRevealText as Introduction */}
              <GrowingAccentLine
                sectionRef={sectionRef}
                reduceMotion={!!reduceMotion}
                className="mt-10"
              />

              <ScrollRevealText
                text={body}
                reduceMotion={!!reduceMotion}
                progressRef={textProgressRef}
                className="mx-auto font-medium leading-relaxed"
                style={{
                  maxWidth: '56rem',
                  fontSize: 'clamp(1rem, 1.55vw, 1.4rem)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Cards always visible — only motion is horizontal scrub */}
        <div className="relative w-full shrink-0">
          <div
            ref={viewportRef}
            className="relative w-full overflow-hidden"
            style={{ height: 'min(420px, 48svh)' }}
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
                    width: 'min(551px, 78vw)',
                    borderRadius: 24,
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
