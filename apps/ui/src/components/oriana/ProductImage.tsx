import Image from 'next/image'
import { cn } from '@/utilities/ui'

const categoryPlaceholders: Record<string, string> = {
  'on-grid-inverters': '/assets/products/segment-string.png',
  'hybrid-inverters': '/assets/products/segment-string.png',
  'utility-scale-inverters': '/assets/products/segment-cabinet.png',
  bess: '/assets/products/segment-cabinet.png',
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
  const srcPath = src?.split('?')[0]?.toLowerCase() ?? ''
  const srcIsSvg = srcPath.endsWith('.svg')
  const imageSrc = src && !srcIsSvg ? src : placeholder
  const isSvg = imageSrc.split('?')[0]?.toLowerCase().endsWith('.svg') ?? false

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
        className="object-contain p-2 md:p-3"
        priority={priority}
        sizes={sizes}
        unoptimized={isSvg}
      />
    </div>
  )
}
