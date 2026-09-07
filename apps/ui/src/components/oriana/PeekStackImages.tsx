'use client'

import Link from 'next/link'
import { useLayoutEffect, useRef, useState, type RefObject } from 'react'
import {
  motion,
  useAnimationControls,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'

export type PeekStackImage = {
  id: string
  image: string
  alt?: string
  title?: string
  description?: string
  href?: string
}

export type PeekStackImagesProps = {
  images: PeekStackImage[]
  ariaLabel?: string
  className?: string
}

const FRAME_EXPANDED = { width: '100%', borderRadius: '0px' } as const
const FRAME_INSET = { width: '89.58%', borderRadius: '2.083vw' } as const
const FRAME_TRANSITION = { duration: 0.5, ease: 'easeInOut' } as const

/** Full-viewport panel height — match project pattern (Tailwind `h-dvh` is not emitted here). */
const PANEL_STYLE = { height: '100dvh', minHeight: '100dvh' } as const

/**
 * Sungrow `#ParallaxScrolling` port:
 * full-viewport panels + frame inset to 89.58%/2.083vw + scroll-linked translateY 0→40%.
 */
export function PeekStackImages({
  images,
  ariaLabel = 'Image stack',
  className = '',
}: PeekStackImagesProps) {
  const reduceMotion = useReducedMotion()
  const frameControls = useAnimationControls()
  const [insetTopPx, setInsetTopPx] = useState(80)
  const [insetTopPct, setInsetTopPct] = useState(8)
  const [ringVisible, setRingVisible] = useState(false)

  useLayoutEffect(() => {
    const sync = () => {
      const vh = Math.max(window.innerHeight, 1)
      // Align the rounded mask to the fixed header bottom so top corners
      // appear where the image meets the nav (Sungrow behavior).
      const headerEl = document.querySelector('header')
      const headerH = headerEl?.getBoundingClientRect().height ?? 0
      const topPx = Math.max(75, Math.ceil(headerH || 80))
      setInsetTopPx(topPx)
      setInsetTopPct((topPx / vh) * 100)
    }
    sync()
    window.addEventListener('resize', sync)
    window.addEventListener('scroll', sync, { passive: true })
    const headerEl = document.querySelector('header')
    const ro = headerEl ? new ResizeObserver(sync) : null
    if (headerEl && ro) ro.observe(headerEl)
    return () => {
      window.removeEventListener('resize', sync)
      window.removeEventListener('scroll', sync)
      ro?.disconnect()
    }
  }, [])

  // Keep ring width in sync from first paint (avoids 0-width white mask flash)
  useLayoutEffect(() => {
    void frameControls.set(FRAME_EXPANDED)
  }, [frameControls])

  if (!images.length) return null

  const viewportMargin = `0px 0px -${100 - insetTopPct}% 0px`

  return (
    <section
      className={`relative bg-white ${className}`.trim()}
      aria-label={ariaLabel}
      data-parallax-scrolling
    >
      {reduceMotion ? (
        <div className="mx-auto w-full overflow-hidden">
          <div className="relative left-1/2 w-full -translate-x-1/2">
            {images.map((item, index) => (
              <StackCard key={item.id} item={item} index={index} reduceMotion />
            ))}
          </div>
        </div>
      ) : (
        <>
          <motion.div
            initial={FRAME_EXPANDED}
            whileInView={FRAME_INSET}
            viewport={{ margin: viewportMargin, amount: 0 }}
            transition={FRAME_TRANSITION}
            className="mx-auto overflow-hidden"
            onViewportEnter={() => {
              setRingVisible(true)
              void frameControls.start(FRAME_INSET)
            }}
            onViewportLeave={() => {
              void frameControls.start(FRAME_EXPANDED).then(() => {
                setRingVisible(false)
              })
            }}
          >
            {/* Sungrow: relative left-1/2 -translate-x-1/2 */}
            <div className="relative left-1/2 w-full -translate-x-1/2">
              {images.map((item, index) => (
                <ParallaxCard key={item.id} item={item} index={index} />
              ))}
            </div>
          </motion.div>

          {/*
            Sungrow fixed viewport mask: rounded window just under the nav.
            White spread shadow paints the page around it so content scrolling
            up under the header gets matching top rounded corners.
            Inline shadow — Tailwind arbitrary shadow utilities are not emitted here.
          */}
          <motion.div
            initial={FRAME_EXPANDED}
            animate={frameControls}
            transition={FRAME_TRANSITION}
            aria-hidden
            className="pointer-events-none fixed left-1/2 z-40 -translate-x-1/2 overflow-hidden"
            style={{
              top: insetTopPx,
              height: '100vh',
              borderRadius: '2.083vw',
              boxShadow: '0 0 0 6.25vw #fff',
              visibility: ringVisible ? 'visible' : 'hidden',
            }}
          />
        </>
      )}
    </section>
  )
}

function ParallaxCard({ item, index }: { item: PeekStackImage; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['end end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])

  return <StackCard item={item} index={index} panelRef={ref} y={y} />
}

function StackCard({
  item,
  index,
  panelRef,
  y,
  reduceMotion = false,
}: {
  item: PeekStackImage
  index: number
  panelRef?: RefObject<HTMLDivElement | null>
  y?: MotionValue<string>
  reduceMotion?: boolean
}) {
  const panel = (
    <motion.div
      ref={panelRef}
      className="relative w-full text-white"
      style={
        reduceMotion || !y
          ? PANEL_STYLE
          : {
              ...PANEL_STYLE,
              y,
            }
      }
    >
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt={item.alt || item.title || ''}
          width={1920}
          height={1080}
          className="size-full object-cover"
          loading={index === 0 ? 'eager' : 'lazy'}
          draggable={false}
        />
      </div>

      {/* Readability scrim — keeps white titles legible on bright photos */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[42%]"
        style={{
          background:
            'linear-gradient(180deg, rgba(7,21,37,0.55) 0%, rgba(7,21,37,0.22) 45%, transparent 100%)',
        }}
      />

      <div
        className="relative flex h-full w-full flex-col justify-start px-[6.25vw]"
        style={{ paddingTop: 'max(7.5rem, 11vw)' }}
      >
        {item.title ? (
          reduceMotion ? (
            <div className="flex max-w-xl flex-col gap-3 sm:gap-4">
              <TitleCopy item={item} />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: '0px 0px -55% 0px' }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="flex max-w-xl flex-col gap-3 sm:gap-4"
            >
              <TitleCopy item={item} />
            </motion.div>
          )
        ) : null}
      </div>
    </motion.div>
  )

  if (item.href) {
    return (
      <Link href={item.href} className="block p-0 empty:hidden">
        {panel}
      </Link>
    )
  }

  return panel
}

function TitleCopy({ item }: { item: PeekStackImage }) {
  return (
    <>
      <h2
        className="font-display font-semibold leading-tight text-white"
        style={{
          fontSize: 'clamp(1.65rem, 2.4vw, 2.35rem)',
          textShadow: '0 2px 24px rgba(7, 21, 37, 0.45)',
        }}
      >
        <span className="inline-flex items-center gap-2">
          {item.title}
          {item.href ? (
            <span className="text-[0.8em] text-oriana-sky" aria-hidden>
              ›
            </span>
          ) : null}
        </span>
      </h2>
      {item.description ? (
        <p
          className="max-w-md leading-relaxed text-white/95"
          style={{
            fontSize: 'clamp(0.9rem, 1.05vw, 1.05rem)',
            textShadow: '0 1px 16px rgba(7, 21, 37, 0.4)',
          }}
        >
          {item.description}
        </p>
      ) : null}
    </>
  )
}
