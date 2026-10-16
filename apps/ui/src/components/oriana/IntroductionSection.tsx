'use client'

import { useMemo, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

import { GrowingAccentLine } from './GrowingAccentLine'
import { ScrollRevealText } from './ScrollRevealText'

export type IntroductionSectionProps = {
  title?: string
  paragraphs?: string[]
  tagline?: string
  ariaLabel?: string
  className?: string
}

const defaultParagraphs = [
  'At Oriana, we are building the next generation of solar inverter technology with a focus on efficiency, reliability, intelligent performance, and long-term value.',
  "Backed by industry experience and a strong understanding of India's solar ecosystem, Oriana Inverters are designed to meet the evolving requirements of residential, commercial, industrial, and utility-scale solar applications.",
]

/**
 * Introduction block matching Sungrow:
 * accent title → growing vertical line → character scroll-reveal body → tagline.
 */
export function IntroductionSection({
  title = 'Introduction',
  paragraphs = defaultParagraphs,
  tagline = 'Built in India. Designed for the Future.',
  ariaLabel = 'Introduction',
  className = '',
}: IntroductionSectionProps) {
  const reduceMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const body = useMemo(() => paragraphs.filter(Boolean).join(' '), [paragraphs])

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden bg-white section-safe-y ${className}`.trim()}
      aria-label={ariaLabel}
    >
      <div className="container">
        <div className="mx-auto text-center" style={{ maxWidth: '72rem' }}>
          <h2 className="fluid-statement font-display font-medium leading-snug text-[#606060]">
            {title}
          </h2>

          <GrowingAccentLine
            sectionRef={sectionRef}
            reduceMotion={!!reduceMotion}
            size="compact"
            className="mt-[clamp(1rem,2.5svh,1.75rem)]"
          />

          <ScrollRevealText
            text={body}
            reduceMotion={!!reduceMotion}
            className="mx-auto font-medium leading-relaxed"
            style={{
              maxWidth: '56rem',
              fontSize: 'clamp(0.95rem, 1.35vw, 1.1rem)',
            }}
          />

          {tagline ? (
            <p className="fluid-title mt-14 font-display font-medium tracking-tight text-[#606060]">
              {tagline}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  )
}
