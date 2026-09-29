import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { MapPin } from 'lucide-react'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { ComingSoon } from '@/components/oriana/ComingSoon'
import { FadeIn } from '@/components/oriana/FadeIn'
import { MediaHero } from '@/components/oriana/MediaHero'
import { getCareers, getJobs } from '@/utilities/getMarketing'
import type { Job, Media } from '@/payload-types'

function mediaUrl(value: unknown): string | null {
  return value && typeof value === 'object' && 'url' in value && (value as Media).url
    ? (value as Media).url!
    : null
}

const careerApplyHref = '/contact?intent=career#contact-form'

function applyHref(url: string | null | undefined, fallback: string): string {
  if (!url || url === '/contact' || url === '/contact/') return fallback
  return url
}

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
    mediaUrl(careers?.image) ||
    mediaUrl(hero?.image) ||
    'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2400&q=80'
  const lifeImage =
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=80'
  const applyHrefDefault = applyHref(careers?.applyHref, careerApplyHref)
  const applyLabel = careers?.applyLabel || 'Apply'

  const openings = jobs.map((job) => ({
    title: job.title,
    location: job.location,
    department: job.department || '',
    type: job.type || 'Full-time',
    applyUrl: applyHref(job.applyUrl, applyHrefDefault),
  }))

  return (
    <main>
      <MediaHero
        eyebrow={hero?.eyebrow || 'Careers'}
        title={hero?.title || 'Careers at Oriana'}
        description={
          hero?.description ||
          'Build clean power conversion with engineers, makers, and people who stay close to the field.'
        }
        imageSrc={imageUrl}
        imageAlt="Solar installation representing work at Oriana"
        unoptimized={imageUrl.endsWith('.svg')}
        primary={{ href: '#openings', label: 'Open positions' }}
        secondary={{ href: '#life', label: 'Life at Oriana' }}
      />
      <Breadcrumbs items={[{ label: 'About', href: '/about' }, { label: 'Careers' }]} />

      <section id="life" className="scroll-mt-32 py-16 lg:py-24">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <FadeIn>
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={lifeImage}
                alt="Engineer working on power electronics"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h2 className="font-display text-3xl font-semibold text-oriana-navy md:text-4xl">
              {careers?.whyTitle || 'Life at Oriana'}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-oriana-muted">
              {careers?.whyBody ||
                'We offer competitive benefits, hybrid work options for eligible roles, and the chance to work on products deployed across many markets. The culture values engineering rigour, customer partnership, and environmental responsibility.'}
            </p>
            <Link
              href="#apply"
              className="mt-8 inline-flex rounded-full bg-oriana-blue px-6 py-3 text-sm font-bold text-white transition hover:bg-oriana-deep"
            >
              Apply now
            </Link>
          </FadeIn>
        </div>
      </section>

      <section id="openings" className="scroll-mt-32 border-t border-oriana-navy/8 py-16 lg:py-24">
        <div className="container">
          <FadeIn>
            <h2 className="font-display text-3xl font-semibold text-oriana-navy md:text-4xl">
              {careers?.openingsTitle || 'Open positions'}
            </h2>
          </FadeIn>
          {openings.length === 0 ? (
            <div className="mt-8">
              <ComingSoon
                compact
                title="Roles coming soon"
                description="We are preparing current openings. Send your profile below and our team will keep you in mind."
                primaryHref={applyHrefDefault}
                primaryLabel="Send your profile"
                secondaryHref="#life"
                secondaryLabel="Life at Oriana"
              />
            </div>
          ) : (
            <div className="mt-8 divide-y divide-oriana-navy/8 border-y border-oriana-navy/8">
              {openings.map((job, index) => (
                <FadeIn key={job.title} delay={index * 0.04}>
                  <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-semibold text-oriana-navy">{job.title}</h3>
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-oriana-muted">
                        <MapPin className="h-3.5 w-3.5" aria-hidden />
                        {[job.location, job.department, job.type].filter(Boolean).join(' · ')}
                      </p>
                    </div>
                    <Link
                      href={job.applyUrl}
                      className="shrink-0 rounded-full border border-oriana-blue px-5 py-2 text-sm font-semibold text-oriana-blue transition hover:bg-oriana-blue hover:text-white"
                    >
                      {applyLabel}
                    </Link>
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="apply" className="scroll-mt-32 bg-oriana-deep py-16 text-white lg:py-24">
        <div className="container grid gap-8 lg:grid-cols-[1.4fr_auto] lg:items-center">
          <FadeIn>
            <h2 className="font-display text-3xl font-semibold md:text-4xl">Apply now</h2>
            <p className="mt-4 max-w-xl text-white/75">
              Send your profile even if a listed role is not an exact match. Our team reads every application.
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <Link
              href={applyHrefDefault}
              className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold text-oriana-navy transition hover:bg-oriana-silver"
            >
              Send your profile
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  )
}
