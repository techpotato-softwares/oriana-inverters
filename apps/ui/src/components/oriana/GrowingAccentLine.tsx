'use client'

import { type CSSProperties, type RefObject, useEffect, useRef } from 'react'

const LINE = '#1a428a'

export type GrowingAccentLineSize =
  | 'default'
  | 'compact'
  | 'micro'
  | 'tall'
  | 'heading'
  | 'fluid'

type GrowingAccentLineProps = {
  sectionRef?: RefObject<HTMLElement | null>
  reduceMotion?: boolean
  className?: string
  /** @deprecated Kept for call-site compatibility; growth is viewport-based now. */
  offset?: unknown
  /**
   * Semantic length preset — all sizes use svh clamps so the line shortens on
   * short Windows / laptop chrome and grows on tall desktops.
   */
  size?: GrowingAccentLineSize
  origin?: 'top' | 'bottom'
  /**
   * Optional 0–1 progress from a parent sticky scrubber.
   * When omitted, grows from the line's own position in the viewport (Sungrow-smooth).
   */
  progress?: number
  /** Optional CSS height override (still prefers clamp(…svh…) from callers). */
  height?: string
}

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n))
}

/**
 * Viewport-fluid box heights. Min stays readable; max caps on large screens;
 * middle term tracks small visual viewport height (svh).
 */
const SIZE_HEIGHT: Record<GrowingAccentLineSize, string> = {
  micro: 'clamp(1.5rem, 3.25svh, 3.25rem)',
  compact: 'clamp(2rem, 5svh, 5.5rem)',
  fluid: 'clamp(2.25rem, 5.5svh, 6rem)',
  /** Sticky section headings (Vision / Mission) — must not eat the pin. */
  heading: 'clamp(2.25rem, 6.5svh, 7.5rem)',
  default: 'clamp(2.5rem, 8svh, 10rem)',
  tall: 'clamp(2.75rem, 10svh, 12rem)',
}

/**
 * Thin brand accent that grows on scroll (Sungrow: origin-top + scaleY).
 * Box height always scales with the viewport via svh.
 */
export function GrowingAccentLine({
  reduceMotion = false,
  className = '',
  size = 'default',
  origin = 'top',
  progress: progressProp,
  height,
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

  const resolvedHeight = height?.trim() || SIZE_HEIGHT[size]
  const boxStyle: CSSProperties = {
    height: resolvedHeight,
    minHeight: '1.5rem',
    maxHeight: 'min(12rem, 18svh)',
  }

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
