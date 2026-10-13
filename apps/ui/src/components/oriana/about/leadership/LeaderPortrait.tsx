'use client'

import Image from 'next/image'
import { useState } from 'react'

import { leaderInitials, type Leader } from '@/components/oriana/about/leadership/leadershipData'
import { cn } from '@/utilities/ui'

/** Portrait that falls back to the built-in photo, then initials, if the CMS image fails. */
export function LeaderPortrait({
  leader,
  sizes,
  className,
  initialsClassName,
}: {
  leader: Leader
  sizes: string
  className?: string
  initialsClassName?: string
}) {
  const sources = [leader.image, leader.fallbackImage].filter(
    (src, index, all): src is string => Boolean(src) && all.indexOf(src) === index,
  )
  const [attempt, setAttempt] = useState(0)
  const src = sources[attempt]

  if (!src) {
    return (
      <span
        aria-hidden
        className={cn(
          'absolute inset-0 flex items-center justify-center font-display font-semibold text-oriana-blue/25',
          initialsClassName,
        )}
      >
        {leaderInitials(leader.name)}
      </span>
    )
  }

  return (
    <Image
      key={src}
      src={src}
      alt={`Portrait of ${leader.name}`}
      fill
      sizes={sizes}
      unoptimized={src.endsWith('.svg')}
      onError={() => setAttempt((current) => current + 1)}
      className={className}
    />
  )
}
