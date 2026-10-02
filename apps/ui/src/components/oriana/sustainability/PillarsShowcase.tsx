'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  Boxes,
  Cpu,
  Factory,
  Leaf,
  type LucideIcon,
  MapPin,
  Recycle,
  RefreshCw,
  ShieldCheck,
  Sun,
  Users,
} from 'lucide-react'
import { type KeyboardEvent, useId, useRef, useState } from 'react'

import { FadeIn } from '@/components/oriana/FadeIn'
import { SectionHeading } from '@/components/oriana/sustainability/SectionHeading'
import type {
  PillarIcon,
  SectionIntro,
  SustainabilityPillar,
} from '@/components/oriana/sustainability/sustainabilityData'
import { cn } from '@/utilities/ui'

const icons: Record<PillarIcon, LucideIcon> = {
  'shield-check': ShieldCheck,
  cpu: Cpu,
  factory: Factory,
  boxes: Boxes,
  users: Users,
  'map-pin': MapPin,
  recycle: Recycle,
  'refresh-cw': RefreshCw,
  leaf: Leaf,
  sun: Sun,
}

const ease = [0.16, 1, 0.3, 1] as const

type PillarsShowcaseProps = {
  intro: SectionIntro
  pillars: SustainabilityPillar[]
}

export function PillarsShowcase({ intro, pillars }: PillarsShowcaseProps) {
  const [active, setActive] = useState(0)
  const reduceMotion = useReducedMotion()
  const baseId = useId()
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  if (pillars.length === 0) return null
  const current = pillars[Math.min(active, pillars.length - 1)]

  const focusTab = (index: number) => {
    const next = (index + pillars.length) % pillars.length
    setActive(next)
    tabRefs.current[next]?.focus()
    tabRefs.current[next]?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const keyMap: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowDown: index + 1,
      ArrowLeft: index - 1,
      ArrowUp: index - 1,
      Home: 0,
      End: pillars.length - 1,
    }
    if (event.key in keyMap) {
      event.preventDefault()
      focusTab(keyMap[event.key])
    }
  }

  const panelId = `${baseId}-panel`

  return (
    <section
      id="pillars"
      aria-labelledby={`${baseId}-heading`}
      className="relative scroll-mt-24 overflow-hidden bg-oriana-surface py-20 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-24 h-[32rem] w-[32rem] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(77,163,255,0.14) 0%, rgba(247,249,252,0) 70%)',
        }}
      />
      <div className="container relative">
        <FadeIn>
          <SectionHeading id={`${baseId}-heading`} {...intro} />
        </FadeIn>

        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] lg:gap-14">
          <div
            role="tablist"
            aria-label="Sustainability pillars"
            aria-orientation="vertical"
            className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
          >
            {pillars.map((pillar, index) => {
              const Icon = icons[pillar.icon] ?? Leaf
              const selected = index === active
              return (
                <button
                  key={pillar.title}
                  ref={(el) => {
                    tabRefs.current[index] = el
                  }}
                  type="button"
                  role="tab"
                  id={`${baseId}-tab-${index}`}
                  aria-selected={selected}
                  aria-controls={panelId}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(index)}
                  onKeyDown={(event) => onKeyDown(event, index)}
                  className={cn(
                    'group relative flex min-h-14 shrink-0 snap-start items-center gap-4 rounded-full border px-5 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oriana-blue',
                    'lg:min-h-0 lg:rounded-none lg:border-0 lg:border-b lg:border-oriana-deep/10 lg:px-0 lg:py-6',
                    selected
                      ? 'border-oriana-blue bg-oriana-blue text-white lg:bg-transparent lg:text-oriana-blue'
                      : 'border-oriana-deep/10 bg-white text-oriana-navy hover:text-oriana-blue lg:bg-transparent',
                  )}
                >
                  <span
                    className={cn(
                      'hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 lg:flex',
                      selected
                        ? 'border-oriana-blue bg-oriana-blue text-white'
                        : 'border-oriana-deep/10 bg-white text-oriana-blue',
                    )}
                    aria-hidden
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="whitespace-nowrap font-display text-sm font-semibold lg:whitespace-normal lg:text-lg lg:font-medium">
                    {pillar.title}
                  </span>
                  {selected ? (
                    <motion.span
                      layoutId={reduceMotion ? undefined : `${baseId}-indicator`}
                      className="absolute inset-x-0 -bottom-px hidden h-0.5 bg-oriana-blue lg:block"
                      transition={{ duration: 0.45, ease }}
                      aria-hidden
                    />
                  ) : null}
                </button>
              )
            })}
          </div>

          <div
            role="tabpanel"
            id={panelId}
            aria-labelledby={`${baseId}-tab-${active}`}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-oriana-deep sm:aspect-[16/10]">
              {pillars.map((pillar, index) => {
                const selected = index === active
                return (
                  <motion.div
                    key={pillar.title}
                    className="absolute inset-0"
                    initial={false}
                    animate={{
                      opacity: selected ? 1 : 0,
                      scale: selected || reduceMotion ? 1 : 1.06,
                    }}
                    transition={{ duration: reduceMotion ? 0 : 0.9, ease }}
                    aria-hidden={!selected}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={pillar.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                )
              })}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(0deg, rgba(7,21,37,0.88) 0%, rgba(7,21,37,0.45) 45%, rgba(7,21,37,0) 75%)',
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={current.title}
                    initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                    transition={{ duration: reduceMotion ? 0 : 0.5, ease }}
                  >
                    <h3
                      className="max-w-xl font-display font-medium tracking-[-0.01em] text-balance text-white"
                      style={{ fontSize: 'clamp(1.4rem, 2.4vw, 2.25rem)', lineHeight: 1.15 }}
                    >
                      {current.headline}
                    </h3>
                    <p className="mt-4 hidden max-w-2xl text-sm leading-7 text-white/80 sm:block sm:text-base sm:leading-8">
                      {current.body}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            <p className="mt-5 text-sm leading-7 text-oriana-muted sm:hidden">{current.body}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
