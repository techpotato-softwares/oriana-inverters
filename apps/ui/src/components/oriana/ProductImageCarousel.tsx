'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
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
  const hasMultipleImages = images.length > 1
  const activeImage = images[activeIndex]

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + images.length) % images.length)
  }

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % images.length)
  }

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
      className={cn('group/carousel relative overflow-hidden', className)}
      role={hasMultipleImages ? 'region' : undefined}
      aria-roledescription={hasMultipleImages ? 'carousel' : undefined}
      aria-label={hasMultipleImages ? `${name} product images` : undefined}
    >
      {imageHref ? (
        <a
          href={imageHref}
          aria-label={`View ${name}`}
          className="block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oriana-blue"
        >
          {image}
        </a>
      ) : (
        image
      )}

      {hasMultipleImages ? (
        <>
          <button
            type="button"
            onClick={showPrevious}
            aria-label="Show previous product image"
            className={cn(
              'absolute left-2 top-1/2 z-10 inline-flex touch-manipulation -translate-y-1/2 items-center justify-center rounded-full border border-oriana-navy/10 bg-white/90 text-oriana-navy shadow-sm backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oriana-blue',
              variant === 'card' ? 'h-9 w-9' : 'left-3 h-11 w-11',
            )}
          >
            <ChevronLeft className={variant === 'card' ? 'h-4 w-4' : 'h-5 w-5'} aria-hidden />
          </button>
          <button
            type="button"
            onClick={showNext}
            aria-label="Show next product image"
            className={cn(
              'absolute right-2 top-1/2 z-10 inline-flex touch-manipulation -translate-y-1/2 items-center justify-center rounded-full border border-oriana-navy/10 bg-white/90 text-oriana-navy shadow-sm backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oriana-blue',
              variant === 'card' ? 'h-9 w-9' : 'right-3 h-11 w-11',
            )}
          >
            <ChevronRight className={variant === 'card' ? 'h-4 w-4' : 'h-5 w-5'} aria-hidden />
          </button>

          <div
            className="absolute bottom-2.5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/90 px-2.5 py-1.5 shadow-sm backdrop-blur"
            aria-label={variant === 'hero' && images.length <= 7 ? 'Choose product image' : undefined}
          >
            {variant === 'card' || images.length > 7 ? (
              <span className="min-w-8 text-center text-[11px] font-semibold tabular-nums text-oriana-navy">
                {activeIndex + 1} / {images.length}
              </span>
            ) : (
              images.map((item, index) => (
                <button
                  key={item.url}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show product image ${index + 1} of ${images.length}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                  className="flex h-6 w-6 touch-manipulation items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oriana-blue"
                >
                  <span
                    className={cn(
                      'h-1.5 w-1.5 rounded-full transition',
                      index === activeIndex ? 'scale-125 bg-oriana-blue' : 'bg-oriana-navy/30',
                    )}
                  />
                </button>
              ))
            )}
          </div>
          <p className="sr-only" aria-live="polite">
            Image {activeIndex + 1} of {images.length}
          </p>
        </>
      ) : null}
    </div>
  )
}
