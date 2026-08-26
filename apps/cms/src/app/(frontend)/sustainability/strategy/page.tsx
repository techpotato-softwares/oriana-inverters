import type { Metadata } from 'next'
import { ContentPage } from '@/components/oriana/ContentPage'
import { getSustainability } from '@/utilities/getMarketing'

const fallbackSections = [
  {
    heading: '2030 Targets',
    paragraphs: [
      'Reduce Scope 1 and 2 greenhouse gas emissions by 50% versus 2020 baseline across all manufacturing facilities.',
      'Achieve 80% renewable electricity consumption at major production sites.',
      'Design 100% of new products for RoHS compliance and improved recyclability.',
    ],
  },
  {
    heading: 'Product Lifecycle',
    paragraphs: [
      'We conduct lifecycle assessments on flagship inverter platforms to identify opportunities to reduce embodied carbon in enclosures, semiconductors, and logistics.',
      'Extended warranty programmes and modular serviceability extend product life in the field, reducing e-waste.',
    ],
  },
  {
    heading: 'Supply Chain',
    paragraphs: [
      'Key suppliers are audited against our Supplier Code of Conduct covering labour practices, environmental management, and conflict minerals due diligence.',
    ],
  },
]

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSustainability()
  return {
    title: data?.strategyHero?.title || data?.seo?.metaTitle || 'Sustainability Strategy',
    description:
      data?.strategyHero?.description ||
      data?.seo?.metaDescription ||
      'Oriana Inverters environmental strategy and 2030 sustainability targets.',
  }
}

export default async function SustainabilityStrategyPage() {
  const data = await getSustainability()
  const strategyHero = data?.strategyHero
  const sections =
    data?.strategySections?.length
      ? data.strategySections.map((s) => ({
          heading: s.heading,
          paragraphs: s.body
            .split(/\n+/)
            .map((p) => p.trim())
            .filter(Boolean),
        }))
      : fallbackSections

  return (
    <ContentPage
      eyebrow={strategyHero?.eyebrow || 'Sustainability'}
      title={strategyHero?.title || 'Sustainability Strategy'}
      description={
        strategyHero?.description ||
        'Our roadmap to net-zero operations and responsible product lifecycle management.'
      }
      breadcrumb={[{ label: 'Sustainability', href: '/sustainability' }, { label: 'Strategy' }]}
      sections={sections}
    />
  )
}
