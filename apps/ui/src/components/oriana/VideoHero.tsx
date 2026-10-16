'use client'

import { type ReactNode, useEffect, useRef, useState } from 'react'

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
  /** Foreground content layered above the video and gradients */
  children?: ReactNode
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
  children,
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
      className={`viewport-fill relative w-full overflow-hidden bg-oriana-deep ${className}`.trim()}
      style={children ? undefined : { height: 'var(--viewport-height, 100svh)' }}
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
      <div className="absolute inset-0 bg-oriana-deep/25" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-t from-oriana-deep/80 via-transparent to-oriana-deep/20"
        aria-hidden
      />

      {caption ? (
        <div
          className="absolute inset-x-0 bottom-0 z-10 flex justify-end px-[clamp(1rem,4vw,5rem)]"
          style={{
            paddingBottom:
              'max(1rem, env(safe-area-inset-bottom, 0px), clamp(1rem, 4svh, 3.5rem))',
          }}
        >
          <p
            className={`max-w-[min(28rem,90%)] text-right font-display font-semibold tracking-tight text-balance text-white transition-all duration-300 ${
              captionVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
            }`}
            style={{
              fontSize: 'clamp(1.15rem, min(3.8vw, 5.5svh), 2.25rem)',
              lineHeight: 1.15,
            }}
          >
            {caption}
          </p>
        </div>
      ) : null}

      {children ? (
        <div className="viewport-fill relative z-10 flex min-h-0 flex-col">{children}</div>
      ) : null}
    </section>
  )
}
