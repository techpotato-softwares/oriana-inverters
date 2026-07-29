import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'
import { FadeIn } from '@/components/oriana/FadeIn'

const segments: Record<
  string,
  { title: string; description: string; benefits: string[]; products: string[]; image: string }
> = {
  residential: {
    title: 'Residential Solutions',
    description:
      'Power your home with Oriana single-phase string and hybrid inverters — engineered for maximum rooftop energy harvest, battery integration, and decades of reliable operation.',
    benefits: [
      'Single-phase string inverters from 1 – 11.4 kW',
      'Hybrid models with seamless battery backup switching',
      'WiFi monitoring with homeowner-friendly app',
      'Quiet operation with fanless or low-noise designs',
      '10-year standard warranty with extension options',
    ],
    products: ['ORI-S3 String Series', 'ORI-S6 Hybrid Series', 'ORI-M300 Microinverter'],
    image: '/assets/products/single-phase.svg',
  },
  commercial: {
    title: 'Commercial & Industrial',
    description:
      'Scale your business energy independence with three-phase inverter systems designed for warehouses, factories, data centers, and commercial rooftops.',
    benefits: [
      'Three-phase string inverters up to 110 kW',
      'Multi-MPPT for complex rooftop geometries',
      'Fleet monitoring and SCADA integration',
      'AFCI and rapid shutdown compliance',
      'Dedicated C&I technical support team',
    ],
    products: ['ORI-T50 Series', 'ORI-T75 Commercial', 'ORI-T110 Three-Phase'],
    image: '/assets/products/three-phase.svg',
  },
  utility: {
    title: 'Utility-Scale Solutions',
    description:
      'Deploy megawatt-class solar plants with Oriana central inverter platforms — built for 99.6% efficiency, grid code compliance, and 25+ year operational life.',
    benefits: [
      'Central inverters from 1 – 3.5 MW',
      'Outdoor-rated IP65 enclosures',
      'Grid-forming capability for weak grids',
      'Modular serviceability and hot-swap design',
      'Global grid code pre-certification',
    ],
    products: ['ORI-U1000', 'ORI-U2500 Central', 'ORI-U3500 Utility Platform'],
    image: '/assets/products/utility-scale.svg',
  },
  storage: {
    title: 'Energy Storage Solutions',
    description:
      'Integrate battery storage seamlessly with Oriana hybrid inverters — enabling backup power, peak shaving, time-of-use optimization, and grid services revenue.',
    benefits: [
      'Compatible with leading lithium battery brands',
      'UPS-level switching under 10 ms',
      'Time-of-use and self-consumption optimization',
      'Virtual power plant (VPP) ready',
      'Black start and islanding capability',
    ],
    products: ['ORI-S6 Hybrid', 'ORI-H50 Storage Series', 'ORI-EMS Energy Manager'],
    image: '/assets/products/hybrid-storage.svg',
  },
}

type Props = { params: Promise<{ segment: string }> }

export async function generateMetadata({ params }: Props) {
  const { segment } = await params
  const data = segments[segment]
  if (!data) return {}
  return { title: data.title, description: data.description }
}

export default async function SolutionPage({ params }: Props) {
  const { segment } = await params
  const data = segments[segment]
  if (!data) notFound()

  return (
    <main>
      <PageHero eyebrow="Solutions" title={data.title} description={data.description} />
      <Breadcrumbs items={[{ label: 'Solutions', href: '/solutions/residential' }, { label: data.title }]} />

      <section className="py-20 lg:py-28">
        <div className="container">
          <FadeIn>
            <div className="relative mx-auto mb-16 max-w-3xl overflow-hidden rounded-xl border border-oriana-navy/8 bg-oriana-silver">
              <Image
                src={data.image}
                alt=""
                width={640}
                height={400}
                className="h-auto w-full"
                unoptimized
              />
            </div>
          </FadeIn>

          <div className="grid gap-16 lg:grid-cols-2">
            <FadeIn>
              <h2 className="font-display text-2xl font-bold text-oriana-navy">Key Benefits</h2>
              <ul className="mt-8 space-y-4">
                {data.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-oriana-muted">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-oriana-blue" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="font-display text-2xl font-bold text-oriana-navy">Recommended Products</h2>
              <div className="mt-8 space-y-3">
                {data.products.map((product) => (
                  <Link
                    key={product}
                    href="/products"
                    className="flex items-center justify-between rounded-xl border border-oriana-navy/8 bg-oriana-silver/50 px-6 py-4 transition hover:border-oriana-blue/20 hover:bg-white"
                  >
                    <span className="font-semibold text-oriana-navy">{product}</span>
                    <span className="text-sm text-oriana-blue">View →</span>
                  </Link>
                ))}
              </div>

              <div className="mt-10 flex gap-4">
                <Link
                  href="/products"
                  className="rounded-full bg-oriana-blue px-6 py-3 text-sm font-semibold text-white hover:bg-oriana-navy"
                >
                  View Products
                </Link>
                <Link
                  href="/contact"
                  className="rounded-full border border-oriana-navy/15 px-6 py-3 text-sm font-semibold text-oriana-navy hover:border-oriana-blue"
                >
                  Request a Quote
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </main>
  )
}
