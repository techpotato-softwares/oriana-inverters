import Link from 'next/link'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { DistributorLocator } from '@/components/oriana/DistributorLocator'
import { PageHero } from '@/components/oriana/PageHero'
import { getDistributors } from '@/utilities/getDistributors'

export const metadata = {
  title: 'Where to Buy',
  description: 'Find authorized Oriana inverter distributors and installers in your region.',
}

export default async function WhereToBuyPage() {
  const distributors = await getDistributors()

  return (
    <main>
      <PageHero
        eyebrow="Sales"
        title="Where to Buy"
        description="Purchase Oriana inverters through our authorized distributor network or certified installer partners."
      />
      <Breadcrumbs items={[{ label: 'Where to Buy' }]} />

      <section className="py-12 lg:py-16">
        <div className="container">
          <DistributorLocator distributors={distributors} />

          <div className="mt-16 rounded border border-oriana-blue/20 bg-oriana-silver/50 p-8 text-center">
            <h2 className="font-display text-xl font-bold text-oriana-navy">Become a Distributor</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-oriana-muted">
              Join the Oriana partner network with co-marketing support, technical training, and competitive
              commercial terms.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-block rounded bg-oriana-blue px-6 py-3 text-sm font-bold text-white hover:bg-oriana-navy"
            >
              Partner Inquiry
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
