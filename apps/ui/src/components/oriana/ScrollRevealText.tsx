'use client'

import {
  useEffect,
  useMemo,
  useRef,
  type CSSProperties,
  type RefObject,
} from 'react'

const FAINT = 'rgba(128, 128, 128, 0.2)'
const ACTIVE = '#606060'

type ScrollRevealTextProps = {
  text: string
  reduceMotion?: boolean
  className?: string
  style?: CSSProperties
  /**
   * Viewport fractions for reveal start → complete.
   * Defaults match Sungrow / Introduction.
   */
  startVh?: number
  endVh?: number
  /**
   * Optional 0–1 progress written by a parent (e.g. sticky pin).
   * Blended with viewport progress via Math.max so sticky sections can finish the reveal.
   */
  progressRef?: RefObject<number>
}

/**
 * Sungrow-style character reveal: faint gray → #606060 as the paragraph scrolls.
 * rAF + lerped index (same feel as GrowingAccentLine / Lenis).
 */
export function ScrollRevealText({
  text,
  reduceMotion = false,
  className = '',
  style,
  startVh = 0.82,
  endVh = 0.28,
  progressRef,
}: ScrollRevealTextProps) {
  const textRef = useRef<HTMLParagraphElement>(null)
  const spansRef = useRef<HTMLSpanElement[]>([])
  const chars = useMemo(() => Array.from(text), [text])
  const currentIndex = useRef(reduceMotion ? chars.length : 0)

  useEffect(() => {
    const el = textRef.current
    if (!el) return

    if (reduceMotion) {
      spansRef.current.forEach((span) => {
        if (span) span.style.color = ACTIVE
      })
      return
    }

    let raf = 0
    let running = true

    const readViewportProgress = () => {
      const node = textRef.current
      if (!node) return 0
      const vh = window.innerHeight
      const rect = node.getBoundingClientRect()
      const start = vh * startVh
      const end = vh * endVh
      const distance = start - end + rect.height * 0.35
      return Math.min(1, Math.max(0, (start - rect.top) / Math.max(distance, 1)))
    }

    const tick = () => {
      if (!running) return
      const viewport = readViewportProgress()
      const external = progressRef?.current
      const progress =
        typeof external === 'number' ? Math.max(viewport, Math.min(1, Math.max(0, external))) : viewport
      const target = progress * chars.length

      currentIndex.current += (target - currentIndex.current) * 0.14
      if (Math.abs(target - currentIndex.current) < 0.05) currentIndex.current = target

      const active = Math.min(chars.length, Math.floor(currentIndex.current))
      const spans = spansRef.current
      for (let i = 0; i < spans.length; i++) {
        const span = spans[i]
        if (!span) continue
        span.style.color = i < active ? ACTIVE : FAINT
      }
      raf = window.requestAnimationFrame(tick)
    }

    raf = window.requestAnimationFrame(tick)
    return () => {
      running = false
      window.cancelAnimationFrame(raf)
    }
  }, [chars.length, reduceMotion, startVh, endVh, progressRef])

  return (
    <p ref={textRef} className={className} style={style} aria-label={text}>
      {chars.map((ch, i) => (
        <span
          key={`${i}-${ch}`}
          ref={(node) => {
            if (node) spansRef.current[i] = node
          }}
          aria-hidden
          style={{ color: reduceMotion ? ACTIVE : FAINT }}
        >
          {ch}
        </span>
      ))}
    </p>
  )
}
