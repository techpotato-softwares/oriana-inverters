import Link from 'next/link'
import { ArrowUpRight, Battery, Building2, Cpu, Factory, Home, Sun } from 'lucide-react'
import { FadeIn } from './FadeIn'

const solutions = [
  {
    icon: Home,
    title: 'Residential',
    description: 'Single-phase string and hybrid inverters for homes with smart monitoring and battery-ready design.',
    href: '/solutions/residential',
    gradient: 'from-blue-600/20 to-sky-400/10',
  },
  {
    icon: Building2,
    title: 'Commercial & Industrial',
    description: 'High-capacity three-phase systems for warehouses, factories, and commercial rooftops.',
    href: '/solutions/commercial',
    gradient: 'from-indigo-600/20 to-blue-400/10',
  },
  {
    icon: Factory,
    title: 'Utility-Scale',
    description: 'Central inverter platforms engineered for multi-megawatt solar plants and IPP projects.',
    href: '/solutions/utility',
    gradient: 'from-violet-600/20 to-indigo-400/10',
  },
  {
    icon: Battery,
    title: 'Energy Storage',
    description: 'Hybrid inverters with integrated BMS communication for backup, peak shaving, and grid services.',
    href: '/solutions/storage',
    gradient: 'from-cyan-600/20 to-teal-400/10',
  },
]

export function SolutionsSection() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="container">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <FadeIn>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-oriana-blue">Solutions</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-oriana-navy md:text-5xl">
              Built for Every Segment
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Link
              href="/solutions/residential"
              className="inline-flex items-center gap-1 text-sm font-semibold text-oriana-blue hover:underline"
            >
              View all solutions <ArrowUpRight className="h-4 w-4" />
            </Link>
          </FadeIn>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {solutions.map((item, i) => (
            <FadeIn key={item.href} delay={i * 0.08}>
              <Link
                href={item.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-oriana-navy/8 bg-white p-7 transition duration-500 hover:-translate-y-1 hover:border-oriana-blue/20 hover:shadow-xl hover:shadow-oriana-navy/8"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 transition group-hover:opacity-100`}
                />
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-oriana-silver text-oriana-blue transition group-hover:bg-oriana-blue group-hover:text-white">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-bold text-oriana-navy">{item.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-oriana-muted">{item.description}</p>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-oriana-blue opacity-0 transition group-hover:opacity-100">
                    Learn more <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

const products = [
  {
    series: 'ORI-S6',
    name: 'Hybrid Series',
    power: '3.8 – 11.4 kW',
    type: 'Residential',
    efficiency: '98.7%',
    icon: Sun,
    featured: true,
  },
  {
    series: 'ORI-T75',
    name: 'Commercial Line',
    power: '50 – 110 kW',
    type: 'C&I',
    efficiency: '99.0%',
    icon: Cpu,
    featured: false,
  },
  {
    series: 'ORI-U2500',
    name: 'Utility Central',
    power: '2.5 MW',
    type: 'Utility',
    efficiency: '99.6%',
    icon: Factory,
    featured: false,
  },
]

export function ProductsShowcase() {
  return (
    <section className="bg-oriana-silver py-24 lg:py-32">
      <div className="container">
        <FadeIn className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-oriana-blue">Products</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-oriana-navy md:text-5xl">
            Engineered for Peak Performance
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-oriana-muted">
            Every Oriana inverter is designed with advanced MPPT algorithms, robust thermal management,
            and intelligent grid compliance for markets worldwide.
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {products.map((product, i) => (
            <FadeIn key={product.series} delay={i * 0.1}>
              <Link
                href="/products"
                className={`group relative flex flex-col overflow-hidden rounded-2xl border transition duration-500 hover:-translate-y-1 hover:shadow-2xl ${
                  product.featured
                    ? 'border-oriana-blue/30 bg-oriana-navy text-white shadow-xl shadow-oriana-navy/20 lg:row-span-1'
                    : 'border-oriana-navy/8 bg-white hover:border-oriana-blue/20 hover:shadow-oriana-navy/8'
                }`}
              >
                {product.featured && (
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(77,163,255,0.15),transparent)]" />
                )}
                <div className="relative p-8">
                  {product.featured && (
                    <span className="mb-4 inline-block rounded-full bg-oriana-sky/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-oriana-sky">
                      Best Seller
                    </span>
                  )}
                  <p className={`text-xs font-bold uppercase tracking-widest ${product.featured ? 'text-oriana-sky' : 'text-oriana-blue'}`}>
                    {product.series}
                  </p>
                  <h3 className={`mt-2 font-display text-2xl font-bold ${product.featured ? 'text-white' : 'text-oriana-navy'}`}>
                    {product.name}
                  </h3>
                  <p className={`mt-1 text-sm ${product.featured ? 'text-white/50' : 'text-oriana-muted'}`}>
                    {product.type} · {product.power}
                  </p>

                  <div className={`my-8 flex h-36 items-center justify-center rounded-xl ${product.featured ? 'bg-white/5' : 'bg-oriana-silver'}`}>
                    <product.icon className={`h-16 w-16 ${product.featured ? 'text-oriana-sky/60' : 'text-oriana-blue/30'}`} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-2xl font-bold ${product.featured ? 'text-oriana-sky' : 'text-oriana-blue'}`}>
                        {product.efficiency}
                      </p>
                      <p className={`text-xs ${product.featured ? 'text-white/40' : 'text-oriana-muted'}`}>
                        Max Efficiency
                      </p>
                    </div>
                    <span className={`text-sm font-semibold ${product.featured ? 'text-oriana-sky' : 'text-oriana-blue'} opacity-0 transition group-hover:opacity-100`}>
                      View specs →
                    </span>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-10 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full border border-oriana-navy/15 px-8 py-3.5 text-sm font-semibold text-oriana-navy transition hover:border-oriana-blue hover:text-oriana-blue"
          >
            View Full Catalogue <ArrowUpRight className="h-4 w-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}
