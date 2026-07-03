import Image from 'next/image'
import { cn } from '@/utilities/ui'

const categoryPlaceholders: Record<string, string> = {
  'single-phase': '/assets/products/single-phase.svg',
  'three-phase': '/assets/products/three-phase.svg',
  'utility-scale': '/assets/products/utility-scale.svg',
  'energy-storage': '/assets/products/hybrid-storage.svg',
  accessories: '/assets/products/accessories.svg',
}

type ProductImageProps = {
  name: string
  categorySlug?: string
  src?: string | null
  alt?: string | null
  className?: string
  priority?: boolean
  sizes?: string
}

export function ProductImage({
  name,
  categorySlug = 'single-phase',
  src,
  alt,
  className,
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
}: ProductImageProps) {
  const placeholder = categoryPlaceholders[categorySlug] ?? categoryPlaceholders['single-phase']
  const imageSrc = src || placeholder
  const isSvg = imageSrc.endsWith('.svg')

  return (
    <div
      className={cn(
        'relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-oriana-silver to-white',
        className,
      )}
    >
      <Image
        src={imageSrc}
        alt={alt || name}
        fill
        className="object-contain p-6 md:p-8"
        priority={priority}
        sizes={sizes}
        unoptimized={isSvg}
      />
    </div>
  )
}
