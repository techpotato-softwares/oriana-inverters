'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ArrowUpRight, FileText, LifeBuoy, ShieldCheck } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

const headline = ['Professional support.', 'Reliable performance.']

const quickLinks = [
  { label: 'Technical support', href: '/contact', icon: LifeBuoy },
  { label: 'Warranty claim', href: '/support/warranty', icon: ShieldCheck },
  { label: 'Product documentation', href: '/resources/downloads', icon: FileText },
]

export function SupportHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const copyY = useTransform(scrollYProgress, [0, 1], ['0px', '-60px'])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section
      id="service-brand"
      ref={containerRef}
      className="relative isolate flex min-h-[92svh] scroll-mt-32 items-end overflow-hidden bg-oriana-deep"
    >
      <motion.div
        className="absolute inset-0 -z-10"
        style={reduceMotion ? undefined : { y, scale }}
        initial={reduceMotion ? undefined : { scale: 1.12, opacity: 0.4 }}
        animate={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=88&w=2400"
          alt="Oriana service engineers inspecting a solar installation"
          className="h-full w-full object-cover object-center"
          fetchPriority="high"
        />
      </motion.div>

      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(100deg, rgba(7,21,37,0.94) 0%, rgba(7,21,37,0.72) 38%, rgba(7,21,37,0.18) 72%, rgba(7,21,37,0.45) 100%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-1/2"
        style={{
          background: 'linear-gradient(180deg, rgba(7,21,37,0) 0%, rgba(7,21,37,0.92) 100%)',
        }}
      />
      <div
        aria-hidden
        className="absolute -left-40 top-1/4 -z-10 h-[38rem] w-[38rem] rounded-full opacity-60"
        style={{
          background: 'radial-gradient(circle, rgba(26,66,138,0.55) 0%, rgba(7,21,37,0) 70%)',
        }}
      />

      <motion.div
        className="container relative w-full pb-16 pt-40 lg:pb-24 lg:pt-52"
        style={reduceMotion ? undefined : { y: copyY, opacity: copyOpacity }}
      >
        <motion.p
          className="flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-oriana-sky"
          initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="h-px w-10 bg-oriana-sky/70" aria-hidden />
          Service &amp; Support
        </motion.p>

        <h1
          className="mt-7 max-w-4xl font-display font-medium tracking-[-0.03em] text-white"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5.25rem)', lineHeight: 1.02 }}
        >
          {headline.map((line, index) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="block"
                initial={reduceMotion ? undefined : { y: '110%' }}
                animate={reduceMotion ? undefined : { y: '0%' }}
                transition={{
                  duration: 1,
                  delay: 0.12 + index * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {index === 1 ? <span className="text-oriana-sky">{line}</span> : line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 28 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="mt-8 max-w-2xl text-base leading-8 text-white/75 md:text-lg">
            Dependable service across the product lifecycle — technical expertise, responsive
            support, systematic troubleshooting, and field-level assistance that keeps customers,
            installers, and EPC partners running with minimal downtime.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-oriana-blue px-7 text-sm font-semibold text-white transition-colors duration-300 hover:bg-oriana-sky hover:text-oriana-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Contact support
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </Link>
            <Link
              href="#our-strengths"
              className="inline-flex min-h-12 items-center rounded-full border border-white/30 px-7 text-sm font-semibold text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-oriana-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Explore our service
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="mt-14 border-t border-white/15 pt-6 lg:mt-20"
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-white/45">
            Frequently needed
          </p>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {quickLinks.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="inline-flex min-h-11 items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.1] px-5 text-sm text-white/85 transition-colors duration-300 hover:border-oriana-sky/60 hover:bg-white/20 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <Icon className="h-4 w-4 text-oriana-sky" strokeWidth={1.6} aria-hidden />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </section>
  )
}
