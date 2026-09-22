'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FadeIn } from '../FadeIn'

export function SupportHero() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Move the background image down slightly as we scroll down to create a parallax effect
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[60svh] items-center overflow-hidden bg-oriana-deep pt-24 lg:min-h-[70svh]"
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y, opacity }}
      >
        {/* Placeholder image from unsplash (Solar panels/technician) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1508514177221-188b1c77eca2?auto=format&fit=crop&q=80&w=2940"
          alt="Oriana Professional Support"
          className="h-full w-full object-cover opacity-40 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-oriana-deep via-oriana-deep/80 to-transparent" />
      </motion.div>

      <div className="container relative z-10 py-16 lg:py-24">
        <FadeIn>
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-oriana-sky">
              Service Brand
            </p>
            <h1
              className="mt-6 font-display font-semibold tracking-tight text-white"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.1 }}
            >
              Professional Support. <br className="hidden sm:block" />
              Reliable Performance.
            </h1>
            <p
              className="mt-8 leading-relaxed text-white/70"
              style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', maxWidth: '42rem' }}
            >
              At Oriana Inverters, our commitment goes beyond delivering high-quality solar inverters. 
              We provide dependable service support throughout the product lifecycle, helping customers, 
              installers, EPC partners, and businesses achieve reliable solar performance. 
              Our service approach combines technical expertise, responsive support, systematic 
              troubleshooting, and field-level assistance to ensure faster resolution and minimal downtime.
            </p>
          </div>
        </FadeIn>
      </div>
      
      {/* Fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  )
}
