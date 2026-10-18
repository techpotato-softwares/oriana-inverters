import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowUpRight, Briefcase, MapPin } from 'lucide-react'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { CareerApplicationForm } from '@/components/oriana/CareerApplicationForm'
import { ComingSoon } from '@/components/oriana/ComingSoon'
import { FadeIn } from '@/components/oriana/FadeIn'
import { OrriMascot } from '@/components/oriana/mascot/OrriMascot'
import { lifeAtOriana } from '@/components/oriana/about/careers/careersData'
import {
  CultureSection,
  LifeIntroSection,
  WorkplaceSection,
} from '@/components/oriana/about/careers/LifeSections'
import { ValuesScroller } from '@/components/oriana/about/careers/ValuesScroller'
import { AboutHero, type AboutHeroMedia } from '@/components/oriana/about/shared/AboutHero'
import { SectionHeading } from '@/components/oriana/sustainability/SectionHeading'
import { SustainabilityCta } from '@/components/oriana/sustainability/SustainabilityCta'
import { getCareers, getJobs } from '@/utilities/getMarketing'
import type { Job, Media } from '@/payload-types'

/** Full-bleed hero needs a photo; SVG illustrations render as a flat colour block. */
function heroPhotoUrl(value: unknown): string | null {
  if (!value || typeof value !== 'object' || !('url' in value)) return null
  const { url, mimeType } = value as Media
  if (!url) return null
  if (mimeType === 'image/svg+xml' || /\.svg(\?|$)/i.test(url)) return null
  return url
}

export async function generateMetadata(): Promise<Metadata> {
  const careers = await getCareers()
  return {
    title: careers?.seo?.metaTitle || 'Careers — Life at ORIANA',
    description:
      careers?.seo?.metaDescription ||
      'Build the future of energy with ORIANA — engineering, manufacturing, sales and service careers in clean-energy technology.',
  }
}

