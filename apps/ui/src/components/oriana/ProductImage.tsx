import Image from 'next/image'
import { cn } from '@/utilities/ui'

const categoryPlaceholders: Record<string, string> = {
  'on-grid-inverters': '/assets/products/single-phase.svg',
  'hybrid-inverters': '/assets/products/hybrid-storage.svg',
  'utility-scale-inverters': '/assets/products/utility-scale.svg',
  bess: '/assets/products/hybrid-storage.svg',
}

type ProductImageProps = {
  name: string
  categorySlug?: string
  src?: string | null
  alt?: string | null
  className?: string
  priority?: boolean
  sizes?: string
  plain?: boolean
}

export function ProductImage({
  name,
  categorySlug = 'on-grid-inverters',
  src,
  alt,
  className,
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
  plain = false,
}: ProductImageProps) {
  const placeholder =
    categoryPlaceholders[categorySlug] ?? categoryPlaceholders['on-grid-inverters']
  const imageSrc = src || placeholder
  const isSvg = imageSrc.endsWith('.svg')

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        plain
          ? 'aspect-[4/3] bg-white'
          : 'aspect-[4/3] bg-gradient-to-br from-oriana-silver to-white',
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
