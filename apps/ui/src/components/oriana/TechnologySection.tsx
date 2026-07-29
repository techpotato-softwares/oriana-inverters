import { CheckCircle2, Gauge, Shield, Wifi } from 'lucide-react'
import { FadeIn } from './FadeIn'

const features = [
  {
    icon: Gauge,
    title: 'Advanced MPPT',
    description: 'Multi-MPPT tracking with 99.9% accuracy across wide voltage ranges for maximum energy harvest in any condition.',
  },
  {
    icon: Shield,
    title: 'Grid Compliance',
    description: 'Pre-certified for IEEE 1547, IEC 61727, and regional grid codes — ready for deployment in 25+ countries.',
  },
  {
    icon: Wifi,
    title: 'Smart Monitoring',
    description: 'Built-in WiFi/Ethernet with real-time performance analytics, remote firmware updates, and fleet management.',
  },
  {
    icon: CheckCircle2,
    title: 'Proven Reliability',
    description: 'Rigorous 1000-hour burn-in testing, IP65/66 enclosures, and a standard 10-year warranty with extension options.',
  },
]

const certifications = ['IEC 62109', 'UL 1741', 'CE', 'TÜV', 'ISO 9001', 'ISO 14001']

export function TechnologySection() {
  return (
    <section className="relative overflow-hidden bg-oriana-navy py-24 text-white lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(26,66,138,0.5),transparent)]" />

      <div className="container relative">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <FadeIn>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-oriana-sky">Technology</p>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
              Precision Engineering,<br />Proven in the Field
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/60">
              Every component in an Oriana inverter is selected and tested for decades of operation in
              the harshest environments — from desert heat to coastal humidity.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {certifications.map((cert) => (
                <span
                  key={cert}
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white/70"
                >
                  {cert}
                </span>
              ))}
            </div>
          </FadeIn>

          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature, i) => (
              <FadeIn key={feature.title} delay={i * 0.08}>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:border-oriana-sky/30 hover:bg-white/8">
                  <feature.icon className="h-8 w-8 text-oriana-sky" />
                  <h3 className="mt-4 font-display text-lg font-bold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{feature.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
