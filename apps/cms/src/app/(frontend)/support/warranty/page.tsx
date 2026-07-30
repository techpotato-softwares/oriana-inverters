import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'
import { getWarrantyContent } from '@/utilities/getSiteContent'

export async function generateMetadata(): Promise<Metadata> {
  const content = await getWarrantyContent()
  return {
    title: content.seo?.metaTitle,
    description: content.seo?.metaDescription,
  }
}

export default async function WarrantyPage() {
  const content = await getWarrantyContent()

  return (
    <main>
      <PageHero
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        description={content.hero.description}
      />
      <Breadcrumbs items={[{ label: 'Support', href: '/support' }, { label: 'Warranty' }]} />

      <section className="py-12 lg:py-16">
        <div className="container max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-oriana-navy">{content.tiersTitle}</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-oriana-navy/15 bg-oriana-silver/50 text-left">
                  <th className="px-4 py-3 font-semibold text-oriana-navy">Product Line</th>
                  <th className="px-4 py-3 font-semibold text-oriana-navy">Standard Warranty</th>
                  <th className="px-4 py-3 font-semibold text-oriana-navy">Extended Options</th>
                </tr>
              </thead>
              <tbody>
                {content.tiers.map((row) => (
                  <tr key={row.product} className="border-b border-oriana-navy/8">
                    <td className="px-4 py-4 font-medium text-oriana-navy">{row.product}</td>
                    <td className="px-4 py-4 text-oriana-muted">{row.standard}</td>
                    <td className="px-4 py-4 text-oriana-muted">{row.extended}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 space-y-8">
            <div>
              <h3 className="font-display text-xl font-bold text-oriana-navy">{content.register.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-oriana-muted">{content.register.description}</p>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-oriana-navy">{content.claim.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-oriana-muted">{content.claim.description}</p>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href={content.primaryCta.href}
              className="rounded bg-oriana-blue px-6 py-3 text-sm font-bold text-white hover:bg-oriana-navy"
            >
              {content.primaryCta.label}
            </Link>
            <Link
              href={content.secondaryCta.href}
              className="rounded border border-oriana-navy/15 px-6 py-3 text-sm font-semibold text-oriana-navy hover:border-oriana-blue"
            >
              {content.secondaryCta.label}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
