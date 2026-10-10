'use client'

import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

import { cn } from '@/utilities/ui'

/** Image that drifts slightly against the scroll inside a clipped frame. */
export function ParallaxImage({
  src,
  alt,
  sizes,
  className,
  imageClassName,
  strength = 8,
  priority,
}: {
  src: string
  alt: string
  sizes: string
  className?: string
  imageClassName?: string
  /** Max vertical drift in percent of the frame height. */
  strength?: number
  priority?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`])

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <motion.div
        className="absolute inset-0"
        style={reduceMotion ? undefined : { y, scale: 1 + (strength * 2.2) / 100 }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn('object-cover', imageClassName)}
        />
      </motion.div>
    </div>
  )
}