export default async function CareersPage() {
  const [careers, jobs] = await Promise.all([getCareers(), getJobs() as Promise<Job[]>])
  const content = lifeAtOriana

  const hero = careers?.hero
  const cmsImage = heroPhotoUrl(hero?.image) || heroPhotoUrl(careers?.image)
  const heroMedia: AboutHeroMedia = cmsImage
    ? { kind: 'image', src: cmsImage, alt: 'Life at ORIANA' }
    : { kind: 'video', src: content.hero.video.src, poster: content.hero.video.poster }
  const applyLabel = careers?.applyLabel || 'Apply'
  const showLife = !careers?.lifeHidden
  const showOpenings = !careers?.openingsHidden
  const lifeLink = showLife
    ? { href: '#life', label: 'Life at ORIANA' }
    : { href: '/about', label: 'About ORIANA' }

  const openings = jobs.map((job) => ({
    title: job.title,
    location: job.location,
    department: job.department || '',
    type: job.type || 'Full-time',
    applyUrl: `/careers?role=${encodeURIComponent(job.title)}#apply`,
  }))

  return (
    <main>
      <AboutHero
        eyebrow={hero?.eyebrow || content.hero.eyebrow}
        title={hero?.title || content.hero.title}
        description={hero?.description || content.hero.description}
        media={heroMedia}
        primary={
          showOpenings
            ? { href: '#openings', label: 'Explore open positions' }
            : { href: '#apply', label: 'Apply now' }
        }
        secondary={showLife ? lifeLink : undefined}
      />
      <Breadcrumbs items={[{ label: 'About', href: '/about' }, { label: 'Careers' }]} />

      {showLife ? (
        <LifeIntroSection
          content={{
            ...content.intro,
            eyebrow: careers?.whyTitle || content.intro.eyebrow,
            paragraphs: careers?.whyBody ? [careers.whyBody] : content.intro.paragraphs,
          }}
        />
      ) : null}
      <WorkplaceSection
        content={{
          ...content.workplace,
          title: careers?.workplaceTitle?.trim() || content.workplace.title,
          lead: careers?.workplaceLead?.trim() || content.workplace.lead,
          closing: careers?.workplaceClosing?.trim() || content.workplace.closing,
        }}
      />
      <ValuesScroller
        id={content.values.id}
        eyebrow={content.values.eyebrow}
        title={careers?.valuesTitle?.trim() || content.values.title}
        values={content.values.items}
      />
      <CultureSection
        content={{
          ...content.culture,
          title: careers?.cultureTitle?.trim() || content.culture.title,
          body: careers?.cultureBody?.trim() || content.culture.body,
        }}
      />
      <SustainabilityCta
        content={{
          ...content.cta,
          title: careers?.ctaTitle?.trim() || content.cta.title,
          body: careers?.ctaBody?.trim() || content.cta.body,
        }}
      />

      {showOpenings ? (
        <section
          id="openings"
          aria-labelledby="openings-title"
          className="scroll-mt-header bg-white section-safe-y"
        >
          <div className="container">
            <FadeIn>
              <SectionHeading
                id="openings-title"
                eyebrow="Join the team"
                title={careers?.openingsTitle || 'Open positions'}
              />
            </FadeIn>
            {openings.length === 0 ? (
              <div className="mt-10">
                <ComingSoon
                  compact
                  title="Roles coming soon"
                  description="We are preparing current openings. Send your profile below and our team will keep you in mind."
                  primaryHref="#apply"
                  primaryLabel="Apply now"
                  secondaryHref={lifeLink.href}
                  secondaryLabel={lifeLink.label}
                />
              </div>
            ) : (
              <ul className="mt-10 grid gap-4 md:grid-cols-2">
                {openings.map((job, index) => (
                  <li key={job.title}>
                    <FadeIn delay={(index % 2) * 0.06} className="h-full">
                      <Link
                        href={job.applyUrl}
                        className="group flex h-full flex-col justify-between gap-6 rounded-3xl border border-oriana-navy/8 bg-oriana-surface p-6 transition-colors duration-300 hover:border-oriana-blue/30 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oriana-blue lg:p-8"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            {job.department ? (
                              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-oriana-blue">
                                {job.department}
                              </p>
                            ) : null}
                            <h3 className="mt-2 font-display text-xl font-semibold text-oriana-deep">
                              {job.title}
                            </h3>
                          </div>
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-oriana-blue transition-colors duration-300 group-hover:bg-oriana-blue group-hover:text-white">
                            <ArrowUpRight className="h-5 w-5" aria-hidden />
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-oriana-muted">
                          {job.location ? (
                            <span className="flex items-center gap-1.5">
                              <MapPin className="h-4 w-4" aria-hidden />
                              {job.location}
                            </span>
                          ) : null}
                          <span className="flex items-center gap-1.5">
                            <Briefcase className="h-4 w-4" aria-hidden />
                            {job.type}
                          </span>
                          <span className="ml-auto font-semibold text-oriana-blue">
                            {applyLabel}
                          </span>
                        </div>
                      </Link>
                    </FadeIn>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      ) : null}

      <section
        id="apply"
        aria-labelledby="apply-title"
        className="scroll-mt-header bg-oriana-surface section-safe-y"
      >
        <div className="container grid gap-12 lg:grid-cols-5 lg:gap-16">
          <FadeIn className="lg:col-span-2">
            <SectionHeading
              id="apply-title"
              eyebrow="Apply"
              title="Come build the future of energy with us."
              description="Send your resume even if a listed role is not an exact match. Applications are saved for HR and emailed to the team."
            />
            <div className="mt-10 hidden items-end gap-4 lg:flex">
              <OrriMascot pose="wave" className="w-36 shrink-0 xl:w-44" sizes="176px" />
              <p className="mb-6 rounded-2xl rounded-bl-sm bg-white px-4 py-3 text-sm font-medium text-oriana-deep shadow-[0_10px_30px_-14px_rgba(7,21,37,0.35)] ring-1 ring-oriana-navy/8">
                Hi, I’m Orri! I can’t wait to meet you.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.08} className="lg:col-span-3">
            <CareerApplicationForm />
          </FadeIn>
        </div>
      </section>
    </main>
  )
}
