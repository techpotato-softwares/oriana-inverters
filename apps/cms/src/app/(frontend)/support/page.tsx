import type { Metadata } from 'next'
import { SupportHero } from '@/components/oriana/support/SupportHero'
import { SupportSubNav } from '@/components/oriana/support/SupportSubNav'
import { SupportStrengths } from '@/components/oriana/support/SupportStrengths'
import { SupportApproach } from '@/components/oriana/support/SupportApproach'
import { GlobalPresence } from '@/components/oriana/support/GlobalPresence'
import { ServiceStories } from '@/components/oriana/support/ServiceStories'
import { SupportForYou } from '@/components/oriana/support/SupportForYou'
import { SupportResources } from '@/components/oriana/support/SupportResources'
import { SuccessStories } from '@/components/oriana/support/SuccessStories'

export const metadata: Metadata = {
  title: 'Support & Service | Oriana Inverters',
  description: 'Dependable service support throughout the product lifecycle for installers, homeowners, and businesses.',
}

export default function SupportPage() {
  return (
    <main className="min-h-screen">
      <SupportHero />
      <SupportSubNav />
      <SupportStrengths />
      <SupportApproach />
      <GlobalPresence />
      <ServiceStories />
      <SupportForYou />
      <SupportResources />
      <SuccessStories />
    </main>
  )
}
