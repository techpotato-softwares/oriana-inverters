'use client'

import Link from 'next/link'
import { ArrowUpRight, Headphones, MonitorCog, Wrench } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { AnimatedCounter } from '../AnimatedCounter'
import { FadeIn, Stagger, StaggerItem } from '../FadeIn'

const stats = [
  { value: '500+', label: 'Channel & service partners' },
  { value: '24/7', label: 'Remote monitoring & response' },
  { value: '10+', label: 'Years of field experience' },
  { value: '48h', label: 'Typical on-site mobilisation' },
]

const pillars = [
  {
    title: 'Remote response',
    description: 'Diagnostics, firmware guidance, and parameter checks handled from the desk.',
    icon: MonitorCog,
  },
  {
    title: 'Field assistance',
    description: 'Trained engineers and partners mobilised to site when hands-on work is needed.',
    icon: Wrench,
  },
  {
    title: 'Customer care',
    description: 'A single point of contact that keeps owners and installers informed.',
    icon: Headphones,
  },
]

/** Approximate network nodes across India — decorative, labelled for context only. */
const nodes = [
  { label: 'Delhi NCR', top: '22%', left: '38%' },
  { label: 'Ahmedabad', top: '43%', left: '24%' },
  { label: 'Kolkata', top: '46%', left: '72%' },
  { label: 'Pune', top: '60%', left: '30%' },
  { label: 'Hyderabad', top: '66%', left: '46%' },
  { label: 'Bengaluru', top: '80%', left: '38%' },
]

export function GlobalPresence() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="global-presence"
      className="relative scroll-mt-40 overflow-hidden bg-oriana-deep py-20 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          maskImage: 'radial-gradient(ellipse at 70% 40%, #000 0%, transparent 72%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 70% 40%, #000 0%, transparent 72%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 h-[34rem] w-[34rem] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(26,66,138,0.6) 0%, rgba(7,21,37,0) 70%)',
        }}
      />

      <div className="container relative grid gap-14 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:gap-20">
        <div>
          <FadeIn>
            <p className="flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-oriana-sky">
              <span className="h-px w-10 bg-oriana-sky/60" aria-hidden />
              Global presence
            </p>
            <h2
              className="mt-6 max-w-xl font-display font-medium tracking-[-0.02em] text-white"
              style={{ fontSize: 'clamp(2rem, 3.8vw, 3.5rem)', lineHeight: 1.08 }}
            >
              A service network built around your site
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/70">
              Oriana pairs remote response with field-level assistance across India and beyond, so
              the right expertise reaches every system — residential rooftop to utility plant.
            </p>
          </FadeIn>

          <Stagger className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:mt-14">
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="border-t border-white/15 pt-5">
                  <AnimatedCounter
                    value={stat.value}
                    className="block font-display text-3xl font-medium tracking-tight text-white md:text-4xl"
                  />
                  <p className="mt-3 text-xs leading-5 text-white/60 sm:text-sm">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <FadeIn delay={0.1}>
            <Link
              href="/contact"
              className="group mt-12 inline-flex min-h-12 items-center gap-2 rounded-full border border-white/30 px-7 text-sm font-semibold text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-oriana-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Find the right support contact
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </Link>
          </FadeIn>
        </div>

        <FadeIn direction="left">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] sm:aspect-[5/4] lg:aspect-[4/5]">
            <div
              aria-hidden
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
                backgroundSize: '48px 48px',
              }}
            />

            {nodes.map((node, index) => (
              <div
                key={node.label}
                className="absolute flex items-center gap-2"
                style={{ top: node.top, left: node.left }}
              >
                <span className="relative flex h-2.5 w-2.5">
                  {reduceMotion ? null : (
                    <motion.span
                      className="absolute inline-flex h-full w-full rounded-full bg-oriana-sky"
                      animate={{ scale: [1, 3.2, 1], opacity: [0.55, 0, 0.55] }}
                      transition={{
                        duration: 3.2,
                        repeat: Infinity,
                        delay: index * 0.45,
                        ease: 'easeOut',
                      }}
                      aria-hidden
                    />
                  )}
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-oriana-sky shadow-[0_0_16px_rgba(77,163,255,0.9)]" />
                </span>
                <span className="whitespace-nowrap text-[0.7rem] font-medium tracking-wide text-white/70">
                  {node.label}
                </span>
              </div>
            ))}

            <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/10 bg-oriana-deep/85 p-5">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-oriana-sky">
                Coverage
              </p>
              <p className="mt-2 text-sm leading-6 text-white/75">
                PAN India service reach supported by regional partners and a central technical desk.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>

      <div className="container relative mt-16 lg:mt-20">
        <Stagger className="grid gap-4 md:grid-cols-3">
          {pillars.map(({ title, description, icon: Icon }) => (
            <StaggerItem key={title} className="h-full">
              <div className="group h-full rounded-3xl border border-white/10 bg-white/[0.05] p-7 transition-colors duration-500 hover:border-oriana-sky/40 hover:bg-white/[0.09]">
                <Icon className="h-7 w-7 text-oriana-sky" strokeWidth={1.4} aria-hidden />
                <h3 className="mt-10 font-display text-xl font-medium text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/65">{description}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
