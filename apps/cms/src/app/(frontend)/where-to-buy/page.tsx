import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { DistributorLocator } from '@/components/oriana/DistributorLocator'
import { PageHero } from '@/components/oriana/PageHero'
import { getDistributors } from '@/utilities/getDistributors'
import { getWhereToBuyContent } from '@/utilities/getSiteContent'

export async function generateMetadata(): Promise<Metadata> {
  const content = await getWhereToBuyContent()
  return {
    title: content.seo?.metaTitle,
    description: content.seo?.metaDescription,
  }
}

export default async function WhereToBuyPage() {
  const [content, distributors] = await Promise.all([getWhereToBuyContent(), getDistributors()])

  return (
    <main>
      <PageHero
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        description={content.hero.description}
      />
      <Breadcrumbs items={[{ label: 'Where to Buy' }]} />

      <section className="py-12 lg:py-16">
        <div className="container">
          <DistributorLocator distributors={distributors} />

          <div className="mt-16 rounded border border-oriana-blue/20 bg-oriana-silver/50 p-8 text-center">
            <h2 className="font-display text-xl font-bold text-oriana-navy">{content.becomeDistributor.title}</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-oriana-muted">
              {content.becomeDistributor.description}
            </p>
            <Link
              href={content.becomeDistributor.cta.href}
              className="mt-6 inline-block rounded bg-oriana-blue px-6 py-3 text-sm font-bold text-white hover:bg-oriana-navy"
            >
              {content.becomeDistributor.cta.label}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
