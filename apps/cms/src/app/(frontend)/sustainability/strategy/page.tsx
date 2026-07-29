import { ContentPage } from '@/components/oriana/ContentPage'

export const metadata = {
  title: 'Sustainability Strategy',
  description: 'Oriana Inverters environmental strategy and 2030 sustainability targets.',
}

export default function SustainabilityStrategyPage() {
  return (
    <ContentPage
      eyebrow="Sustainability"
      title="Sustainability Strategy"
      description="Our roadmap to net-zero operations and responsible product lifecycle management."
      breadcrumb={[{ label: 'Sustainability', href: '/sustainability' }, { label: 'Strategy' }]}
      sections={[
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
      ]}
    />
  )
}
