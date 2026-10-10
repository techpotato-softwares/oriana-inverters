'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

import type { LongTermItem } from '@/components/oriana/about/vision-mission/visionMissionData'

function LongTermRow({ item, index }: { item: LongTermItem; index: number }) {
  const ref = useRef<HTMLLIElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 35%'] })
  const opacity = useTransform(scrollYProgress, [0, 0.45, 1], [0.22, 1, 1])
  const x = useTransform(scrollYProgress, [0, 0.45], [24, 0])

  return (
    <li ref={ref} className="border-b border-oriana-navy/10">
      <motion.div
        style={reduceMotion ? undefined : { opacity, x }}
        className="grid gap-4 py-8 sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:items-center sm:gap-8 lg:py-10"
      >
        <span className="font-display text-sm font-semibold text-oriana-sky">{`0${index + 1}`}</span>
        <p
          className="font-display font-medium tracking-[-0.02em] text-balance text-oriana-deep"
          style={{ fontSize: 'clamp(1.5rem, 3.2vw, 2.75rem)', lineHeight: 1.12 }}
        >
          {item.label}
        </p>
        <Link
          href={item.href}
          className="group inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-oriana-blue/25 px-5 text-sm font-semibold text-oriana-blue transition-colors duration-300 hover:bg-oriana-blue hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oriana-blue"
        >
          {item.linkLabel}
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </Link>
      </motion.div>
    </li>
  )
}

/** Statement list where each line brightens as it reaches the reading line. */
export function LongTermList({ items }: { items: LongTermItem[] }) {
  return (
    <ol className="mt-12 border-t border-oriana-navy/10 lg:mt-16">
      {items.map((item, index) => (
        <LongTermRow key={item.label} item={item} index={index} />
      ))}
    </ol>
  )
}
