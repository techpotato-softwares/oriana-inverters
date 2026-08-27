'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

type PeekCard = {
  id: string
  label: string
  title: string
  description: string
  href: string
  image: string
  /** Present on video cards only */
  video?: string
  accent: string
}

/** Static peek-stack cards — 2 stills + 2 videos. CMS wiring later. */
const PEEK_CARDS: PeekCard[] = [
  {
    id: 'homes',
    label: '01 — Residential',
    title: 'Homes that store the sun',
    description:
      'Hybrid inverters and compact storage for households that want quiet backup and simple monitoring.',
    href: '/solutions/residential',
    image:
      'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1920&q=80',
    accent: '#4da3ff',
  },
  {
    id: 'business',
    label: '02 — Commercial',
    title: 'Rooftops that pay back',
    description:
      'Three-phase platforms for factories and campuses — built for uptime, yield, and clear O&M.',
    href: '/solutions/commercial',
    image:
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1920&q=80',
    accent: '#1a428a',
  },
  {
    id: 'utility',
    label: '03 — Utility',
    title: 'Utility-scale clarity',
    description:
      'String and central architectures for parks that need bankable performance and live visibility.',
    href: '/solutions/utility',
    image:
      'https://images.unsplash.com/photo-1466611653911-950815379e85?auto=format&fit=crop&w=1920&q=80',
    video: 'https://videos.pexels.com/video-files/2491284/2491284-hd_1920_1080_25fps.mp4',
    accent: '#f5b942',
  },
  {
    id: 'storage',
    label: '04 — Storage',
    title: 'Energy when the grid sleeps',
    description:
      'Battery-ready hybrids that keep critical loads online through outages and peak tariffs.',
    href: '/solutions/residential',
    image:
      'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1920&q=80',
    video: 'https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4',
    accent: '#4da3ff',
  },
]

function CardMedia({ card }: { card: PeekCard }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !card.video) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return
    video.play().catch(() => {})
  }, [card.video])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={card.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
      {card.video ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={card.video}
          muted
          loop
          playsInline
          preload="metadata"
          poster={card.image}
          aria-hidden
        />
      ) : null}
      <div className="absolute inset-0 bg-oriana-navy/45" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-oriana-navy via-oriana-navy/50 to-transparent"
        aria-hidden
      />
    </div>
  )
}

/**
 * Full-viewport peek stack — sticky cards with scale/offset as the next covers the previous.
 * Static content only (no CMS).
 */
export function PeekStackSection() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-peek-card]'))
    const inners = Array.from(root.querySelectorAll<HTMLElement>('[data-peek-inner]'))
    if (!cards.length) return

    let frame = 0
    const update = () => {
      const vh = window.innerHeight
      cards.forEach((card, i) => {
        const inner = inners[i]
        if (!inner) return
        const next = cards[i + 1]
        if (!next) {
          inner.style.transform = 'scale(1) translateY(0px)'
          return
        }
        const nextTop = next.getBoundingClientRect().top
        const progress = Math.min(1, Math.max(0, 1 - nextTop / vh))
        const scale = 1 - progress * 0.08
        const y = progress * -28
        inner.style.transform = `scale(${scale}) translateY(${y}px)`
      })
      frame = requestAnimationFrame(update)
    }
    frame = requestAnimationFrame(update)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <section className="bg-oriana-navy" aria-label="Solution highlights">
      <div className="mx-auto max-w-3xl px-4 pb-6 pt-16 text-center sm:px-6 lg:pt-20">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-oriana-sky">
          Solution journeys
        </p>
        <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Scroll the path from rooftop to grid
        </h2>
        <p className="mt-4 text-base leading-relaxed text-white/60 md:text-lg">
          Four full-screen stories — two stills, two films — stacked as you scroll.
        </p>
      </div>

      <div ref={rootRef} className="relative">
        {PEEK_CARDS.map((card, i) => (
          <article
            key={card.id}
            data-peek-card
            className="sticky top-0 flex h-[100svh] w-full items-stretch justify-center overflow-hidden px-3 py-5 sm:px-8 sm:py-8"
            style={{ zIndex: i + 1 }}
          >
            <div
              data-peek-inner
              className="relative h-full w-full origin-top overflow-hidden rounded-2xl will-change-transform"
              style={{
                boxShadow: '0 24px 80px rgba(0,0,0,0.45)',
                transform: 'scale(1) translateY(0px)',
              }}
            >
              <CardMedia card={card} />
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/15"
                aria-hidden
              />
              <div className="relative z-10 flex h-full max-w-xl flex-col justify-end px-6 pb-14 pt-24 sm:px-10 lg:px-14 lg:pb-20">
                <p className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: card.accent }}>
                  {card.label}
                </p>
                <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {card.title}
                </h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-white/75 sm:text-lg">
                  {card.description}
                </p>
                <Link
                  href={card.href}
                  className="mt-8 inline-flex w-fit items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold text-oriana-navy transition hover:brightness-110"
                  style={{ backgroundColor: card.accent }}
                >
                  Explore
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="h-[30vh] bg-oriana-navy" aria-hidden />
    </section>
  )
}
