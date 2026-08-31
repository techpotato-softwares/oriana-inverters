export type CatalogueProduct = {
  id?: number | string
  slug: string
  name: string
  category: string
  categorySlug: string
  segment: string
  segmentKey: 'residential' | 'commercial' | 'utility' | 'storage'
  powerRange: string
  efficiency: string
  phases: string
  warranty: string
  featured?: boolean
  description: string
  modelSeries?: string | null
  specs: { label: string; value: string }[]
  heroImageUrl?: string | null
  heroImageAlt?: string | null
  datasheetUrl?: string | null
}

/** Datasheet model series (Excel col F) with capacity variants (cols H/I/J). */
export type CatalogueSeries = {
  series: string
  slug: string
  category: string
  categorySlug: string
  segment: string
  segmentKey: CatalogueProduct['segmentKey']
  phases: string
  powerRange: string
  description: string
  heroImageUrl?: string | null
  heroImageAlt?: string | null
  variants: CatalogueProduct[]
}

export type CatalogueSegmentImage = {
  name: string
  slug?: string | null
  imageUrl?: string | null
}

export type CatalogueCategory = {
  slug: string
  title: string
  description: string
  sortOrder?: number | null
  imageUrl?: string | null
  segments?: CatalogueSegmentImage[]
}

export type CatalogueNavItem = {
  title: string
  href: string
  description?: string
  products: { label: string; href: string; imageUrl?: string | null }[]
}

export type CatalogueDownload = {
  id: string | number
  title: string
  documentType: string
  documentTypeLabel: string
  fileUrl?: string | null
  relatedProductName?: string | null
}
