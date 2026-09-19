import type { Category, Download, Media, Product } from '@/payload-types'
import { slugifyLabel } from '@/data/productMaster'
import type {
  CatalogueCategory,
  CatalogueDownload,
  CatalogueProduct,
  CatalogueSegmentImage,
} from '@/types/catalogue'
import { productPageFromDoc } from '@/utilities/mapProductPage'

const segmentLabels: Record<string, string> = {
  residential: 'Residential',
  commercial: 'C&I',
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
  const url = media.url?.trim()
  if (!url) return null
  if (/^https?:\/\//i.test(url) || url.startsWith('/')) return url
  return `/${url}`
}

export function mapCategory(doc: Category): CatalogueCategory {
  const segments: CatalogueSegmentImage[] =
    doc.segments?.flatMap((segment) => {
      if (!segment?.name) return []
      return [
        {
          name: segment.name,
          slug: segment.slug?.trim() || slugifyLabel(segment.name),
          imageUrl: mediaUrl(segment.image),
        },
      ]
    }) ?? []

  const introParagraphs =
    doc.introParagraphs?.flatMap((paragraph) => {
      const text = paragraph?.text?.trim()
      return text ? [text] : []
    }) ?? []

  return {
    slug: doc.slug,
    title: doc.title,
    description: doc.description ?? '',
    sortOrder: doc.sortOrder ?? 100,
    imageUrl: mediaUrl(doc.image),
    heroImageUrl: mediaUrl(doc.heroImage),
    introParagraphs,
    segments,
  }
}

function familySpecs(doc: Product): { label: string; value: string }[] {
  return (
    doc.keySpecs?.map((s) => ({
      label: s.label,
      value: s.unit ? `${s.value} ${s.unit}`.trim() : s.value,
    })) ?? []
  )
}

function baseProductFields(doc: Product): Omit<
  CatalogueProduct,
  'slug' | 'name' | 'powerRange' | 'featured' | 'specs' | 'description'
> {
  const category = doc.category
  const categoryDoc = category && typeof category === 'object' ? category : null
  const modelSeries =
    doc.modelSeries ||
    familySpecs(doc).find((s) => s.label.toLowerCase() === 'model series')?.value ||
    doc.name ||
    null

  return {
    id: doc.id,
    category: categoryDoc?.title ?? 'Inverter',
    categorySlug: categoryDoc?.slug ?? 'on-grid-inverters',
    segment: segmentLabels[doc.segment ?? ''] ?? 'Residential',
    segmentKey: (doc.segment ?? 'residential') as CatalogueProduct['segmentKey'],
    efficiency: doc.efficiency ?? '—',
    phases: doc.phases ?? '—',
    warranty: doc.warranty ?? '10 Years',
    modelSeries,
    heroImageUrl: mediaUrl(doc.heroImage),
    heroImageAlt:
      doc.heroImage && typeof doc.heroImage === 'object' ? doc.heroImage.alt ?? doc.name : doc.name,
    datasheetUrl: mediaUrl(doc.datasheetPdf),
    productPage: productPageFromDoc(doc),
  }
}

/** Expand a family Product doc into capacity CatalogueProduct rows (or one legacy SKU). */
export function mapProductDoc(doc: Product): CatalogueProduct[] {
  const base = baseProductFields(doc)
  const specs = familySpecs(doc)
  const modelSeries = base.modelSeries
  const variants = doc.capacityVariants?.filter((variant) => variant?.modelNo?.trim()) ?? []

  if (variants.length > 0) {
    return variants.map((variant, index) => {
      const modelNo = variant.modelNo!.trim()
      const power = variant.powerRange?.trim() || doc.powerRange || '—'
      const compact = power.replace(/\s+/g, '')
      const slug = variant.slug?.trim() || slugifyLabel(modelNo)
      const withoutCapacityLabels = specs.filter((spec) => {
        const label = spec.label.toLowerCase()
        return label !== 'model' && label !== 'capacity' && label !== 'model series'
      })

      return {
        ...base,
        slug,
        name: compact && compact !== '—' ? `${compact} ${modelNo}` : modelNo,
        powerRange: power,
        featured: Boolean(variant.featured) || (Boolean(doc.featured) && index === 0),
        description: doc.shortDescription ?? '',
        specs: [
          { label: 'Model', value: modelNo },
          ...(modelSeries ? [{ label: 'Model Series', value: modelSeries }] : []),
          { label: 'Capacity', value: power },
          ...withoutCapacityLabels,
        ],
      }
    })
  }

  // Legacy capacity SKU docs (pre-family catalogue) still map 1:1.
  return [
    {
      ...base,
      slug: doc.slug,
      name: doc.name,
      powerRange: doc.powerRange ?? '—',
      featured: doc.featured ?? false,
      description: doc.shortDescription ?? '',
      specs,
    },
  ]
}

/** @deprecated Prefer mapProductDoc — kept for call sites that expect a single row. */
export function mapProduct(doc: Product): CatalogueProduct {
  return mapProductDoc(doc)[0]!
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
