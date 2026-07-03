'use client'

import Image from 'next/image'
import { cn } from '@/utilities/ui'
import { FadeIn } from './FadeIn'

export type GalleryImage = {
  src: string
  alt: string
  caption?: string
  layout?: 'wide' | 'tall' | 'square'
}

type ImageGalleryProps = {
  images: GalleryImage[]
  className?: string
}

const layoutClasses: Record<NonNullable<GalleryImage['layout']>, string> = {
  wide: 'md:col-span-2 md:row-span-1',
  tall: 'md:col-span-1 md:row-span-2',
  square: 'md:col-span-1 md:row-span-1',
}

export function ImageGallery({ images, className }: ImageGalleryProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[220px]',
        className,
      )}
    >
      {images.map((image, index) => (
        <FadeIn
          key={image.src}
          delay={index * 0.08}
          className={cn(
            'group relative overflow-hidden rounded-2xl bg-oriana-navy/10',
            layoutClasses[image.layout ?? 'square'],
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-oriana-navy/0 transition-colors duration-500 group-hover:bg-oriana-navy/30" />
          {image.caption && (
            <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100">
              {image.caption}
            </p>
          )}
        </FadeIn>
      ))}
    </div>
  )
}
