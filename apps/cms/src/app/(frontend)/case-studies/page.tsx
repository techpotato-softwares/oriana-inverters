import Link from 'next/link'
import Image from 'next/image'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { ComingSoon } from '@/components/oriana/ComingSoon'
import { PageHero } from '@/components/oriana/PageHero'
import { getCaseStudies } from '@/utilities/getMarketing'
import type { CaseStudy as CmsCaseStudy, Media } from '@/payload-types'

export const metadata = {
  title: 'Case Studies',
  description: 'Customer success stories and reference projects powered by Oriana solar inverters.',
}

function mediaUrl(v: unknown): string | null {
  return v && typeof v === 'object' && 'url' in v && (v as Media).url ? (v as Media).url! : null
}

export default async function CaseStudiesPage() {
  const docs = (await getCaseStudies()) as CmsCaseStudy[]

  if (docs.length === 0) {
    return (
      <main>
        <ComingSoon
          eyebrow="Solutions"
          title="Case Studies"
          description="Verified customer stories will appear here once published. Contact us if you need a reference for a live project."
          breadcrumbs={[
            { label: 'Solutions', href: '/solutions/residential' },
            { label: 'Case Studies' },
          ]}
        />
      </main>
    )
  }

  const items = docs.map((doc) => ({
    slug: doc.slug,
    title: doc.title,
    segment: doc.segment,
    capacity: doc.capacity || '',
    location: doc.location || '',
    summary: doc.summary,
    products: doc.products || '',
    image: mediaUrl(doc.image) || '/assets/products/three-phase.svg',
  }))

  return (
    <main>
      <PageHero
        eyebrow="Solutions"
        title="Case Studies"
        description="Real-world deployments demonstrating Oriana reliability across residential, commercial, and utility applications."
      />
      <Breadcrumbs
        items={[{ label: 'Solutions', href: '/solutions/residential' }, { label: 'Case Studies' }]}
      />

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
                  <div className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-widest text-oriana-blue">
                      {cs.segment}
                    </p>
                    <h2 className="mt-2 font-display text-xl font-bold text-oriana-navy">{cs.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-oriana-muted">{cs.summary}</p>
                    <p className="mt-4 text-xs text-oriana-muted">
                      {[cs.location, cs.capacity, cs.products].filter(Boolean).join(' · ')}
                    </p>
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
