'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Linkedin } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

import { FadeIn } from '@/components/oriana/FadeIn'
import {
  leaderInitials,
  type Leader,
  type LeadershipContent,
} from '@/components/oriana/about/leadership/leadershipData'
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
      className="relative isolate scroll-mt-24 overflow-hidden bg-white py-20 lg:py-28"
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

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8">
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
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-oriana-surface">
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/2"
          style={{
            background:
              'radial-gradient(70% 90% at 50% 100%, rgba(77,163,255,0.22) 0%, rgba(247,249,252,0) 70%)',
          }}
        />
        <motion.div
          className="absolute inset-0"
          initial={reduceMotion ? undefined : { clipPath: 'inset(100% 0% 0% 0%)' }}
          whileInView={reduceMotion ? undefined : { clipPath: 'inset(0% 0% 0% 0%)' }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1.1, delay: 0.1 + (index % 3) * 0.12, ease }}
        >
          {leader.image ? (
            <Image
              src={leader.image}
              alt={`Portrait of ${leader.name}`}
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
              className="object-cover object-top mix-blend-multiply transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          ) : (
            <span
              aria-hidden
              className="absolute inset-0 flex items-center justify-center font-display text-6xl font-semibold text-oriana-blue/25"
            >
              {leaderInitials(leader.name)}
            </span>
          )}
        </motion.div>
        <span
          aria-hidden
          className="absolute left-6 top-6 font-display text-sm font-semibold text-oriana-blue/70"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="mt-6 flex flex-1 flex-col border-t border-oriana-navy/10 pt-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-display text-xl font-semibold text-oriana-deep lg:text-2xl">
              {leader.name}
            </h3>
            {leader.role ? (
              <p className="mt-1 text-sm font-medium text-oriana-blue">{leader.role}</p>
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
          <p className="mt-4 text-[0.95rem] leading-7 text-oriana-muted text-pretty">{leader.bio}</p>
        ) : null}
      </div>
    </article>
  )
}
