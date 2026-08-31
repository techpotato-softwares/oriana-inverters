import { ProductImage } from '@/components/oriana/ProductImage'

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
  if (group === 'C&I') {
    if (hybrid) return 'C&I Hybrid Inverter'
    if (onGrid) return 'C&I On Grid Inverter'
    return 'C&I Inverter'
  }
  if (categorySlug === 'bess') return 'Residential Energy Storage'
  if (categorySlug === 'utility-scale-inverters') return 'Utility Grid-Tied PV Inverter'
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
  typeLabel,
  title,
  name,
  categorySlug,
  imageSrc,
  imageAlt,
}: {
  href: string
  typeLabel: string
  title: string
  name: string
  categorySlug: string
  imageSrc?: string | null
  imageAlt?: string | null
}) {
  const documentsHref = `${href}?tab=documents`

  return (
    <article className="flex h-full flex-col rounded-3xl bg-white px-8 pb-8 pt-6 shadow-sm">
      <p className="text-sm font-medium leading-snug text-oriana-blue">{typeLabel}</p>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mx-auto flex w-40 items-center justify-center py-8"
      >
        <ProductImage
          name={name}
          categorySlug={categorySlug}
          src={imageSrc}
          alt={imageAlt}
          plain
          className="aspect-square w-40 bg-transparent"
          sizes="160px"
        />
      </a>

      <h3 className="text-center font-display text-xl font-semibold leading-snug tracking-tight text-oriana-navy md:text-2xl">
        <a href={href} target="_blank" rel="noopener noreferrer" className="line-clamp-3">
          {title}
        </a>
      </h3>

      <div className="mt-8 flex flex-col gap-3">
        <a href={href} target="_blank" rel="noopener noreferrer" className={actionClass}>
          Learn More
        </a>
        <a href={documentsHref} target="_blank" rel="noopener noreferrer" className={actionClass}>
          Documents & Installation
        </a>
      </div>
    </article>
  )
}
