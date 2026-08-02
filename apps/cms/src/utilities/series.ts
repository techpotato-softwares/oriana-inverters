import type { CatalogueProduct, CatalogueSeries } from '@/types/catalogue'

/** Stable URL slug for a datasheet model series name (Excel column F). */
export function slugifySeries(series: string): string {
  return series
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function seriesNameOf(product: CatalogueProduct): string {
  return (
    product.modelSeries ||
    product.specs.find((s) => s.label.toLowerCase() === 'model series')?.value ||
    product.name
  )
}

function powerSortKey(powerRange: string): number {
  const match = powerRange.replace(',', '').match(/[\d.]+/)
  return match ? Number(match[0]) : 0
}

export function groupProductsIntoSeries(products: CatalogueProduct[]): CatalogueSeries[] {
  const groups = new Map<string, CatalogueProduct[]>()

  for (const product of products) {
    const series = seriesNameOf(product)
    const list = groups.get(series)
    if (list) list.push(product)
    else groups.set(series, [product])
  }

  return [...groups.entries()].map(([series, variants]) => {
    const sorted = [...variants].sort(
      (a, b) => powerSortKey(a.powerRange) - powerSortKey(b.powerRange),
    )
    const first = sorted[0]
    const last = sorted[sorted.length - 1]
    const powerRange =
      sorted.length === 1
        ? first.powerRange
        : `${first.powerRange} – ${last.powerRange}`

    return {
      series,
      slug: slugifySeries(series),
      category: first.category,
      categorySlug: first.categorySlug,
      segment: first.segment,
      segmentKey: first.segmentKey,
      phases: first.phases,
      powerRange,
      description:
        first.description ||
        `${first.phases} ${first.category} — ${sorted.length} capacity variants.`,
      heroImageUrl: first.heroImageUrl,
      heroImageAlt: first.heroImageAlt ?? series,
      variants: sorted,
    }
  })
}
