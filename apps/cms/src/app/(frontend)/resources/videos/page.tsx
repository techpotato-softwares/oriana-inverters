import Link from 'next/link'
import { Play } from 'lucide-react'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'

export const metadata = {
  title: 'Video Center',
  description: 'Installation tutorials, product overviews, and commissioning guides for Oriana inverters.',
}

const videos = [
  {
    title: 'Residential Hybrid — Unboxing & Wall Mount',
    category: 'Installation',
    duration: '8:42',
  },
  {
    title: 'Commissioning via Oriana Monitoring App',
    category: 'Commissioning',
    duration: '12:15',
  },
  {
    title: 'C&I Three-Phase — Rooftop Installation',
    category: 'Installation',
    duration: '15:30',
  },
  {
    title: 'Utility Grid-Tied — Plant Overview',
    category: 'Product Overview',
    duration: '6:20',
  },
  {
    title: 'Troubleshooting Common Fault Codes',
    category: 'Support',
    duration: '10:05',
  },
  {
    title: 'Battery Integration with Hybrid Inverters',
    category: 'Energy Storage',
    duration: '11:48',
  },
]

export default function VideosPage() {
  return (
    <main>
      <PageHero
        eyebrow="Resources"
        title="Video Center"
        description="Step-by-step installation guides, commissioning walkthroughs, and product overviews."
      />
      <Breadcrumbs items={[{ label: 'Resources', href: '/resources/downloads' }, { label: 'Videos' }]} />

      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <article
                key={video.title}
                className="group overflow-hidden rounded border border-oriana-navy/8 bg-white transition hover:border-oriana-blue/20 hover:shadow-lg"
              >
                <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-oriana-navy to-oriana-blue">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur transition group-hover:bg-white/30">
                    <Play className="h-6 w-6 fill-white text-white" />
                  </div>
                  <span className="absolute bottom-3 right-3 rounded bg-black/60 px-2 py-0.5 text-xs text-white">
                    {video.duration}
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-oriana-blue">{video.category}</p>
                  <h2 className="mt-2 font-semibold text-oriana-navy group-hover:text-oriana-blue">{video.title}</h2>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-oriana-muted">
            More videos coming soon. Subscribe to our{' '}
            <Link href="/posts" className="font-semibold text-oriana-blue hover:underline">
              newsroom
            </Link>{' '}
            for updates.
          </p>
        </div>
      </section>
    </main>
  )
}
