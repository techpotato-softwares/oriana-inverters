import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { ComingSoon } from '@/components/oriana/ComingSoon'
import { PageHero } from '@/components/oriana/PageHero'
import { defaultWarrantyPage as defaults } from '@/components/oriana/support/supportData'
import { getSupport, getWarrantyPlans } from '@/utilities/getMarketing'
import {
  mediaUrl,
  resolveCards,
  resolveLink,
  resolveMeta,
  resolveText,
} from '@/utilities/cmsContent'
import type { WarrantyPlan } from '@/payload-types'

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSupport()
  return resolveMeta(data?.warranty?.meta, defaults.meta)
}

export default async function WarrantyPage() {
  const [plans, data] = await Promise.all([getWarrantyPlans(), getSupport()])
  const cms = data?.warranty
  const warrantyTiers = (plans as WarrantyPlan[]).map((p) => ({
    product: p.productLine,
    standard: p.standard,
    extended: p.extended || '',
  }))

  const hero = {
    eyebrow: resolveText(cms?.hero?.eyebrow, defaults.hero.eyebrow),
    title: resolveText(cms?.hero?.title, defaults.hero.title),
    description: resolveText(cms?.hero?.description, defaults.hero.description),
  }
  const steps = resolveCards(cms?.steps, defaults.steps)
  const primary = resolveLink(cms?.primary, defaults.primary)
  const secondary = resolveLink(cms?.secondary, defaults.secondary)
  const policyUrl = mediaUrl(cms?.policyFile)

  return (
    <main>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} description={hero.description} />
      <Breadcrumbs items={[{ label: 'Support', href: '/support' }, { label: hero.title }]} />

      <section className="py-12 lg:py-16">
        <div className="container max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-oriana-navy">
            {resolveText(cms?.matrixTitle, defaults.matrixTitle)}
          </h2>
          {warrantyTiers.length === 0 ? (
            <div className="mt-6">
              <ComingSoon
                compact
                title="Warranty matrix coming soon"
                description="Published coverage by product line will appear here. Contact support to register a product or start a claim."
                primaryHref="/contact#contact-form"
                primaryLabel="Contact support"
                secondaryHref="/resources/downloads"
                secondaryLabel="Downloads"
              />
            </div>
          ) : (
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
                  {warrantyTiers.map((row) => (
                    <tr key={row.product} className="border-b border-oriana-navy/8">
                      <td className="px-4 py-4 font-medium text-oriana-navy">{row.product}</td>
                      <td className="px-4 py-4 text-oriana-muted">{row.standard}</td>
                      <td className="px-4 py-4 text-oriana-muted">{row.extended}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-12 space-y-8">
            {steps.map((step) => (
              <div key={step.title}>
                <h3 className="font-display text-xl font-bold text-oriana-navy">{step.title}</h3>
                {step.body ? (
                  <p className="mt-3 text-sm leading-relaxed text-oriana-muted">{step.body}</p>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href={primary.href}
              className="rounded bg-oriana-blue px-6 py-3 text-sm font-bold text-white hover:bg-oriana-deep"
            >
              {primary.label}
            </Link>
            <Link
              href={policyUrl || secondary.href}
              {...(policyUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="rounded border border-oriana-navy/15 px-6 py-3 text-sm font-semibold text-oriana-navy hover:border-oriana-blue"
            >
              {secondary.label}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
