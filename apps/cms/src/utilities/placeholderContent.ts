import { caseStudies } from '@/data/caseStudies'
import { staticDistributors } from '@/data/distributors'

/** Seeded marketing rows that should not render on the public site. */
const PLACEHOLDER_VALUES: Record<string, { field: string; values: Set<string> }> = {
  jobs: {
    field: 'title',
    values: new Set([
      'Power Electronics Engineer',
      'Applications Engineer — Utility-Scale',
      'Quality Assurance Specialist',
      'Customer Support Specialist',
    ]),
  },
  certifications: {
    field: 'name',
    values: new Set([
      'UL 1741 SA',
      'IEEE 1547-2018',
      'IEC 62109-1/2',
      'EN 50549',
      'ISO 9001:2015',
      'ISO 14001:2015',
    ]),
  },
  awards: {
    field: 'title',
    values: new Set([
      'Top Brand — Solar Inverters',
      'Innovation Award — Hybrid Technology',
      'Bankability Leader',
    ]),
  },
  partners: {
    field: 'name',
    values: new Set([
      'SolarEdge Distribution NA',
      'GreenPower Wholesale',
      'EuroSolar Components',
      'APAC Energy Solutions',
      'Leading Battery OEMs',
      'Monitoring Platform Integrators',
      'EV Charger Manufacturers',
      'Smart Home Ecosystems',
      'Tier-1 Solar Developers',
      'Commercial Rooftop Specialists',
      'Utility-Scale EPC Firms',
      'Microgrid Integrators',
    ]),
  },
  faqs: {
    field: 'question',
    values: new Set([
      'How do I choose between single-phase and three-phase inverters?',
      'Are Oriana hybrid inverters compatible with third-party batteries?',
      'Who can install Oriana inverters?',
      'How do I register my inverter for warranty?',
      'How do I connect my inverter to WiFi?',
      'What should I do if my inverter shows a fault code?',
    ]),
  },
  videos: {
    field: 'title',
    values: new Set([
      'Residential Hybrid — Unboxing & Wall Mount',
      'Commissioning via Oriana Monitoring App',
      'C&I Three-Phase — Rooftop Installation',
      'Utility Grid-Tied — Plant Overview',
      'Troubleshooting Common Fault Codes',
      'Battery Integration with Hybrid Inverters',
    ]),
  },
  'warranty-plans': {
    field: 'productLine',
    values: new Set([
      'Residential String & Hybrid',
      'Commercial Three-Phase',
      'Utility-Scale Central',
    ]),
  },
  'sustainability-reports': {
    field: 'title',
    values: new Set([
      '2025 ESG & Sustainability Report',
      'Environmental Policy',
      'Supplier Code of Conduct',
      'Conflict Minerals Statement',
      'ISO 14001 Certificate',
    ]),
  },
  'case-studies': {
    field: 'slug',
    values: new Set(caseStudies.map((study) => study.slug)),
  },
  distributors: {
    field: 'slug',
    values: new Set(staticDistributors.map((distributor) => distributor.id)),
  },
}

const PLACEHOLDER_STRATEGY_HEADINGS = new Set(['2030 Targets', 'Product Lifecycle', 'Supply Chain'])

const PLACEHOLDER_SUSTAINABILITY_HIGHLIGHTS = new Set([
  'Renewable energy at manufacturing sites',
  'Environmental management certified',
  'ESG report published',
  'Clean energy units deployed',
])

const PLACEHOLDER_SUSTAINABILITY_TITLES = new Set([
  'Powering a Sustainable Future',
  'Green Mission. Better Life',
])

export function realSustainabilityHighlights<T extends { label?: string | null }>(
  items: T[] | null | undefined,
): T[] {
  return (items ?? []).filter(
    (item) => item.label && !PLACEHOLDER_SUSTAINABILITY_HIGHLIGHTS.has(item.label),
  )
}

export function isPlaceholderSustainabilityTitle(title: string | null | undefined): boolean {
  return !title || PLACEHOLDER_SUSTAINABILITY_TITLES.has(title)
}

export const PLACEHOLDER_POST_SLUGS = [
  'digital-horizons',
  'global-gaze',
  'dollar-and-sense-the-financial-forecast',
] as const

export function withoutPlaceholderDocs<T>(collection: string, docs: T[]): T[] {
  const rule = PLACEHOLDER_VALUES[collection]
  if (!rule) return docs
  return docs.filter((doc) => {
    const value = (doc as Record<string, unknown>)[rule.field]
    return typeof value !== 'string' || !rule.values.has(value)
  })
}

export function isPlaceholderSlug(collection: string, slug: string): boolean {
  const rule = PLACEHOLDER_VALUES[collection]
  return Boolean(rule && rule.field === 'slug' && rule.values.has(slug))
}

export function realStrategySections<T extends { heading?: string | null }>(
  sections: T[] | null | undefined,
): T[] {
  return (sections ?? []).filter(
    (section) => section.heading && !PLACEHOLDER_STRATEGY_HEADINGS.has(section.heading),
  )
}
