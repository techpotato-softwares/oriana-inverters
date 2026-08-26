import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { MapPin } from 'lucide-react'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { FadeIn } from '@/components/oriana/FadeIn'
import { PageHero } from '@/components/oriana/PageHero'
import { getCareers, getJobs } from '@/utilities/getMarketing'
import type { Job, Media } from '@/payload-types'

function mediaUrl(v: unknown): string | null {
  return v && typeof v === 'object' && 'url' in v && (v as Media).url ? (v as Media).url! : null
}

const fallbackOpenings = [
  {
    title: 'Power Electronics Engineer',
    location: 'San Jose, CA',
    department: 'R&D',
    type: 'Full-time',
    applyUrl: '/contact',
  },
  {
    title: 'Applications Engineer — Utility-Scale',
    location: 'Austin, TX',
    department: 'Technical Sales',
    type: 'Full-time',
    applyUrl: '/contact',
  },
  {
    title: 'Quality Assurance Specialist',
    location: 'Phoenix, AZ',
    department: 'Manufacturing',
    type: 'Full-time',
    applyUrl: '/contact',
  },
  {
    title: 'Customer Support Specialist',
    location: 'Remote — US',
    department: 'Service',
    type: 'Full-time',
    applyUrl: '/contact',
  },
]

export async function generateMetadata(): Promise<Metadata> {
  const careers = await getCareers()
  return {
    title: careers?.seo?.metaTitle || 'Careers',
    description:
      careers?.seo?.metaDescription ||
      'Join Oriana Inverters — engineering, manufacturing, sales, and support careers in clean energy.',
  }
}

export default async function CareersPage() {
  const [careers, jobs] = await Promise.all([getCareers(), getJobs() as Promise<Job[]>])

  const hero = careers?.hero
  const imageUrl =
    mediaUrl(careers?.image) || mediaUrl(hero?.image) || '/assets/illustrations/careers.svg'
  const applyHref = careers?.applyHref || '/contact'
  const applyLabel = careers?.applyLabel || 'Apply Now'

  const openings =
    jobs.length > 0
      ? jobs.map((job) => ({
          title: job.title,
          location: job.location,
          department: job.department || '',
          type: job.type || 'Full-time',
          applyUrl: job.applyUrl || applyHref,
        }))
      : fallbackOpenings

  return (
    <main>
      <PageHero
        eyebrow={hero?.eyebrow || 'About'}
        title={hero?.title || 'Careers at Oriana'}
        description={
          hero?.description ||
          'Build the future of clean power conversion with a global team of engineers, makers, and problem-solvers.'
        }
      />
      <Breadcrumbs items={[{ label: 'About', href: '/about' }, { label: 'Careers' }]} />

      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <FadeIn>
              <div className="relative aspect-[16/10] overflow-hidden rounded border border-oriana-navy/8">
                <Image
                  src={imageUrl}
                  alt="Oriana team at work"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-display text-2xl font-bold text-oriana-navy">
                {careers?.whyTitle || 'Why Oriana'}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-oriana-muted">
                {careers?.whyBody ||
                  'We offer competitive benefits, hybrid work options for eligible roles, and the opportunity to work on products deployed across 25 countries. Our culture values engineering rigour, customer partnership, and environmental responsibility.'}
              </p>
            </FadeIn>
          </div>

          <h2 className="mt-16 font-display text-xl font-bold text-oriana-navy">
            {careers?.openingsTitle || 'Open Positions'}
          </h2>
          <div className="mt-6 space-y-4">
            {openings.map((job, i) => (
              <FadeIn key={job.title} delay={i * 0.05}>
                <div className="flex flex-col gap-4 border border-oriana-navy/8 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-semibold text-oriana-navy">{job.title}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-oriana-muted">
                      <MapPin className="h-3.5 w-3.5" />
                      {[job.location, job.department, job.type].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                  <Link
                    href={job.applyUrl}
                    className="shrink-0 rounded-full border border-oriana-blue px-5 py-2 text-sm font-semibold text-oriana-blue hover:bg-oriana-blue hover:text-white"
                  >
                    {applyLabel}
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-oriana-muted">
            Don&apos;t see a fit?{' '}
            <Link href={applyHref} className="font-semibold text-oriana-blue hover:underline">
              Send us your résumé
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
