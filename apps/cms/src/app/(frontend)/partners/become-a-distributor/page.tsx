import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { DistributorApplicationForm } from '@/components/oriana/DistributorApplicationForm'
import { FadeIn } from '@/components/oriana/FadeIn'
import { MediaHero } from '@/components/oriana/MediaHero'
import { partnersApplyDistributor as defaults } from '@/components/oriana/partners/partnersData'
import { getPartnersPage } from '@/utilities/getMarketing'
import {
  resolveCards,
  resolveHero,
  resolveIntro,
  resolveLink,
  resolveMeta,
  resolveText,
} from '@/utilities/cmsContent'

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPartnersPage()
  return resolveMeta(data?.applyDistributor?.meta, defaults.meta)
}

export default async function BecomeADistributorPage() {
  const cms = (await getPartnersPage())?.applyDistributor
  const hero = resolveHero(cms?.hero, defaults.hero)
  const intro = resolveIntro(cms?.intro, defaults.intro)
  const points = resolveCards(cms?.points, defaults.points)
  const programmeLink = resolveLink(cms?.programmeLink, defaults.programmeLink)
  const form = {
    title: resolveText(cms?.form?.title, defaults.form.title),
    body: resolveText(cms?.form?.body, defaults.form.body),
    successTitle: resolveText(cms?.form?.successTitle, defaults.form.successTitle),
    successMessage: resolveText(cms?.form?.successMessage, defaults.form.successMessage),
  }

  return (
    <main>
      <MediaHero
        eyebrow={hero.eyebrow || defaults.hero.eyebrow}
        title={hero.title}
        description={hero.description || defaults.hero.description}
        imageSrc={hero.image || defaults.hero.image}
        imageAlt="Solar array under a clear sky"
        primary={resolveLink(cms?.heroPrimary, defaults.heroPrimary)}
        secondary={resolveLink(cms?.heroSecondary, defaults.heroSecondary)}
      />
      <Breadcrumbs
        items={[
          { label: 'Partners', href: '/partners' },
          { label: 'Distributors', href: '/partners/distributors' },
          { label: 'Become a Distributor' },
        ]}
      />

      <section className="py-16 lg:py-24">
        <div className="container">
          <FadeIn>
            <h2 className="max-w-2xl font-display text-3xl font-semibold text-oriana-navy md:text-4xl">
              {intro.title}
            </h2>
            {intro.description ? (
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-oriana-muted">{intro.description}</p>
            ) : null}
          </FadeIn>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {points.map((point, index) => (
              <FadeIn key={point.title} delay={index * 0.06}>
                <h3 className="font-display text-xl font-semibold text-oriana-navy">{point.title}</h3>
                {point.body ? <p className="mt-3 text-sm leading-relaxed text-oriana-muted">{point.body}</p> : null}
              </FadeIn>
            ))}
          </div>
          <p className="mt-10 text-sm text-oriana-muted">
            Already looking for stock?{' '}
            <Link href={programmeLink.href} className="font-semibold text-oriana-blue hover:underline">
              {programmeLink.label}
            </Link>
            .
          </p>
        </div>
      </section>

      <section id="distributor-form" className="scroll-mt-32 bg-oriana-surface py-16 lg:py-24">
        <div className="container grid gap-12 lg:grid-cols-5 lg:gap-16">
          <FadeIn className="lg:col-span-2">
            <h2 className="font-display text-3xl font-semibold text-oriana-navy">{form.title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-oriana-muted">{form.body}</p>
          </FadeIn>
          <FadeIn delay={0.08} className="lg:col-span-3">
            <DistributorApplicationForm successTitle={form.successTitle} successMessage={form.successMessage} />
          </FadeIn>
        </div>
      </section>
    </main>
  )
}
