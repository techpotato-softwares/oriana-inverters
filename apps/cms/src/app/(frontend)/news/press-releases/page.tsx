import type { Metadata } from 'next'

import { AboutHero } from '@/components/oriana/about/shared/AboutHero'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { ComingSoon } from '@/components/oriana/ComingSoon'
import { NewsPageNav } from '@/components/oriana/news/NewsPageNav'
import { heroImages } from '@/components/oriana/heroImages'

export const metadata: Metadata = {
  title: 'Press Releases',
  description: 'Official press releases and media statements from Oriana Inverters.',
}

export default function PressReleasesPage() {
  return (
    <main>
      <AboutHero
        eyebrow="News & Media"
        title="Press Releases"
        description="Official statements and media kits from Oriana. Published releases will appear below."
        media={{ kind: 'image', src: heroImages.content.src, alt: heroImages.content.alt }}
        primary={{ label: 'Media enquiry', href: '/contact' }}
        secondary={{ label: 'Newsroom', href: '/news' }}
        nav={<NewsPageNav />}
      />
      <Breadcrumbs
        items={[{ label: 'News', href: '/news' }, { label: 'Press Releases' }]}
      />
      <section className="section-safe-y">
        <div className="container max-w-3xl">
          <ComingSoon
            compact
            title="Press releases coming soon"
            description="We are preparing verified press content for this channel. Reach out for media enquiries in the meantime."
            primaryHref="/contact"
            primaryLabel="Media enquiry"
            secondaryHref="/news"
            secondaryLabel="Back to newsroom"
          />
        </div>
      </section>
    </main>
  )
}
