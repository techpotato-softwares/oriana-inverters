'use client'

import Image from 'next/image'
import { motion, useInView, useReducedMotion, type TargetAndTransition } from 'framer-motion'
import { useRef } from 'react'

import { cn } from '@/utilities/ui'

export type OrriPose = 'wave' | 'point' | 'cheer'

const poses: Record<OrriPose, { src: string; width: number; height: number }> = {
  wave: { src: '/assets/mascot/orri-wave.webp', width: 619, height: 900 },
  point: { src: '/assets/mascot/orri-point.webp', width: 541, height: 900 },
  cheer: { src: '/assets/mascot/orri-cheer.webp', width: 788, height: 900 },
}

const entrances: Record<OrriPose, { initial: TargetAndTransition; animate: TargetAndTransition }> = {
  wave: {
    initial: { opacity: 0, y: 48, rotate: -8 },
    animate: { opacity: 1, y: 0, rotate: 0, transition: { type: 'spring', stiffness: 140, damping: 14 } },
  },
  point: {
    initial: { opacity: 0, x: 40, y: 12 },
    animate: { opacity: 1, x: 0, y: 0, transition: { type: 'spring', stiffness: 160, damping: 16 } },
  },
  cheer: {
    initial: { opacity: 0, y: 72, scale: 0.6 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 220, damping: 11 } },
  },
}

const idles: Record<OrriPose, TargetAndTransition> = {
  wave: {
    rotate: [0, -3, 2.5, -1.5, 0],
    transition: { duration: 2.6, repeat: Infinity, repeatDelay: 1.4, ease: 'easeInOut' },
  },
  point: {
    x: [0, -8, 0],
    transition: { duration: 1.4, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' },
  },
  cheer: {
    y: [0, -18, 0],
    transition: { duration: 0.9, repeat: Infinity, repeatDelay: 0.8, ease: [0.33, 1, 0.68, 1] },
  },
}

const shadowIdles: Record<OrriPose, TargetAndTransition> = {
  wave: { scaleX: 1 },
  point: { scaleX: 1 },
  cheer: {
    scaleX: [1, 0.7, 1],
    opacity: [0.35, 0.18, 0.35],
    transition: idles.cheer.transition,
  },
}

type OrriMascotProps = {
  pose: OrriPose
  className?: string
  /** Describe Orri only when the image adds meaning; decorative by default. */
  alt?: string
  priority?: boolean
  /** Animate on mount (success states) instead of when scrolled into view. */
  immediate?: boolean
  sizes?: string
}

/** ORIANA's panda mascot with pose-specific entrance and idle motion. */
export function OrriMascot({
  pose,
  className,
  alt = '',
  priority = false,
  immediate = false,
  sizes = '(min-width: 1024px) 240px, 160px',
}: OrriMascotProps) {
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref, { once: true, margin: '-40px' })
  const inView = useInView(ref)
  const reduceMotion = useReducedMotion()
  const asset = poses[pose]

  const image = (
    <Image
      src={asset.src}
      alt={alt}
      width={asset.width}
      height={asset.height}
      sizes={sizes}
      priority={priority}
      draggable={false}
      className="relative h-auto w-full select-none"
    />
  )

  if (reduceMotion) {
    return (
      <div ref={ref} className={cn('relative', className)} aria-hidden={alt ? undefined : true}>
        {image}
      </div>
    )
  }

  const entrance = entrances[pose]

  return (
    <div ref={ref} className={cn('relative', className)} aria-hidden={alt ? undefined : true}>
      <motion.div
        initial={entrance.initial}
        animate={immediate || seen ? entrance.animate : entrance.initial}
        className="relative"
      >
        <motion.div
          aria-hidden
          className="absolute inset-x-[18%] -bottom-1 h-3 rounded-[50%] bg-oriana-deep/35 blur-md"
          animate={inView ? shadowIdles[pose] : undefined}
        />
        <motion.div
          style={{ transformOrigin: '50% 100%' }}
          animate={inView ? idles[pose] : { x: 0, y: 0, rotate: 0 }}
        >
          {image}
        </motion.div>
      </motion.div>
    </div>
  )
}
