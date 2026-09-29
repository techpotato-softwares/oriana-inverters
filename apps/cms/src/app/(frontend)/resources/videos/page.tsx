import Link from 'next/link'
import { Play } from 'lucide-react'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { ComingSoon } from '@/components/oriana/ComingSoon'
import { PageHero } from '@/components/oriana/PageHero'
import { getVideos } from '@/utilities/getMarketing'
import type { Video } from '@/payload-types'

export const metadata = {
  title: 'Video Center',
  description: 'Installation tutorials, product overviews, and commissioning guides for Oriana inverters.',
}

export default async function VideosPage() {
  const docs = (await getVideos()) as Video[]

  if (docs.length === 0) {
    return (
      <main>
        <ComingSoon
          eyebrow="Resources"
          title="Video Center"
          description="Installation and product videos will appear here once published. Browse downloads for written guides in the meantime."
          breadcrumbs={[
            { label: 'Resources', href: '/resources/downloads' },
            { label: 'Videos' },
          ]}
          primaryHref="/resources/downloads"
          primaryLabel="Download Center"
        />
      </main>
    )
  }

  const videos = docs.map((v) => ({
    title: v.title,
    category: v.category || '',
    duration: v.duration || '',
    href: v.embedUrl || undefined,
  }))

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
            {videos.map((video) => {
              const card = (
                <>
                  <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-oriana-deep to-oriana-blue">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur transition group-hover:bg-white/30">
                      <Play className="h-6 w-6 text-white" fill="currentColor" />
                    </div>
                    {video.duration ? (
                      <span className="absolute bottom-3 right-3 rounded bg-black/50 px-2 py-0.5 text-xs text-white">
                        {video.duration}
                      </span>
                    ) : null}
                  </div>
                  <div className="p-5">
                    {video.category ? (
                      <p className="text-xs font-semibold uppercase tracking-widest text-oriana-blue">
                        {video.category}
                      </p>
                    ) : null}
                    <h2 className="mt-2 font-semibold text-oriana-navy">{video.title}</h2>
                  </div>
                </>
              )

              return video.href ? (
                <Link
                  key={video.title}
                  href={video.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group overflow-hidden rounded border border-oriana-navy/8 bg-white transition hover:border-oriana-blue/30 hover:shadow-lg"
                >
                  {card}
                </Link>
              ) : (
                <div
                  key={video.title}
                  className="overflow-hidden rounded border border-oriana-navy/8 bg-white"
                >
                  {card}
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
