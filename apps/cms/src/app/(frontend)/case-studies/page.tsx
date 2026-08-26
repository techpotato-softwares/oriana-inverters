import Link from 'next/link'
import Image from 'next/image'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'
import { caseStudies } from '@/data/caseStudies'
import { getCaseStudies } from '@/utilities/getMarketing'
import type { CaseStudy as CmsCaseStudy, Media } from '@/payload-types'

export const metadata = {
  title: 'Case Studies',
  description: 'Customer success stories and reference projects powered by Oriana solar inverters.',
}

function mediaUrl(v: unknown): string | null {
  return v && typeof v === 'object' && 'url' in v && (v as Media).url ? (v as Media).url! : null
}

type DisplayCaseStudy = {
  slug: string
  title: string
  segment: string
  capacity: string
  location: string
  summary: string
  products: string
  image: string
}

export default async function CaseStudiesPage() {
  const docs = (await getCaseStudies()) as CmsCaseStudy[]
  const items: DisplayCaseStudy[] =
    docs.length > 0
      ? docs.map((doc) => ({
          slug: doc.slug,
          title: doc.title,
          segment: doc.segment,
          capacity: doc.capacity || '',
          location: doc.location || '',
          summary: doc.summary,
          products: doc.products || '',
          image: mediaUrl(doc.image) || '/assets/products/three-phase.svg',
        }))
      : caseStudies.map((cs) => ({
          slug: cs.slug,
          title: cs.title,
          segment: cs.segment,
          capacity: cs.capacity,
          location: cs.location,
          summary: cs.summary,
          products: cs.products,
          image: cs.image,
        }))

  return (
    <main>
      <PageHero
        eyebrow="Solutions"
        title="Case Studies"
        description="Real-world deployments demonstrating Oriana reliability across residential, commercial, and utility applications."
      />
      <Breadcrumbs items={[{ label: 'Solutions', href: '/solutions/residential' }, { label: 'Case Studies' }]} />

      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2">
            {items.map((cs) => (
              <article
                key={cs.slug}
                className="overflow-hidden rounded border border-oriana-navy/8 bg-white transition hover:border-oriana-blue/20 hover:shadow-lg"
              >
                <Link href={`/case-studies/${cs.slug}`} className="block">
                  <div className="relative flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-oriana-silver to-white">
                    <Image
                      src={cs.image}
                      alt=""
                      width={200}
                      height={140}
                      className="h-auto max-h-[55%] w-auto opacity-90"
                      unoptimized
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-oriana-silver px-3 py-1 text-xs font-medium text-oriana-navy">
                        {cs.segment}
                      </span>
                      {cs.capacity ? (
                        <span className="rounded-full bg-oriana-blue/10 px-3 py-1 text-xs font-medium text-oriana-blue">
                          {cs.capacity}
                        </span>
                      ) : null}
                      {cs.location ? (
                        <span className="rounded-full bg-oriana-navy/5 px-3 py-1 text-xs font-medium text-oriana-muted">
                          {cs.location}
                        </span>
                      ) : null}
                    </div>
                    <h2 className="mt-4 font-display text-xl font-bold text-oriana-navy">{cs.title}</h2>
                    {cs.products ? (
                      <p className="mt-1 text-xs font-mono text-oriana-muted">{cs.products}</p>
                    ) : null}
                    <p className="mt-4 text-sm leading-relaxed text-oriana-muted">{cs.summary}</p>
                    <span className="mt-6 inline-block text-sm font-semibold text-oriana-blue group-hover:underline">
                      Read case study →
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
