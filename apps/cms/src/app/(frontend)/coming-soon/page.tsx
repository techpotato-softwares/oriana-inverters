import type { Metadata } from 'next'

import { ComingSoon } from '@/components/oriana/ComingSoon'

export const metadata: Metadata = {
  title: 'Coming Soon',
  description: 'This Oriana section is being prepared. Check back soon or contact the team.',
  robots: { index: false, follow: true },
}

export default function ComingSoonPage() {
  return (
    <main>
      <ComingSoon
        title="Coming soon"
        description="We are finishing this part of the site with verified Oriana content. Explore products or contact us in the meantime."
        breadcrumbs={[{ label: 'Coming Soon' }]}
      />
    </main>
  )
}
