import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { FadeIn, Stagger, StaggerItem } from '../FadeIn'

const audiences = [
  {
    title: 'Installers',
    description:
      'Installation manuals, commissioning guidance, troubleshooting support, and warranty handling for solar professionals.',
    highlights: ['Installation videos', 'Technical desk', 'Warranty claims'],
    image:
      'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=1000',
    href: '/support/installers',
    offset: '',
  },
  {
    title: 'Homeowners',
    description:
      'Simple product guidance, monitoring help, warranty information, and the fastest route to local support.',
    highlights: ['App & monitoring', 'Product guides', 'Find a partner'],
    image:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1000',
    href: '/support/homeowners',
    offset: 'lg:-translate-y-10',
  },
  {
    title: 'Business owners',
    description:
      'Lifecycle support for commercial and industrial assets — diagnostics, maintenance planning, and service coordination.',
    highlights: ['Plant health checks', 'Maintenance planning', 'Priority response'],
    image:
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1000',
    href: '/support/business',
    offset: '',
  },
]

export function SupportForYou() {
  return (
    <section id="support-for-you" className="scroll-mt-40 bg-oriana-surface py-20 lg:py-28">
      <div className="container">
        <FadeIn className="mb-12 grid gap-8 lg:mb-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-oriana-blue">
              <span className="h-px w-10 bg-oriana-blue/50" aria-hidden />
              Support for you
            </p>
            <h2
              className="mt-6 font-display font-medium tracking-[-0.02em] text-oriana-navy"
              style={{ fontSize: 'clamp(2rem, 3.8vw, 3.5rem)', lineHeight: 1.08 }}
            >
              Start where you stand
            </h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-oriana-muted lg:justify-self-end lg:text-lg">
            Each pathway brings the documents, tools, and service options most relevant to your
            role — no hunting through everything else.
          </p>
        </FadeIn>

        <Stagger className="grid gap-5 md:grid-cols-3" stagger={0.1}>
          {audiences.map((item) => (
            <StaggerItem key={item.title} className={`h-full ${item.offset}`}>
              <Link
                href={item.href}
                className="group relative flex h-full min-h-[30rem] flex-col justify-end overflow-hidden rounded-[1.75rem] bg-oriana-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oriana-blue lg:min-h-[34rem]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(7,21,37,0.1) 0%, rgba(7,21,37,0.35) 42%, rgba(7,21,37,0.95) 100%)',
                  }}
                />

                <div className="relative p-7 lg:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-2xl font-medium text-white lg:text-[1.75rem]">
                      {item.title}
                    </h3>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/35 text-white transition-colors duration-300 group-hover:border-oriana-sky group-hover:bg-oriana-sky group-hover:text-oriana-deep">
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-white/72">{item.description}</p>

                  <ul className="mt-6 space-y-2 border-t border-white/15 pt-5 transition-all duration-500 ease-out lg:max-h-0 lg:overflow-hidden lg:border-transparent lg:pt-0 lg:opacity-0 lg:group-hover:max-h-40 lg:group-hover:border-white/15 lg:group-hover:pt-5 lg:group-hover:opacity-100">
                    {item.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-center gap-2.5 text-sm text-white/80"
                      >
                        <span className="h-1 w-1 rounded-full bg-oriana-sky" aria-hidden />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
