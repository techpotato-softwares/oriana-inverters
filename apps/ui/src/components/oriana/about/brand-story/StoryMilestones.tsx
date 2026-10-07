'use client'

import { motion, useReducedMotion } from 'framer-motion'

import type { StoryMilestone } from '@/components/oriana/about/brand-story/brandStoryData'
import { cn } from '@/utilities/ui'

const ease = [0.16, 1, 0.3, 1] as const

export function StoryMilestones({ milestones }: { milestones: StoryMilestone[] }) {
  const reduceMotion = useReducedMotion()
  const last = milestones.length - 1

  return (
    <section aria-label="ORIANA at a glance" className="border-b border-oriana-navy/8 bg-white">
      <div className="container py-14 lg:py-20">
        <ol className="relative grid gap-8 pl-10 md:grid-cols-5 md:gap-4 md:pl-0 lg:gap-6">
          <span
            aria-hidden
            className="absolute bottom-2 left-[0.6875rem] top-2 w-px bg-oriana-deep/10 md:inset-x-0 md:bottom-auto md:left-0 md:top-[0.6875rem] md:h-px md:w-auto"
          />
          <motion.span
            aria-hidden
            className="absolute bottom-2 left-[0.6875rem] top-2 w-px origin-top md:inset-x-0 md:bottom-auto md:left-0 md:top-[0.6875rem] md:h-px md:w-auto md:origin-left"
            style={{ background: 'linear-gradient(90deg, #4da3ff 0%, #1a428a 100%)' }}
            initial={reduceMotion ? undefined : { opacity: 0 }}
            whileInView={reduceMotion ? undefined : { opacity: 1 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 1.2, ease }}
          />

          {milestones.map((item, index) => (
            <motion.li
              key={item.value}
              className="relative md:pt-12"
              initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: index * 0.12, ease }}
            >
              <span
                aria-hidden
                className={cn(
                  'absolute -left-10 top-1 flex h-[1.375rem] w-[1.375rem] items-center justify-center rounded-full border-2 bg-white md:left-0 md:top-0',
                  index === last ? 'border-oriana-sun' : 'border-oriana-blue',
                )}
              >
                <span
                  className={cn(
                    'h-2 w-2 rounded-full',
                    index === last ? 'bg-oriana-sun' : 'bg-oriana-blue',
                  )}
                />
              </span>
              <p
                className="font-display font-semibold tracking-[-0.02em] whitespace-nowrap text-oriana-blue"
                style={{ fontSize: 'clamp(1.25rem, 2.3vw, 2.25rem)', lineHeight: 1.1 }}
              >
                {item.value}
              </p>
              <p className="mt-2 max-w-[16rem] text-sm leading-6 text-oriana-muted">{item.label}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
