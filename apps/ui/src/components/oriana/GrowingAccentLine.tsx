'use client'

import { type CSSProperties, type RefObject, useEffect, useRef } from 'react'

const LINE = '#1a428a'

type GrowingAccentLineProps = {
  sectionRef?: RefObject<HTMLElement | null>
  reduceMotion?: boolean
  className?: string
  /** @deprecated Kept for call-site compatibility; growth is viewport-based now. */
  offset?: unknown
  /** Compact / micro = shorter; heading = 10rem; tall ≈ Sungrow vw-h-[240] */
  size?: 'default' | 'compact' | 'micro' | 'tall' | 'heading'
  origin?: 'top' | 'bottom'
  /**
   * Optional 0–1 progress from a parent sticky scrubber.
   * When omitted, grows from the line's own position in the viewport (Sungrow-smooth).
   */
  progress?: number
}

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n))
}

/**
 * Thin brand accent that grows on scroll (Sungrow: origin-top + scaleY).
 * Uses rAF + lerped scale written to the DOM — avoids stepped React updates with Lenis.
 */
export function GrowingAccentLine({
  reduceMotion = false,
  className = '',
  size = 'default',
  origin = 'top',
  progress: progressProp,
}: GrowingAccentLineProps) {
  const boxRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(typeof progressProp === 'number' ? progressProp : 0)
  const currentRef = useRef(reduceMotion ? 1 : 0)
  const external = typeof progressProp === 'number'

  useEffect(() => {
    if (external) {
      progressRef.current = clamp01(progressProp)
    }
  }, [external, progressProp])

  useEffect(() => {
    const line = lineRef.current
    if (!line) return

    if (reduceMotion) {
      line.style.transform = 'scaleY(1)'
      return
    }

    let raf = 0
    let running = true

    const readTarget = () => {
      if (external) return clamp01(progressRef.current)
      const el = boxRef.current
      if (!el) return 0
      const vh = window.innerHeight
      const rect = el.getBoundingClientRect()
      // Grow while the line travels through the upper/mid viewport (Sungrow feel)
      const start = vh * 0.92
      const end = vh * 0.38
      return clamp01((start - rect.top) / Math.max(start - end, 1))
    }

    const tick = () => {
      if (!running) return
      const target = readTarget()
      currentRef.current += (target - currentRef.current) * 0.12
      if (Math.abs(target - currentRef.current) < 0.0002) currentRef.current = target
      line.style.transform = `scaleY(${Math.max(currentRef.current, 0.001)})`
      raf = window.requestAnimationFrame(tick)
    }

    raf = window.requestAnimationFrame(tick)
    return () => {
      running = false
      window.cancelAnimationFrame(raf)
    }
  }, [reduceMotion, external])

  const boxStyle: CSSProperties =
    size === 'micro'
      ? { height: '3.25rem', minHeight: '3.25rem' }
      : size === 'compact'
        ? { height: '5.75rem', minHeight: '5.75rem' }
        : size === 'heading'
          ? { height: '10rem', minHeight: '10rem' }
          : size === 'tall'
            ? { height: 'min(12.5vw, 12rem)', minHeight: '7.5rem' }
            : { height: 'min(12.5vw, 12rem)', minHeight: '6rem' }

  return (
    <div
      ref={boxRef}
      className={`relative mx-auto flex justify-center overflow-hidden ${className}`.trim()}
      style={boxStyle}
      aria-hidden
    >
      <div
        ref={lineRef}
        className="h-full w-px"
        style={{
          backgroundColor: LINE,
          transformOrigin: origin === 'bottom' ? 'center bottom' : 'center top',
          transform: `scaleY(${reduceMotion ? 1 : 0.001})`,
          willChange: 'transform',
        }}
      />
    </div>
  )
}
