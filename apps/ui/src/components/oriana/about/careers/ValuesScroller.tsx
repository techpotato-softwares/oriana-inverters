'use client'

import Image from 'next/image'
import {
  GraduationCap,
  Handshake,
  Lightbulb,
  type LucideIcon,
  Rocket,
  Sprout,
  Trophy,
} from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import { FadeIn } from '@/components/oriana/FadeIn'
import type { CareerValue, CareerValueIcon } from '@/components/oriana/about/careers/careersData'
import { SectionHeading } from '@/components/oriana/sustainability/SectionHeading'
import { STICKY_BELOW_NAV_HEIGHT, STICKY_BELOW_NAV_TOP } from '@/components/oriana/useStickyScrub'
import { cn } from '@/utilities/ui'

const icons: Record<CareerValueIcon, LucideIcon> = {
  rocket: Rocket,
  lightbulb: Lightbulb,
  'graduation-cap': GraduationCap,
  handshake: Handshake,
  sprout: Sprout,
  trophy: Trophy,
}

/** Pin only where the cards fit comfortably beside a full-height viewport. */
const PIN_QUERY = '(min-width: 1024px) and (min-height: 700px)'

function ValueCard({ value, index }: { value: CareerValue; index: number }) {
  const Icon = icons[value.icon] ?? Rocket
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-oriana-navy/8 bg-white shadow-[0_24px_60px_-40px_rgba(7,21,37,0.35)]">
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-oriana-silver">
        <Image
          src={value.image}
          alt={value.alt}
          fill
          sizes="(min-width: 1024px) 26rem, 85vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        <span className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-oriana-blue shadow-sm">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <span className="absolute right-5 top-5 font-display text-sm font-semibold text-white drop-shadow">
          {`0${index + 1}`}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6 lg:p-7">
        <h3 className="font-display text-xl font-semibold uppercase tracking-[0.12em] text-oriana-deep">
          {value.title}
        </h3>
        <div className="mt-3 space-y-2 text-sm leading-6 text-oriana-muted">
          {value.body.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        {value.highlight ? (
          <p className="mt-auto pt-5">
            <span className="block border-l-2 border-oriana-sun pl-4 font-display text-base font-semibold leading-6 text-oriana-blue">
              {value.highlight}
            </span>
          </p>
        ) : null}
      </div>
    </article>
  )
}

/**
 * Values gallery: on large screens the section pins and the cards travel sideways
 * as the page scrolls; elsewhere it is a swipeable snap row.
 */
export function ValuesScroller({
  id,
  eyebrow,
  title,
  values,
}: {
  id: string
  eyebrow: string
  title: string
  values: CareerValue[]
}) {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLUListElement>(null)
  const reduceMotion = useReducedMotion()
  const [canPin, setCanPin] = useState(false)
  const [distance, setDistance] = useState(0)
  const pinned = canPin && !reduceMotion

  useEffect(() => {
    const query = window.matchMedia(PIN_QUERY)
    const update = () => setCanPin(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!pinned) return
    const measure = () => {
      const track = trackRef.current
      if (!track) return
      setDistance(Math.max(track.scrollWidth - track.clientWidth, 0))
    }
    measure()
    const observer = new ResizeObserver(measure)
    if (trackRef.current) observer.observe(trackRef.current)
    return () => observer.disconnect()
  }, [pinned, values.length])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0.04, 0.96], [0, -distance])
  const progressWidth = useTransform(scrollYProgress, [0.04, 0.96], ['0%', '100%'])

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-labelledby={`${id}-title`}
      className="relative scroll-mt-24 bg-oriana-surface"
      style={pinned ? { height: `calc(${distance}px + 100svh)` } : undefined}
    >
      <div
        className={cn(pinned ? 'sticky flex flex-col justify-center overflow-hidden' : 'py-20')}
        style={pinned ? { top: STICKY_BELOW_NAV_TOP, height: STICKY_BELOW_NAV_HEIGHT } : undefined}
      >
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <FadeIn>
              <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title} />
            </FadeIn>
            {pinned ? (
              <div aria-hidden className="mb-2 h-0.5 w-40 overflow-hidden rounded-full bg-oriana-navy/10">
                <motion.span className="block h-full bg-oriana-blue" style={{ width: progressWidth }} />
              </div>
            ) : null}
          </div>
        </div>

        <div className={cn('container', pinned ? 'mt-10' : 'mt-12')}>
          <motion.ul
            ref={trackRef}
            style={pinned ? { x } : undefined}
            className={cn(
              'flex gap-5 lg:gap-6',
              pinned
                ? 'overflow-visible'
                : '-mx-4 snap-x snap-mandatory overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
            )}
          >
            {values.map((value, index) => (
              <li key={value.key} className="w-[85vw] max-w-[26rem] shrink-0 snap-start sm:w-[24rem] lg:w-[26rem]">
                <ValueCard value={value} index={index} />
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
