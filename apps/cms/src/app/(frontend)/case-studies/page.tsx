import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'
import { getCaseStudiesContent, getPageIntros } from '@/utilities/getSiteContent'

export async function generateMetadata(): Promise<Metadata> {
  const intros = await getPageIntros()
  return {
    title: intros.caseStudies.title,
    description: intros.caseStudies.description,
  }
}

export default async function CaseStudiesPage() {
  const [intros, caseStudies] = await Promise.all([getPageIntros(), getCaseStudiesContent()])
  const intro = intros.caseStudies

  return (
    <main>
      <PageHero eyebrow={intro.eyebrow} title={intro.title} description={intro.description} />
      <Breadcrumbs items={[{ label: 'Solutions', href: '/solutions/residential' }, { label: 'Case Studies' }]} />

      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2">
            {caseStudies.map((cs) => (
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
                      <span className="rounded-full bg-oriana-blue/10 px-3 py-1 text-xs font-medium text-oriana-blue">
                        {cs.capacity}
                      </span>
                    </div>
                    <h2 className="mt-4 font-display text-xl font-bold text-oriana-navy">{cs.title}</h2>
                    <p className="mt-1 text-xs font-mono text-oriana-muted">{cs.products}</p>
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
