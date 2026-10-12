'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

/** Orri peeks over the footer edge and invites visitors to get in touch. */
export function OrriFooterPeek({ href = '/contact', label = 'Questions? Let’s talk' }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' })
  const reduceMotion = useReducedMotion()
  const shown = reduceMotion || inView
  const pathname = usePathname()

  if (pathname?.startsWith(href)) return null

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute bottom-full right-4 flex items-end gap-2 sm:right-8 lg:right-16"
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.9 }}
        animate={shown ? { opacity: 1, y: 0, scale: 1 } : undefined}
        transition={{ delay: reduceMotion ? 0 : 0.55, type: 'spring', stiffness: 260, damping: 18 }}
        className="pointer-events-auto mb-14 sm:mb-16"
      >
        <Link
          href={href}
          className="relative block rounded-2xl rounded-br-sm bg-white px-4 py-2.5 text-sm font-semibold text-oriana-deep shadow-[0_10px_30px_-12px_rgba(7,21,37,0.35)] ring-1 ring-oriana-navy/8 transition-colors duration-300 hover:bg-oriana-blue hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oriana-blue"
        >
          {label}
        </Link>
      </motion.div>

      <div className="h-[84px] w-[92px] overflow-hidden sm:h-[104px] sm:w-[112px]" aria-hidden>
        <motion.div
          initial={reduceMotion ? false : { y: '100%' }}
          animate={shown ? { y: '0%' } : undefined}
          transition={{ type: 'spring', stiffness: 120, damping: 14 }}
          whileHover={reduceMotion ? undefined : { y: '-6%', rotate: -4 }}
          className="pointer-events-auto origin-bottom"
        >
          <Image
            src="/assets/mascot/orri-wave.webp"
            alt=""
            width={619}
            height={900}
            sizes="112px"
            draggable={false}
            className="h-auto w-full select-none"
          />
        </motion.div>
      </div>
    </div>
  )
}
