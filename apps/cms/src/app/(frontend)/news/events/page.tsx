import type { Metadata } from 'next'

import { AboutHero } from '@/components/oriana/about/shared/AboutHero'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { ComingSoon } from '@/components/oriana/ComingSoon'
import { NewsPageNav } from '@/components/oriana/news/NewsPageNav'
import { heroImages } from '@/components/oriana/heroImages'

export const metadata: Metadata = {
  title: 'Events',
  description: 'Trade shows, partner events, and Oriana appearances across India.',
}

export default function EventsPage() {
  return (
    <main>
      <AboutHero
        eyebrow="News & Media"
        title="Events"
        description="Trade shows, partner briefings, and Oriana appearances across India will be listed here."
        media={{ kind: 'image', src: heroImages.partners.src, alt: heroImages.partners.alt }}
        primary={{ label: 'Contact us', href: '/contact' }}
        secondary={{ label: 'Newsroom', href: '/news' }}
        nav={<NewsPageNav />}
      />
      <Breadcrumbs items={[{ label: 'News', href: '/news' }, { label: 'Events' }]} />
      <section className="section-safe-y">
        <div className="container max-w-3xl">
          <ComingSoon
            compact
            title="Events calendar coming soon"
            description="Upcoming exhibitions and partner events will appear here. Contact us if you would like to meet the Oriana team."
            primaryHref="/contact"
            primaryLabel="Contact us"
            secondaryHref="/news"
            secondaryLabel="Back to newsroom"
          />
        </div>
      </section>
    </main>
  )
}
