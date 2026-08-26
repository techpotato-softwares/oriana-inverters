import Link from 'next/link'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'
import { getWarrantyPlans } from '@/utilities/getMarketing'
import type { WarrantyPlan } from '@/payload-types'

export const metadata = {
  title: 'Warranty',
  description: 'Oriana inverter warranty terms, registration, and claim process.',
}

const fallbackTiers = [
  {
    product: 'Residential String & Hybrid',
    standard: '10 Years',
    extended: 'Up to 20 Years (optional)',
  },
  {
    product: 'Commercial Three-Phase',
    standard: '10 Years',
    extended: 'Up to 15 Years (optional)',
  },
  {
    product: 'Utility-Scale Central',
    standard: '10 Years',
    extended: 'Custom O&M agreements',
  },
]

export default async function WarrantyPage() {
  const plans = (await getWarrantyPlans()) as WarrantyPlan[]
  const warrantyTiers =
    plans.length > 0
      ? plans.map((p) => ({
          product: p.productLine,
          standard: p.standard,
          extended: p.extended || '',
        }))
      : fallbackTiers

  return (
    <main>
      <PageHero
        eyebrow="Support"
        title="Warranty"
        description="Industry-leading warranty coverage backed by global service infrastructure and spare parts availability."
      />
      <Breadcrumbs items={[{ label: 'Support', href: '/support' }, { label: 'Warranty' }]} />

      <section className="py-12 lg:py-16">
        <div className="container max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-oriana-navy">Coverage by Product Line</h2>
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

          <div className="mt-12 space-y-8">
            <div>
              <h3 className="font-display text-xl font-bold text-oriana-navy">Register Your Product</h3>
              <p className="mt-3 text-sm leading-relaxed text-oriana-muted">
                Register within 60 days of installation to activate full warranty coverage. You will need the serial
                number, installation date, and installer contact information.
              </p>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-oriana-navy">Submit a Warranty Claim</h3>
              <p className="mt-3 text-sm leading-relaxed text-oriana-muted">
                Contact our support team with your serial number, fault description, and photos if applicable. RMA
                processing typically completes within 5 business days for in-warranty units.
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded bg-oriana-blue px-6 py-3 text-sm font-bold text-white hover:bg-oriana-navy"
            >
              Register / Claim Warranty
            </Link>
            <Link
              href="/resources/downloads"
              className="rounded border border-oriana-navy/15 px-6 py-3 text-sm font-semibold text-oriana-navy hover:border-oriana-blue"
            >
              Download Warranty Policy (PDF)
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
