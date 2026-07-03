import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'

export const metadata = {
  title: 'Certifications & Awards',
  description: 'Oriana product certifications, grid code compliance, and industry awards.',
}

const certifications = [
  { name: 'UL 1741 SA', scope: 'Distributed energy resources', region: 'North America' },
  { name: 'IEEE 1547-2018', scope: 'Interconnection standards', region: 'North America' },
  { name: 'IEC 62109-1/2', scope: 'Safety of power converters', region: 'Global' },
  { name: 'EN 50549', scope: 'Grid connection', region: 'Europe' },
  { name: 'ISO 9001:2015', scope: 'Quality management', region: 'Global' },
  { name: 'ISO 14001:2015', scope: 'Environmental management', region: 'Global' },
]

const awards = [
  { year: '2025', title: 'Top Brand — Solar Inverters', org: 'Energy Storage News' },
  { year: '2024', title: 'Innovation Award — Hybrid Technology', org: 'Intersolar Europe' },
  { year: '2024', title: 'Bankability Leader', org: 'BloombergNEF Tier 1' },
]

export default function CertificationsPage() {
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
          <h2 className="font-display text-2xl font-bold text-oriana-navy">Product Certifications</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert) => (
              <div key={cert.name} className="rounded border border-oriana-navy/8 p-6">
                <p className="font-display text-lg font-bold text-oriana-blue">{cert.name}</p>
                <p className="mt-2 text-sm text-oriana-navy">{cert.scope}</p>
                <p className="mt-1 text-xs text-oriana-muted">{cert.region}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-16 font-display text-2xl font-bold text-oriana-navy">Industry Recognition</h2>
          <div className="mt-8 space-y-4">
            {awards.map((award) => (
              <div
                key={award.title}
                className="flex flex-col gap-2 rounded border border-oriana-navy/8 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold text-oriana-navy">{award.title}</p>
                  <p className="text-sm text-oriana-muted">{award.org}</p>
                </div>
                <span className="text-sm font-bold text-oriana-blue">{award.year}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
