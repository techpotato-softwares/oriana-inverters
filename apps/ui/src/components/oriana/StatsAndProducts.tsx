import Link from 'next/link'
import { FadeIn } from './FadeIn'

const stats = [
  { value: '99.6%', label: 'Max Efficiency' },
  { value: '25+', label: 'Countries Served' },
  { value: '1M+', label: 'Units Deployed' },
  { value: '10yr', label: 'Standard Warranty' },
]

const featuredProducts = [
  {
    name: 'ORI-OG7 Hybrid Series',
    segment: 'Single Phase',
    power: '3 – 12 kW',
    href: '/products/category/hybrid-inverters',
  },
  {
    name: 'ORI-OG04 C&I Grid-Tied',
    segment: 'C&I',
    power: '30 – 80 kW',
    href: '/products/category/on-grid-inverters',
  },
  {
    name: 'ORI-OG6 Utility',
    segment: 'Utility-Scale',
    power: '350 kW',
    href: '/products/category/utility-scale-inverters',
  },
]

export function StatsAndProducts() {
  return (
    <>
      <section className="border-y border-oriana-navy/10 bg-oriana-navy py-16 text-white">
        <div className="container">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <FadeIn key={stat.label} delay={index * 0.08} className="text-center">
                <p className="text-3xl font-bold text-oriana-accent md:text-4xl">{stat.value}</p>
                <p className="mt-2 text-sm text-white/70">{stat.label}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container">
          <FadeIn className="mb-14 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-oriana-blue">
                Products
              </p>
              <h2 className="mt-3 text-3xl font-bold text-oriana-navy md:text-4xl">
                Featured Inverters
              </h2>
            </div>
            <Link href="/products" className="font-semibold text-oriana-blue hover:underline">
              View all products →
            </Link>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredProducts.map((product, index) => (
              <FadeIn key={product.name} delay={index * 0.1}>
                <Link
                  href={product.href}
                  className="group block overflow-hidden rounded-2xl border border-oriana-navy/10 bg-gradient-to-br from-oriana-surface to-white p-8 transition hover:border-oriana-blue/30 hover:shadow-lg"
                >
                  <div className="mb-6 aspect-video rounded-xl bg-gradient-to-br from-oriana-navy to-oriana-blue opacity-90" />
                  <p className="text-xs font-semibold uppercase tracking-wider text-oriana-blue">
                    {product.segment}
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-oriana-navy group-hover:text-oriana-blue">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-oriana-navy/60">Power range: {product.power}</p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
