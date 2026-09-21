import { ProductImageCarousel } from './ProductImageCarousel'
import type { ProductGalleryImage } from '@/types/catalogue'

export function productCardTypeLabel(group: string, categorySlug: string): string {
  const hybrid = categorySlug === 'hybrid-inverters'
  const onGrid = categorySlug === 'on-grid-inverters'

  if (group === 'Single Phase') {
    if (hybrid) return '1-Phase Hybrid Inverter'
    if (onGrid) return '1-Phase On Grid Inverter'
    return '1-Phase Inverter'
  }
  if (group === 'Three Phase') {
    if (hybrid) return '3-Phase Hybrid Inverter'
    if (onGrid) return '3-Phase On Grid Inverter'
    return '3-Phase Inverter'
  }
  if (group === 'C&I' || group === 'ORIANA BESS C&I') {
    if (categorySlug === 'bess') return 'C&I Energy Storage'
    if (hybrid) return 'C&I Hybrid Inverter'
    if (onGrid) return 'C&I On Grid Inverter'
    return 'C&I Inverter'
  }
  if (group === 'ORIANA BESS Home') return 'Residential Energy Storage'
  if (group === 'ORIANA BESS Core') return 'Utility Energy Storage'
  if (categorySlug === 'bess') return 'Residential Energy Storage'
  if (group === 'Utility Inverter' || categorySlug === 'utility-scale-inverters') {
    return 'Utility Grid-Tied PV Inverter'
  }
  return group
}

export function formatProductPowerLabel(powerRange: string): string {
  const text = powerRange.replace(/,/g, '').trim()
  if (!text || text === '—') return ''
  const unit = /\bkwh\b/i.test(text) ? 'kWh' : 'kW'
  const nums = [...text.matchAll(/(\d+(?:\.\d+)?)/g)].map((match) => match[1])
  if (!nums.length) return text
  if (nums.length === 1) return `${nums[0]} ${unit}`
  return `${nums[0]}~${nums[nums.length - 1]} ${unit}`
}

const actionClass =
  'block w-full rounded-full border-2 border-oriana-blue bg-white px-4 py-2.5 text-center text-sm font-semibold text-oriana-blue transition hover:bg-oriana-blue hover:text-white'

export function ProductSeriesCard({
  href,
  title,
  name,
  categorySlug,
  imageSrc,
  imageAlt,
  gallery,
}: {
  href: string
  title?: string
  name: string
  categorySlug: string
  imageSrc?: string | null
  imageAlt?: string | null
  gallery?: ProductGalleryImage[]
}) {
  const documentsHref = `${href}?tab=documents`

  return (
    <article className="flex h-full flex-col rounded-3xl bg-white px-8 pb-8 pt-6 shadow-sm">
      {/* px-5 clears the arrow overhang (half of a 36px control) on both edges. */}
      <div className="mx-auto flex w-full max-w-[12.5rem] items-center justify-center px-5 py-6">
        <ProductImageCarousel
          name={name}
          categorySlug={categorySlug}
          heroImageUrl={imageSrc}
          heroImageAlt={imageAlt}
          gallery={gallery}
          imageHref={href}
          variant="card"
          className="w-40"
          imageClassName="aspect-square"
          sizes="160px"
        />
      </div>

      {title ? <h3 className="product-card-name text-center leading-snug">{title}</h3> : null}

      <div className="mt-auto flex flex-col gap-3 pt-8">
        <a href={href} className={actionClass}>
          Learn More
        </a>
        <a href={documentsHref} className={actionClass}>
          Documents & Installation
        </a>
      </div>
    </article>
  )
}
