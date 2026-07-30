import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { FadeIn } from '@/components/oriana/FadeIn'
import { PageHero } from '@/components/oriana/PageHero'
import { getCareersContent, getJobsContent } from '@/utilities/getSiteContent'

export async function generateMetadata(): Promise<Metadata> {
  const content = await getCareersContent()
  return {
    title: content.seo?.metaTitle,
    description: content.seo?.metaDescription,
  }
}

export default async function CareersPage() {
  const [content, openings] = await Promise.all([getCareersContent(), getJobsContent()])

  return (
    <main>
      <PageHero
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        description={content.hero.description}
      />
      <Breadcrumbs items={[{ label: 'About', href: '/about' }, { label: 'Careers' }]} />

      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <FadeIn>
              <div className="relative aspect-[16/10] overflow-hidden rounded border border-oriana-navy/8">
                <Image
                  src={content.why.imageUrl}
                  alt="Oriana team at work"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-display text-2xl font-bold text-oriana-navy">{content.why.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-oriana-muted">{content.why.description}</p>
            </FadeIn>
          </div>

          <h2 className="mt-16 font-display text-xl font-bold text-oriana-navy">{content.openingsTitle}</h2>
          <div className="mt-6 space-y-4">
            {openings.map((job, i) => (
              <FadeIn key={job.title} delay={i * 0.05}>
                <div className="flex flex-col gap-4 border border-oriana-navy/8 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-semibold text-oriana-navy">{job.title}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-oriana-muted">
                      <MapPin className="h-3.5 w-3.5" />
                      {job.location} · {job.department} · {job.type}
                    </p>
                  </div>
                  <Link
                    href={job.applyUrl}
                    className="shrink-0 rounded-full border border-oriana-blue px-5 py-2 text-sm font-semibold text-oriana-blue hover:bg-oriana-blue hover:text-white"
                  >
                    Apply Now
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-oriana-muted">
            <Link href={content.fallbackCtaHref} className="font-semibold text-oriana-blue hover:underline">
              {content.fallbackCtaLabel}
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
