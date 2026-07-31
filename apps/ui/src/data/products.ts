import type { CatalogueCategory, CatalogueProduct } from '@/types/catalogue'

/**
 * Static catalogue is intentionally empty.
 * Products and categories are managed in Payload Admin (/admin → Catalogue).
 * `staticCategories` below are optional defaults used only when seeding categories
 * via `npm run seed:catalogue` — they are not shown on the site unless present in CMS.
 */
export const staticProducts: CatalogueProduct[] = []

export const staticCategories: CatalogueCategory[] = [
  {
    slug: 'residential-grid-tied',
    title: 'Residential Grid-Tied PV Inverter',
    description: 'Single- and three-phase grid-tied string inverters for residential rooftop solar systems.',
  },
  {
    slug: 'ci-grid-tied',
    title: 'C&I Grid-Tied PV Inverter',
    description: 'Three-phase grid-tied string inverters for commercial rooftops, carports, and industrial sites.',
  },
  {
    slug: 'utility-grid-tied',
    title: 'Utility Grid-Tied PV Inverter',
    description: 'High-capacity grid-tied inverters engineered for utility-scale solar plants.',
  },
  {
    slug: 'residential-hybrid',
    title: 'Residential Hybrid Inverter',
    description: 'Single- and three-phase hybrid inverters with battery integration for home energy storage.',
  },
  {
    slug: 'ci-hybrid',
    title: 'C&I Hybrid Inverter',
    description: 'High-power hybrid inverters for commercial and industrial energy storage applications.',
  },
]

/** @deprecated Use getCatalogueProducts() */
export const products = staticProducts

/** @deprecated Use getCategoryMeta() */
export const categoryMeta = Object.fromEntries(
  staticCategories.map((c) => [c.slug, { title: c.title, description: c.description }]),
)
