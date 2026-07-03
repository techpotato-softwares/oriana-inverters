import Link from 'next/link'
import { Building2, Factory, Home, Battery } from 'lucide-react'
import { FadeIn } from './FadeIn'

const segments = [
  {
    title: 'Residential',
    description: 'Single-phase string and hybrid inverters for homes and small rooftops.',
    href: '/solutions/residential',
    icon: Home,
  },
  {
    title: 'Commercial & Industrial',
    description: 'Three-phase solutions for businesses, warehouses, and factories.',
    href: '/solutions/commercial',
    icon: Building2,
  },
  {
    title: 'Utility-Scale',
    description: 'Central inverters and turnkey solutions for large solar plants.',
    href: '/solutions/utility',
    icon: Factory,
  },
  {
    title: 'Energy Storage',
    description: 'Hybrid inverters with battery integration for backup and peak shaving.',
    href: '/solutions/storage',
    icon: Battery,
  },
]

export function SolutionsGrid() {
  return (
    <section className="bg-oriana-surface py-24">
      <div className="container">
        <FadeIn className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-oriana-blue">
            Solutions
          </p>
          <h2 className="mt-3 text-3xl font-bold text-oriana-navy md:text-4xl">
            Energy Solutions for Every Segment
          </h2>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {segments.map((segment, index) => (
            <FadeIn key={segment.href} delay={index * 0.1}>
              <Link
                href={segment.href}
                className="group flex h-full flex-col rounded-2xl border border-oriana-navy/10 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-oriana-blue/30 hover:shadow-lg"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-oriana-blue/10 text-oriana-blue transition group-hover:bg-oriana-blue group-hover:text-white">
                  <segment.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-oriana-navy">{segment.title}</h3>
                <p className="mt-3 flex-1 text-oriana-navy/70">{segment.description}</p>
                <span className="mt-6 text-sm font-semibold text-oriana-blue group-hover:underline">
                  Learn more →
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
