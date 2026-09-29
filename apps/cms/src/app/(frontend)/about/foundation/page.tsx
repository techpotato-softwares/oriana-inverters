import type { Metadata } from 'next'

import { ComingSoon } from '@/components/oriana/ComingSoon'

export const metadata: Metadata = {
  title: 'Oriana Foundation',
  description:
    'The Oriana Foundation supports community solar access, STEM education, and environmental stewardship programmes.',
}

export default function OrianaFoundationPage() {
  return (
    <main>
      <ComingSoon
        eyebrow="About Us"
        title="Oriana Foundation"
        description="Foundation programmes and impact stories are being prepared. Contact us if you would like to partner on community energy initiatives."
        breadcrumbs={[
          { label: 'About Us', href: '/about' },
          { label: 'Oriana Foundation' },
        ]}
        primaryHref="/contact?intent=sales#contact-form"
        primaryLabel="Partner with us"
      />
    </main>
  )
}
