'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

export type PeekStackImage = {
  id: string
  image: string
  /** Optional accessible alt text */
  alt?: string
  /** Optional bottom-left label */
  title?: string
  /** Optional link when title is set */
  href?: string
}

export type PeekStackImagesProps = {
  images: PeekStackImage[]
  /** Section accessible name */
  ariaLabel?: string
  className?: string
}

/**
 * Generic full-viewport image peek stack (sticky cover-on-scroll).
 * White section background; panels are image-only with optional title/link.
 */
export function PeekStackImages({
  images,
  ariaLabel = 'Image stack',
  className = '',
}: PeekStackImagesProps) {
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
      cards.forEach((_card, i) => {
        const inner = inners[i]
        if (!inner) return
        const next = cards[i + 1]
        if (!next) {
          inner.style.transform = 'scale(1)'
          return
        }
        const nextTop = next.getBoundingClientRect().top
        const progress = Math.min(1, Math.max(0, 1 - nextTop / vh))
        const scale = 1 - progress * 0.05
        inner.style.transform = `scale(${scale})`
      })
      frame = requestAnimationFrame(update)
    }
    frame = requestAnimationFrame(update)
    return () => cancelAnimationFrame(frame)
  }, [images])

  if (!images.length) return null

  return (
    <section className={`bg-white ${className}`.trim()} aria-label={ariaLabel}>
      <div ref={rootRef} className="relative">
        {images.map((item, i) => (
          <article
            key={item.id}
            data-peek-card
            className="sticky top-0 flex min-h-[100svh] w-full items-stretch overflow-hidden p-4"
            style={{ zIndex: i + 1, height: '100svh' }}
          >
            <div
              data-peek-inner
              className="relative h-full w-full origin-center overflow-hidden will-change-transform"
              style={{ transform: 'scale(1)', borderRadius: 25 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.alt || ''}
                className="absolute inset-0 h-full w-full object-cover"
                loading={i === 0 ? 'eager' : 'lazy'}
              />

              {item.title ? (
                <>
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"
                    aria-hidden
                  />
                  <div className="relative z-10 flex h-full items-end px-8 pb-16 sm:px-12 lg:px-16 lg:pb-20">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="group inline-flex items-center gap-3 font-display text-3xl font-semibold text-white sm:text-4xl lg:text-5xl"
                      >
                        {item.title}
                        <span className="text-oriana-sky transition group-hover:translate-x-1" aria-hidden>
                          ›
                        </span>
                      </Link>
                    ) : (
                      <p className="font-display text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
                        {item.title}
                      </p>
                    )}
                  </div>
                </>
              ) : null}
            </div>
          </article>
        ))}
      </div>
      <div className="h-32 bg-white" aria-hidden />
    </section>
  )
}
