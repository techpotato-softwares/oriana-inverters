'use client'

import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'

import type { JourneyStep } from '@/components/oriana/about/achievements/achievementsData'
import { cn } from '@/utilities/ui'

const ease = [0.16, 1, 0.3, 1] as const

/** Centre-line timeline whose rail fills as the visitor scrolls through it. */
export function JourneyTimeline({ steps }: { steps: JourneyStep[] }) {
  const ref = useRef<HTMLOListElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 })
  const last = steps.length - 1

  return (
    <ol ref={ref} className="relative mt-14 space-y-12 pl-12 lg:mt-20 lg:space-y-0 lg:pl-0">
      <span
        aria-hidden
        className="absolute bottom-3 left-[0.6875rem] top-3 w-px bg-white/12 lg:left-1/2 lg:-translate-x-1/2"
      />
      <motion.span
        aria-hidden
        className="absolute bottom-3 left-[0.6875rem] top-3 w-px origin-top lg:left-1/2 lg:-translate-x-1/2"
        style={{
          scaleY: reduceMotion ? 1 : progress,
          background: 'linear-gradient(180deg, #4da3ff 0%, #1a428a 70%, #f5b942 100%)',
        }}
      />

      {steps.map((step, index) => {
        const right = index % 2 === 1
        const final = index === last
        return (
          <li key={step.marker} className="relative lg:grid lg:min-h-[9.5rem] lg:grid-cols-2 lg:gap-24">
            <motion.span
              aria-hidden
              className={cn(
                'absolute -left-12 top-1 flex h-[1.375rem] w-[1.375rem] items-center justify-center rounded-full border-2 bg-oriana-deep lg:left-1/2 lg:-translate-x-1/2',
                final ? 'border-oriana-sun' : 'border-oriana-sky',
              )}
              initial={reduceMotion ? undefined : { scale: 0.4, opacity: 0 }}
              whileInView={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-35% 0px -35% 0px' }}
              transition={{ duration: 0.5, ease }}
            >
              <span className={cn('h-2 w-2 rounded-full', final ? 'bg-oriana-sun' : 'bg-oriana-sky')} />
            </motion.span>

            <motion.div
              className={cn(right ? 'lg:col-start-2' : 'lg:col-start-1 lg:text-right')}
              initial={reduceMotion ? undefined : { opacity: 0, y: 28 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-15%' }}
              transition={{ duration: 0.8, ease }}
            >
              <p className="font-display text-xs font-semibold tracking-[0.2em] text-white/45">{`0${index + 1}`}</p>
              <p
                className={cn(
                  'mt-2 font-display font-medium tracking-[-0.02em] text-balance',
                  final ? 'text-oriana-sun' : 'text-white',
                )}
                style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.5rem)', lineHeight: 1.1 }}
              >
                {step.marker}
              </p>
              <p className="mt-2 text-base leading-7 text-white/65">{step.label}</p>
            </motion.div>
          </li>
        )
      })}
    </ol>
  )
}
