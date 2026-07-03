'use client'

import { cn } from '@/utilities/ui'

export type VideoSource = {
  src: string
  type?: string
  resolution?: '1080p' | '4k'
}

type VideoBackgroundProps = {
  sources: VideoSource[]
  poster?: string
  className?: string
  overlayClassName?: string
  priority?: boolean
}

export function VideoBackground({
  sources,
  poster,
  className,
  overlayClassName,
  priority = false,
}: VideoBackgroundProps) {
  const sorted = [...sources].sort((a, b) => {
    const order = { '4k': 0, '1080p': 1 }
    return (order[a.resolution ?? '1080p'] ?? 1) - (order[b.resolution ?? '1080p'] ?? 1)
  })

  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
        preload={priority ? 'auto' : 'metadata'}
        className="h-full w-full object-cover"
      >
        {sorted.map((source) => (
          <source
            key={source.src}
            src={source.src}
            type={source.type ?? 'video/mp4'}
            media={
              source.resolution === '4k'
                ? '(min-width: 1920px)'
                : source.resolution === '1080p'
                  ? '(max-width: 1919px)'
                  : undefined
            }
          />
        ))}
      </video>
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-b from-oriana-navy/80 via-oriana-navy/60 to-oriana-navy/90',
          overlayClassName,
        )}
      />
    </div>
  )
}
