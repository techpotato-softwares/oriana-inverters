'use client'

import { FadeIn } from '@/components/oriana/FadeIn'

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

export function IntroductionSection({
  title = 'Introduction',
  paragraphs = defaultParagraphs,
  tagline = 'Built in India. Designed for the Future.',
  ariaLabel = 'Introduction',
  className = '',
}: IntroductionSectionProps) {
  return (
    <section
      className={`relative overflow-hidden bg-white py-16 lg:py-24 ${className}`.trim()}
      aria-label={ariaLabel}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-oriana-navy/10 to-transparent"
        aria-hidden
      />
      <div className="container">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-oriana-blue">
              {title}
            </p>
            <div className="mt-8 space-y-5">
              {paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="text-base leading-relaxed text-oriana-muted md:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            {tagline ? (
              <p className="mt-10 font-display text-xl font-semibold tracking-tight text-oriana-navy sm:text-2xl lg:text-3xl">
                {tagline}
              </p>
            ) : null}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
