'use client'

import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { useId, useRef } from 'react'

import { FadeIn } from '@/components/oriana/FadeIn'
import { SectionHeading } from '@/components/oriana/sustainability/SectionHeading'
import type {
  SectionIntro,
  SustainabilityCommitment,
} from '@/components/oriana/sustainability/sustainabilityData'
import { cn } from '@/utilities/ui'

type CommitmentsTimelineProps = {
  intro: SectionIntro
  commitments: SustainabilityCommitment[]
}

export function CommitmentsTimeline({ intro, commitments }: CommitmentsTimelineProps) {
  const trackRef = useRef<HTMLOListElement>(null)
  const reduceMotion = useReducedMotion()
  const headingId = useId()

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 85%', 'end 60%'],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 })

  if (commitments.length === 0) return null

  return (
    <section
      id="commitments"
      aria-labelledby={headingId}
      className="scroll-mt-24 bg-white py-20 lg:py-28"
    >
      <div className="container">
        <FadeIn>
          <SectionHeading id={headingId} {...intro} />
        </FadeIn>

        <ol
          ref={trackRef}
          className={cn(
            'relative mt-14 grid gap-10 pl-10 lg:mt-20 lg:gap-8 lg:pl-0',
            commitments.length >= 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2',
          )}
        >
          <span
            aria-hidden
            className="absolute bottom-2 left-[0.6875rem] top-2 w-px bg-oriana-deep/10 lg:inset-x-0 lg:bottom-auto lg:left-0 lg:top-[0.6875rem] lg:h-px lg:w-auto"
          />
          <motion.span
            aria-hidden
            className="absolute bottom-2 left-[0.6875rem] top-2 hidden w-px origin-top lg:inset-x-0 lg:bottom-auto lg:left-0 lg:top-[0.6875rem] lg:block lg:h-px lg:w-auto lg:origin-left"
            style={{
              scaleX: reduceMotion ? 1 : progress,
              background: 'linear-gradient(90deg, #4da3ff 0%, #1a428a 100%)',
            }}
          />
          <motion.span
            aria-hidden
            className="absolute bottom-2 left-[0.6875rem] top-2 w-px origin-top lg:hidden"
            style={{
              scaleY: reduceMotion ? 1 : progress,
              background: 'linear-gradient(180deg, #4da3ff 0%, #1a428a 100%)',
            }}
          />

          {commitments.map((item, index) => (
            <motion.li
              key={`${item.phase}-${item.title}`}
              className="relative lg:pt-12"
              initial={reduceMotion ? undefined : { opacity: 0, y: 32 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.75, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                aria-hidden
                className={cn(
                  'absolute -left-10 top-0 flex h-[1.375rem] w-[1.375rem] items-center justify-center rounded-full border-2 bg-white lg:left-0',
                  index === 0 ? 'border-oriana-blue' : 'border-oriana-deep/20',
                )}
              >
                <span
                  className={cn(
                    'h-2 w-2 rounded-full',
                    index === 0 ? 'bg-oriana-blue' : 'bg-oriana-deep/25',
                  )}
                />
              </span>

              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-oriana-muted">
                  {item.phase}
                </span>
                <span
                  className={cn(
                    'rounded-full px-3 py-1 text-xs font-semibold',
                    index === 0
                      ? 'bg-oriana-blue text-white'
                      : 'bg-oriana-silver text-oriana-blue',
                  )}
                >
                  {item.timeframe}
                </span>
              </div>
              <h3 className="mt-4 font-display text-xl font-medium text-balance text-oriana-navy lg:text-2xl">
                {item.title}
              </h3>
              {item.body ? (
                <p className="mt-3 max-w-sm text-sm leading-7 text-oriana-muted">{item.body}</p>
              ) : null}
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
