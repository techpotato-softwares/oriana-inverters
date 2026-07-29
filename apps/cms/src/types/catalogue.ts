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
  specs: { label: string; value: string }[]
  heroImageUrl?: string | null
  heroImageAlt?: string | null
  datasheetUrl?: string | null
}

export type CatalogueCategory = {
  slug: string
  title: string
  description: string
}

export type CatalogueDownload = {
  id: string | number
  title: string
  documentType: string
  documentTypeLabel: string
  fileUrl?: string | null
  relatedProductName?: string | null
}
