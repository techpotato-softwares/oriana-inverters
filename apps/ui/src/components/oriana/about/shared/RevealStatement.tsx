'use client'

import { useReducedMotion } from 'framer-motion'
import type { CSSProperties } from 'react'

import { ScrollRevealText } from '@/components/oriana/ScrollRevealText'

const tones = {
  light: { active: '#071525', faint: 'rgba(7, 21, 37, 0.14)' },
  dark: { active: '#ffffff', faint: 'rgba(255, 255, 255, 0.18)' },
} as const

/** Large statement that fills in character by character as it scrolls into view. */
export function RevealStatement({
  text,
  tone = 'light',
  className,
  style,
}: {
  text: string
  tone?: keyof typeof tones
  className?: string
  style?: CSSProperties
}) {
  const reduceMotion = useReducedMotion()
  return (
    <ScrollRevealText
      text={text}
      reduceMotion={!!reduceMotion}
      activeColor={tones[tone].active}
      faintColor={tones[tone].faint}
      className={className}
      style={{
        fontSize: 'clamp(1.75rem, 3.6vw, 3.25rem)',
        lineHeight: 1.15,
        letterSpacing: '-0.02em',
        ...style,
      }}
    />
  )
}
