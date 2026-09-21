'use client'

import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { ProductImage } from './ProductImage'
import { cn } from '@/utilities/ui'
import type { ProductGalleryImage } from '@/types/catalogue'

type ProductImageCarouselProps = {
  name: string
  categorySlug: string
  heroImageUrl?: string | null
  heroImageAlt?: string | null
  gallery?: ProductGalleryImage[]
  /** Product page hero opts in via CMS; cards always carousel. */
  enabled?: boolean
  imageHref?: string
  variant?: 'hero' | 'card'
  className?: string
  imageClassName?: string
  priority?: boolean
  sizes?: string
}

function carouselImages({
  name,
  heroImageUrl,
  heroImageAlt,
  gallery,
  enabled,
}: Pick<
  ProductImageCarouselProps,
  'name' | 'heroImageUrl' | 'heroImageAlt' | 'gallery' | 'enabled'
>): ProductGalleryImage[] {
  const images: ProductGalleryImage[] = []
  const seen = new Set<string>()

  if (heroImageUrl) {
    images.push({ url: heroImageUrl, alt: heroImageAlt || name })
    seen.add(heroImageUrl)
  }

  if (!enabled) return images

  for (const image of gallery ?? []) {
    if (!image.url || seen.has(image.url)) continue
    images.push({ url: image.url, alt: image.alt || name })
    seen.add(image.url)
  }

  return images
}

export function ProductImageCarousel({
  name,
  categorySlug,
  heroImageUrl,
  heroImageAlt,
  gallery,
  enabled = true,
  imageHref,
  variant = 'hero',
  className,
  imageClassName,
  priority = false,
  sizes,
}: ProductImageCarouselProps) {
  const images = carouselImages({ name, heroImageUrl, heroImageAlt, gallery, enabled })
  const [activeIndex, setActiveIndex] = useState(0)
  const reduceMotion = useReducedMotion()
  const hasMultipleImages = images.length > 1
  const activeImage = images[Math.min(activeIndex, Math.max(images.length - 1, 0))]

  useEffect(() => {
    setActiveIndex(0)
  }, [heroImageUrl, gallery, enabled])

  useEffect(() => {
    if (variant !== 'hero' || !hasMultipleImages || reduceMotion) return
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length)
    }, 4500)
    return () => window.clearInterval(timer)
  }, [variant, hasMultipleImages, reduceMotion, images.length])

  const dots = hasMultipleImages ? (
    <div
      className={cn(
        'flex h-4 shrink-0 items-center justify-center gap-1.5',
        variant === 'card' ? 'mt-3' : 'mt-2 pb-1',
      )}
      aria-label="Choose product image"
    >
      {images.map((item, index) => (
        <button
          key={item.url}
          type="button"
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
            setActiveIndex(index)
          }}
          aria-label={`Show product image ${index + 1} of ${images.length}`}
          aria-current={index === activeIndex ? 'true' : undefined}
          className="flex h-4 w-4 touch-manipulation items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oriana-blue"
        >
          <span
            className={cn(
              'rounded-full transition',
              index === activeIndex ? 'h-2 w-2 bg-oriana-blue' : 'h-1.5 w-1.5 bg-oriana-navy/30',
            )}
          />
        </button>
      ))}
      <p className="sr-only" aria-live="polite">
        Image {activeIndex + 1} of {images.length}
      </p>
    </div>
  ) : variant === 'card' ? (
    <div className="mt-3 h-4" aria-hidden />
  ) : null

  const image = (
    <ProductImage
      name={name}
      categorySlug={categorySlug}
      src={activeImage?.url}
      alt={activeImage?.alt ?? heroImageAlt}
      className={cn('h-full w-full bg-transparent', imageClassName)}
      plain
      priority={priority && activeIndex === 0}
      sizes={sizes}
    />
  )

  return (
    <div
      className={cn(
        'group/carousel flex flex-col',
        variant === 'card' ? 'overflow-visible' : 'overflow-hidden',
        className,
      )}
      role={hasMultipleImages ? 'region' : undefined}
      aria-roledescription={hasMultipleImages ? 'carousel' : undefined}
      aria-label={hasMultipleImages ? `${name} product images` : undefined}
    >
      <div
        className={cn(
          'relative min-h-0 w-full',
          variant === 'card' ? 'aspect-square' : 'flex-1',
        )}
      >
        {imageHref ? (
          <a
            href={imageHref}
            aria-label={`View ${name}`}
            className="block h-full rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oriana-blue"
          >
            {image}
          </a>
        ) : (
          image
        )}
      </div>

      {dots}
    </div>
  )
}
