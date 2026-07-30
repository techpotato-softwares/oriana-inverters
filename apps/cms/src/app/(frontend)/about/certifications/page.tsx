import type { Metadata } from 'next'

import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'
import { getCertificationsContent, getPageIntros } from '@/utilities/getSiteContent'

export async function generateMetadata(): Promise<Metadata> {
  const intros = await getPageIntros()
  return {
    title: intros.certifications.title,
    description: intros.certifications.description,
  }
}

export default async function CertificationsPage() {
  const [intros, certifications] = await Promise.all([getPageIntros(), getCertificationsContent()])
  const intro = intros.certifications

  const certs = certifications.filter((c) => c.kind === 'certification')
  const awards = certifications.filter((c) => c.kind === 'award')

  return (
    <main>
      <PageHero eyebrow={intro.eyebrow} title={intro.title} description={intro.description} />
      <Breadcrumbs items={[{ label: 'About', href: '/about' }, { label: 'Certifications' }]} />

      <section className="py-12 lg:py-16">
        <div className="container">
          <h2 className="font-display text-2xl font-bold text-oriana-navy">{intro.certsHeading}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certs.map((cert) => (
              <div key={cert.name} className="rounded border border-oriana-navy/8 p-6">
                <p className="font-display text-lg font-bold text-oriana-blue">{cert.name}</p>
                {cert.scope && <p className="mt-2 text-sm text-oriana-navy">{cert.scope}</p>}
                {cert.region && <p className="mt-1 text-xs text-oriana-muted">{cert.region}</p>}
              </div>
            ))}
          </div>

          <h2 className="mt-16 font-display text-2xl font-bold text-oriana-navy">{intro.awardsHeading}</h2>
          <div className="mt-8 space-y-4">
            {awards.map((award) => (
              <div
                key={award.name}
                className="flex flex-col gap-2 rounded border border-oriana-navy/8 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold text-oriana-navy">{award.name}</p>
                  {award.organization && <p className="text-sm text-oriana-muted">{award.organization}</p>}
                </div>
                {award.year && <span className="text-sm font-bold text-oriana-blue">{award.year}</span>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
