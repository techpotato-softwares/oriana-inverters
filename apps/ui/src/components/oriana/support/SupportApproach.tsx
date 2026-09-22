'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

const steps = [
  {
    title: 'Identify',
    description:
      'Capture the operating condition, site context, and support requirement so nothing is assumed.',
    image:
      'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=1200',
  },
  {
    title: 'Diagnose',
    description:
      'Review monitoring data, event logs, and system design to isolate the most likely root cause.',
    image:
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1200',
  },
  {
    title: 'Resolve',
    description:
      'Deliver a clear remote fix or coordinate field assistance to bring the plant back to full output.',
    image:
      'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=1200',
  },
  {
    title: 'Support',
    description:
      'Confirm the outcome, share preventive guidance, and stay engaged across the product lifecycle.',
    image:
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=1200',
  },
]

export function SupportApproach() {
  const trackRef = useRef<HTMLOListElement>(null)
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 70%', 'end 65%'],
  })
  const railScale = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 })

  return (
    <section
      id="our-approach"
      className="relative scroll-mt-40 overflow-hidden bg-oriana-surface py-20 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-16 h-[34rem] w-[34rem] rounded-full opacity-70"
        style={{
          background: 'radial-gradient(circle, rgba(77,163,255,0.16) 0%, rgba(247,249,252,0) 70%)',
        }}
      />

      <div className="container relative grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-[calc(var(--site-header-height,5rem)+6rem)] lg:self-start">
          <p className="flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-oriana-blue">
            <span className="h-px w-10 bg-oriana-blue/50" aria-hidden />
            Our approach
          </p>
          <h2
            className="mt-6 font-display font-medium tracking-[-0.02em] text-oriana-navy"
            style={{ fontSize: 'clamp(2rem, 3.8vw, 3.5rem)', lineHeight: 1.08 }}
          >
            One sequence,
            <br className="hidden sm:block" /> every service case
          </h2>
          <p className="mt-6 max-w-md text-base leading-8 text-oriana-muted">
            Identify, diagnose, resolve, support. A consistent method keeps communication clear from
            the first observation through to long-term performance.
          </p>
          <Link
            href="/contact"
            className="group mt-9 inline-flex min-h-12 items-center gap-2 rounded-full bg-oriana-blue px-7 text-sm font-semibold text-white transition-colors duration-300 hover:bg-oriana-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oriana-blue"
          >
            Raise a service request
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </Link>
        </div>

        <ol ref={trackRef} className="relative pl-14 sm:pl-20">
          <span
            aria-hidden
            className="absolute bottom-6 left-[1.4rem] top-4 w-px bg-oriana-deep/10 sm:left-[2rem]"
          />
          <motion.span
            aria-hidden
            className="absolute bottom-6 left-[1.4rem] top-4 w-px origin-top sm:left-[2rem]"
            style={{
              scaleY: reduceMotion ? 1 : railScale,
              background: 'linear-gradient(180deg, #4da3ff 0%, #1a428a 100%)',
            }}
          />

          {steps.map((step, index) => (
            <motion.li
              key={step.title}
              className="relative pb-12 last:pb-0"
              initial={reduceMotion ? undefined : { opacity: 0, y: 40 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-15%' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="absolute -left-14 top-0 flex h-11 w-11 items-center justify-center rounded-full border border-oriana-blue/20 bg-white font-display text-sm font-semibold text-oriana-blue shadow-[0_10px_30px_-18px_rgba(7,21,37,0.6)] sm:-left-20 sm:h-[3.25rem] sm:w-[3.25rem] sm:text-base">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="group overflow-hidden rounded-3xl bg-white shadow-[0_28px_70px_-56px_rgba(7,21,37,0.7)] transition-shadow duration-500 hover:shadow-[0_34px_80px_-46px_rgba(7,21,37,0.55)]">
                <div className="relative aspect-[16/8] overflow-hidden sm:aspect-[16/7]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={step.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(120deg, rgba(7,21,37,0.55) 0%, rgba(7,21,37,0.05) 60%)',
                    }}
                  />
                  <h3
                    className="absolute bottom-5 left-6 font-display font-medium text-white"
                    style={{ fontSize: 'clamp(1.4rem, 2.2vw, 2rem)' }}
                  >
                    {step.title}
                  </h3>
                </div>
                <p className="px-6 py-6 text-sm leading-7 text-oriana-muted sm:text-base sm:leading-8">
                  {step.description}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
