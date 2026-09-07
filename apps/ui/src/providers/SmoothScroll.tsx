'use client'

import { ReactLenis } from 'lenis/react'
import type { ReactNode } from 'react'
import 'lenis/dist/lenis.css'

type SmoothScrollProps = {
  children: ReactNode
}

/**
 * Site-wide Lenis smooth scroll (same approach as Sungrow).
 * Framer Motion useScroll continues to track the root scroll position.
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        lerp: 0.09,
        smoothWheel: true,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  )
}
