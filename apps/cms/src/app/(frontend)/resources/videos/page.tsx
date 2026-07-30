import type { Metadata } from 'next'
import Link from 'next/link'
import { Play } from 'lucide-react'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'
import { getPageIntros, getVideosContent } from '@/utilities/getSiteContent'

export async function generateMetadata(): Promise<Metadata> {
  const intros = await getPageIntros()
  return {
    title: intros.videos.title,
    description: intros.videos.description,
  }
}

export default async function VideosPage() {
  const [intros, videos] = await Promise.all([getPageIntros(), getVideosContent()])
  const intro = intros.videos

  return (
    <main>
      <PageHero eyebrow={intro.eyebrow} title={intro.title} description={intro.description} />
      <Breadcrumbs items={[{ label: 'Resources', href: '/resources/downloads' }, { label: 'Videos' }]} />

      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => {
              const body = (
                <>
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
                </>
              )
              return (
                <article
                  key={video.title}
                  className="group overflow-hidden rounded border border-oriana-navy/8 bg-white transition hover:border-oriana-blue/20 hover:shadow-lg"
                >
                  {video.videoUrl ? (
                    <Link href={video.videoUrl} target="_blank" rel="noopener noreferrer" className="block">
                      {body}
                    </Link>
                  ) : (
                    <div className="block">{body}</div>
                  )}
                </article>
              )
            })}
          </div>

          <p className="mt-10 text-center text-sm text-oriana-muted">{intro.footerNote}</p>
        </div>
      </section>
    </main>
  )
}
