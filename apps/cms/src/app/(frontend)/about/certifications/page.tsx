import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { ComingSoon } from '@/components/oriana/ComingSoon'
import { PageHero } from '@/components/oriana/PageHero'
import { getAwards, getCertifications } from '@/utilities/getMarketing'
import type { Award, Certification } from '@/payload-types'

export const metadata = {
  title: 'Certifications & Awards',
  description: 'Oriana product certifications, grid code compliance, and industry awards.',
}

export default async function CertificationsPage() {
  const [cmsCerts, cmsAwards] = await Promise.all([
    getCertifications() as Promise<Certification[]>,
    getAwards() as Promise<Award[]>,
  ])

  if (cmsCerts.length === 0 && cmsAwards.length === 0) {
    return (
      <main>
        <ComingSoon
          eyebrow="About"
          title="Certifications & Awards"
          description="Official certification and award listings will appear here once published in the CMS."
          breadcrumbs={[{ label: 'About', href: '/about' }, { label: 'Certifications' }]}
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
      <PageHero
        eyebrow="About"
        title="Certifications & Awards"
        description="Oriana products meet the world's most stringent safety, grid interconnection, and quality standards."
      />
      <Breadcrumbs items={[{ label: 'About', href: '/about' }, { label: 'Certifications' }]} />

      <section className="py-12 lg:py-16">
        <div className="container">
          {certifications.length > 0 ? (
            <>
              <h2 className="font-display text-2xl font-bold text-oriana-navy">Product Certifications</h2>
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
                Industry Recognition
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
