'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

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

const TRACK_GUTTER = 'max(1rem, 5vw)'

export function WhyChooseOrianaSection({
  title = 'Why Choose Oriana Inverters?',
  body = 'Oriana Inverters brings together advanced power electronics, intelligent technology, and precision engineering to deliver reliable solar power solutions for homes, businesses, and large-scale applications.',
  cards,
  ariaLabel = 'Why choose Oriana',
  className = '',
}: WhyChooseOrianaSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [translateX, setTranslateX] = useState(0)

  useEffect(() => {
    if (!cards.length) return

    const getMaxTranslate = () => {
      const track = trackRef.current
      const viewport = viewportRef.current
      if (!track || !viewport) return 0
      return Math.max(0, track.scrollWidth - viewport.clientWidth)
    }

    const updateScroll = () => {
      const section = sectionRef.current
      if (!section) return

      const max = getMaxTranslate()
      const vh = window.innerHeight
      const rect = section.getBoundingClientRect()
      const scrollSpan = Math.max(section.offsetHeight - vh, 1)
      const scrolled = Math.min(Math.max(-rect.top, 0), scrollSpan)
      const ratio = scrolled / scrollSpan
      setTranslateX(ratio * max)
    }

    updateScroll()
    window.addEventListener('scroll', updateScroll, { passive: true })
    window.addEventListener('resize', updateScroll)
    return () => {
      window.removeEventListener('scroll', updateScroll)
      window.removeEventListener('resize', updateScroll)
    }
  }, [cards])

  if (!cards.length) return null

  const runwayVh = Math.max(cards.length * 55, 220)

  return (
    <section
      ref={sectionRef}
      className={`relative bg-white ${className}`.trim()}
      style={{ height: `${runwayVh}svh` }}
      aria-label={ariaLabel}
    >
      <div
        className="sticky top-0 flex min-h-[100svh] flex-col overflow-hidden"
        style={{ height: '100svh' }}
      >
        <div className="container shrink-0 pt-16 sm:pt-20 lg:pt-24">
          <div className="max-w-4xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-oriana-navy md:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-oriana-muted md:text-lg">
              {body}
            </p>
          </div>
        </div>

        <div
          ref={viewportRef}
          className="relative mt-10 min-h-0 flex-1 overflow-hidden sm:mt-12"
        >
          <div
            ref={trackRef}
            className="flex w-max items-stretch"
            style={{
              gap: '30px',
              paddingLeft: TRACK_GUTTER,
              paddingRight: TRACK_GUTTER,
              transform: `translateX(-${translateX}px)`,
              transition: 'transform 0.12s linear',
              willChange: 'transform',
            }}
          >
            {cards.map((card) => (
              <article
                key={card.id}
                className="relative shrink-0 overflow-hidden"
                style={{
                  width: 'min(700px, 85vw)',
                  height: 'min(540px, 58svh)',
                  borderRadius: 30,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.image}
                  alt={card.alt || card.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-oriana-navy/85 via-oriana-navy/25 to-oriana-navy/10"
                  aria-hidden
                />

                <div
                  className="relative flex h-full flex-col justify-start text-white"
                  style={{ padding: 'clamp(1.75rem, 4vw, 3.75rem)' }}
                >
                  <h3
                    className="max-w-md font-display font-medium leading-tight"
                    style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)' }}
                  >
                    {card.title}
                  </h3>
                  {card.href ? (
                    <div className="mt-8">
                      <Link
                        href={card.href}
                        className="inline-flex items-center justify-center rounded-full border border-oriana-blue bg-oriana-blue px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-oriana-navy hover:border-oriana-navy sm:text-base"
                      >
                        {card.ctaLabel || 'Explore more'}
                      </Link>
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
