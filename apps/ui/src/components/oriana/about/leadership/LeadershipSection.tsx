'use client'

import Link from 'next/link'
import { ArrowRight, Linkedin } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

import { FadeIn } from '@/components/oriana/FadeIn'
import { LeaderPortrait } from '@/components/oriana/about/leadership/LeaderPortrait'
import type { Leader, LeadershipContent } from '@/components/oriana/about/leadership/leadershipData'
import { SectionHeading } from '@/components/oriana/sustainability/SectionHeading'
import { cn } from '@/utilities/ui'

const ease = [0.16, 1, 0.3, 1] as const

/** Director portraits — studio shots on white, blended into the surface tone. */
export function LeadershipSection({ content }: { content: LeadershipContent }) {
  const reduceMotion = useReducedMotion()
  const { leaders } = content
  const lastIsOrphanOnTablet = leaders.length % 2 === 1

  return (
    <section
      id={content.id}
      aria-labelledby="leadership-title"
      className="section-safe-y relative isolate scroll-mt-[calc(var(--site-header-height,5rem)+1rem)] overflow-x-clip bg-white"
    >
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <FadeIn className="lg:col-span-7">
            <SectionHeading
              id="leadership-title"
              eyebrow={content.eyebrow}
              title={content.title}
              description={content.description}
            />
          </FadeIn>
          <FadeIn delay={0.08} className="lg:col-span-5 lg:justify-self-end">
            <Link
              href="/about/brand-story#origin"
              className="group inline-flex min-h-12 items-center gap-2 rounded-full border border-oriana-blue/30 px-6 text-sm font-semibold text-oriana-blue transition-colors duration-300 hover:bg-oriana-surface focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oriana-blue"
            >
              How ORIANA began
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none"
                aria-hidden
              />
            </Link>
          </FadeIn>
        </div>

        <ul className="mt-[clamp(2rem,5svh,4rem)] grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {leaders.map((leader, index) => (
            <motion.li
              key={`${leader.name}-${index}`}
              className={cn(
                lastIsOrphanOnTablet &&
                  index === leaders.length - 1 &&
                  'sm:col-span-2 sm:mx-auto sm:w-1/2 lg:col-span-1 lg:w-auto',
              )}
              initial={reduceMotion ? undefined : { opacity: 0, y: 40 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.9, delay: (index % 3) * 0.12, ease }}
            >
              <LeaderCard leader={leader} index={index} reduceMotion={!!reduceMotion} />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function LeaderCard({
  leader,
  index,
  reduceMotion,
}: {
  leader: Leader
  index: number
  reduceMotion: boolean
}) {
  return (
    <article className="group flex h-full flex-col">
      <div className="relative aspect-[4/5] max-h-[min(32rem,58svh)] w-full overflow-hidden rounded-3xl bg-oriana-surface [@media(max-height:52rem)]:aspect-[3/4]">
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/2"
          style={{
            background:
              'radial-gradient(70% 90% at 50% 100%, rgba(77,163,255,0.22) 0%, rgba(247,249,252,0) 70%)',
          }}
        />
        <div className="absolute inset-0">
          <LeaderPortrait
            leader={leader}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover object-[50%_18%] mix-blend-multiply transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            initialsClassName="text-6xl"
          />
        </div>
        {/* Curtain instead of clip-path: Chrome won't lazy-load images inside a fully clipped box. */}
        {reduceMotion ? null : (
          <motion.div
            aria-hidden
            className="absolute inset-0 origin-top bg-oriana-surface"
            initial={{ scaleY: 1 }}
            whileInView={{ scaleY: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1.1, delay: 0.1 + (index % 3) * 0.12, ease }}
          />
        )}
      </div>

      <div className="mt-5 flex flex-1 flex-col border-t border-oriana-navy/10 pt-4 sm:mt-6 sm:pt-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-display text-[clamp(1.05rem,2.4svh,1.5rem)] font-semibold leading-snug text-oriana-deep">
              {leader.name}
            </h3>
            {leader.role ? (
              <p className="mt-1 text-sm font-medium leading-snug text-oriana-blue">{leader.role}</p>
            ) : null}
          </div>
          {leader.linkedin ? (
            <a
              href={leader.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${leader.name} on LinkedIn (opens in a new tab)`}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-oriana-blue/20 text-oriana-blue transition-colors duration-300 hover:border-oriana-blue hover:bg-oriana-blue hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oriana-blue motion-reduce:transition-none"
            >
              <Linkedin className="h-[18px] w-[18px]" aria-hidden />
            </a>
          ) : (
            <span
              aria-hidden
              className="mt-2 h-2 w-2 shrink-0 rounded-full bg-oriana-sun transition-transform duration-500 group-hover:scale-150 motion-reduce:transition-none"
            />
          )}
        </div>
        {leader.bio ? (
          <p className="mt-3 text-pretty text-[clamp(0.875rem,1.6svh,0.95rem)] leading-relaxed text-oriana-muted sm:mt-4 sm:leading-7">
            {leader.bio}
          </p>
        ) : null}
      </div>
    </article>
  )
}
