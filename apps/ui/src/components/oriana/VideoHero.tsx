'use client'

import { useEffect, useRef, useState } from 'react'

export type VideoHeroProps = {
  /** MP4 (or other browser-supported) video URL — local `/…` or absolute */
  videoSrc: string
  /** Poster / fallback image while video loads */
  posterSrc: string
  /** Rotating captions shown bottom-right; omit or pass one string for a static caption */
  captions?: string[]
  /** Caption rotation interval in ms (default 4200). Ignored with ≤1 caption. */
  captionIntervalMs?: number
  /** Accessible name for the section */
  ariaLabel?: string
  className?: string
}

/**
 * Full-viewport video hero with optional rotating captions.
 * Reusable across marketing pages.
 */
export function VideoHero({
  videoSrc,
  posterSrc,
  captions = [],
  captionIntervalMs = 4200,
  ariaLabel = 'Hero',
  className = '',
}: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)
  const [captionIndex, setCaptionIndex] = useState(0)
  const [captionVisible, setCaptionVisible] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const tryPlay = () => {
      video.muted = true
      void video.play().catch(() => {})
    }

    const onCanPlay = () => {
      setReady(true)
      tryPlay()
    }

    video.addEventListener('canplay', onCanPlay)
    if (video.readyState >= 2) onCanPlay()
    else tryPlay()

    return () => video.removeEventListener('canplay', onCanPlay)
  }, [videoSrc])

  useEffect(() => {
    if (captions.length <= 1) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const id = window.setInterval(() => {
      setCaptionVisible(false)
      window.setTimeout(() => {
        setCaptionIndex((i) => (i + 1) % captions.length)
        setCaptionVisible(true)
      }, 280)
    }, captionIntervalMs)
    return () => window.clearInterval(id)
  }, [captions, captionIntervalMs])

  const caption = captions[captionIndex] ?? captions[0]

  return (
    <section
      className={`relative min-h-[100svh] w-full overflow-hidden bg-oriana-navy ${className}`.trim()}
      style={{ height: '100svh' }}
      aria-label={ariaLabel}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={posterSrc}
        alt=""
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          ready ? 'opacity-0' : 'opacity-100'
        }`}
        fetchPriority="high"
      />
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          ready ? 'opacity-100' : 'opacity-0'
        }`}
        src={videoSrc}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        poster={posterSrc}
        aria-hidden
      />
      <div className="absolute inset-0 bg-oriana-navy/25" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-t from-oriana-navy/80 via-transparent to-oriana-navy/20"
        aria-hidden
      />

      {caption ? (
        <div className="absolute inset-x-0 bottom-0 z-10 flex justify-end px-8 pb-16 sm:px-12 lg:px-20 lg:pb-20">
          <p
            className={`max-w-md text-right font-display text-2xl font-semibold tracking-tight text-white transition-all duration-300 sm:text-3xl md:text-4xl ${
              captionVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
            }`}
          >
            {caption}
          </p>
        </div>
      ) : null}
    </section>
  )
}
