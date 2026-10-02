import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { ComingSoon } from '@/components/oriana/ComingSoon'
import { PageHero } from '@/components/oriana/PageHero'
import { aboutCertifications as defaults } from '@/components/oriana/about/aboutData'
import { getAbout, getAwards, getCertifications } from '@/utilities/getMarketing'
import { resolveMeta, resolveText } from '@/utilities/cmsContent'
import type { Award, Certification } from '@/payload-types'

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAbout()
  return resolveMeta(about?.certifications?.meta, defaults.meta)
}

export default async function CertificationsPage() {
  const [cmsCerts, cmsAwards, about] = await Promise.all([
    getCertifications() as Promise<Certification[]>,
    getAwards() as Promise<Award[]>,
    getAbout(),
  ])
  const cms = about?.certifications
  const hero = {
    eyebrow: resolveText(cms?.hero?.eyebrow, defaults.hero.eyebrow),
    title: resolveText(cms?.hero?.title, defaults.hero.title),
    description: resolveText(cms?.hero?.description, defaults.hero.description),
  }
  const breadcrumbs = [{ label: 'About', href: '/about' }, { label: 'Certifications' }]

  if (cmsCerts.length === 0 && cmsAwards.length === 0) {
    return (
      <main>
        <ComingSoon
          eyebrow={hero.eyebrow}
          title={hero.title}
          description={resolveText(cms?.emptyDescription, defaults.emptyDescription)}
          breadcrumbs={breadcrumbs}
        />
      </main>
    )
  }

  const certifications = cmsCerts.map((c) => ({
    name: c.name,
    scope: c.scope || '',
    region: c.region || '',
  }))

  const awards = cmsAwards.map((a) => ({
    year: a.year,
    title: a.title,
    org: a.org || '',
  }))

  return (
    <main>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} description={hero.description} />
      <Breadcrumbs items={breadcrumbs} />

      <section className="py-12 lg:py-16">
        <div className="container">
          {certifications.length > 0 ? (
            <>
              <h2 className="font-display text-2xl font-bold text-oriana-navy">
                {resolveText(cms?.certificationsTitle, defaults.certificationsTitle)}
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {certifications.map((cert) => (
                  <div key={cert.name} className="rounded border border-oriana-navy/8 p-6">
                    <p className="font-display text-lg font-bold text-oriana-blue">{cert.name}</p>
                    {cert.scope ? <p className="mt-2 text-sm text-oriana-navy">{cert.scope}</p> : null}
                    {cert.region ? <p className="mt-1 text-xs text-oriana-muted">{cert.region}</p> : null}
                  </div>
                ))}
              </div>
            </>
          ) : null}

          {awards.length > 0 ? (
            <>
              <h2 className="mt-16 font-display text-2xl font-bold text-oriana-navy">
                {resolveText(cms?.awardsTitle, defaults.awardsTitle)}
              </h2>
              <div className="mt-8 space-y-4">
                {awards.map((award) => (
                  <div
                    key={`${award.year}-${award.title}`}
                    className="flex flex-col gap-2 rounded border border-oriana-navy/8 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-semibold text-oriana-navy">{award.title}</p>
                      {award.org ? <p className="mt-1 text-sm text-oriana-muted">{award.org}</p> : null}
                    </div>
                    <p className="text-sm font-bold text-oriana-blue">{award.year}</p>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </section>
    </main>
  )
}
