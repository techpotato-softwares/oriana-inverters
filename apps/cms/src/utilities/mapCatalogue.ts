import type { Category, Download, Media, Product } from '@/payload-types'
import type { CatalogueCategory, CatalogueDownload, CatalogueProduct } from '@/types/catalogue'

const segmentLabels: Record<string, string> = {
  residential: 'Residential',
  commercial: 'Commercial & Industrial',
  utility: 'Utility-Scale',
  storage: 'Energy Storage',
}

const documentTypeLabels: Record<string, string> = {
  datasheet: 'Datasheet',
  manual: 'Manual',
  certificate: 'Certificate',
  warranty: 'Warranty',
  brochure: 'Brochure',
  software: 'Software',
}

function mediaUrl(media?: number | Media | null): string | null {
  if (!media || typeof media === 'number') return null
  return media.url ?? null
}

export function mapCategory(doc: Category): CatalogueCategory {
  return {
    slug: doc.slug,
    title: doc.title,
    description: doc.description ?? '',
    sortOrder: doc.sortOrder ?? 100,
  }
}

export function mapProduct(doc: Product): CatalogueProduct {
  const category = doc.category
  const categoryDoc = category && typeof category === 'object' ? category : null
  const specs =
    doc.keySpecs?.map((s) => ({
      label: s.label,
      value: s.unit ? `${s.value} ${s.unit}`.trim() : s.value,
    })) ?? []

  const modelSeries =
    doc.modelSeries ||
    specs.find((s) => s.label.toLowerCase() === 'model series')?.value ||
    null

  return {
    id: doc.id,
    slug: doc.slug,
    name: doc.name,
    category: categoryDoc?.title ?? 'Inverter',
    categorySlug: categoryDoc?.slug ?? 'residential-grid-tied',
    segment: segmentLabels[doc.segment ?? ''] ?? 'Residential',
    segmentKey: (doc.segment ?? 'residential') as CatalogueProduct['segmentKey'],
    powerRange: doc.powerRange ?? '—',
    efficiency: doc.efficiency ?? '—',
    phases: doc.phases ?? '—',
    warranty: doc.warranty ?? '10 Years',
    featured: doc.featured ?? false,
    description: doc.shortDescription ?? '',
    modelSeries,
    specs,
    heroImageUrl: mediaUrl(doc.heroImage),
    heroImageAlt:
      doc.heroImage && typeof doc.heroImage === 'object' ? doc.heroImage.alt ?? doc.name : doc.name,
    datasheetUrl: mediaUrl(doc.datasheetPdf),
  }
}

export function mapDownload(doc: Download): CatalogueDownload {
  const related =
    doc.relatedProduct && typeof doc.relatedProduct === 'object' ? doc.relatedProduct.name : null

  return {
    id: doc.id,
    title: doc.title,
    documentType: doc.documentType,
    documentTypeLabel: documentTypeLabels[doc.documentType] ?? doc.documentType,
    fileUrl: mediaUrl(doc.file),
    relatedProductName: related,
  }
}
