import Link from 'next/link'
import { ArrowUpRight, BadgeCheck, CircleHelp, FileText } from 'lucide-react'
import { FadeIn, Stagger, StaggerItem } from '../FadeIn'

const resources = [
  {
    title: 'Product documentation',
    description:
      'Datasheets, user manuals, and quick installation guides, organised category by category.',
    href: '/resources/downloads',
    icon: FileText,
  },
  {
    title: 'FAQs',
    description:
      'Answers to the questions that come up most often during installation, monitoring, and service.',
    href: '/resources/faqs',
    icon: CircleHelp,
  },
  {
    title: 'Warranty',
    description:
      'Warranty terms, product registration, and a clear path for raising and tracking a claim.',
    href: '/support/warranty',
    icon: BadgeCheck,
  },
]

export function SupportResources() {
  return (
    <section id="resources" className="scroll-mt-40 bg-white py-20 lg:py-28">
      <div className="container">
        <FadeIn className="mb-12 max-w-3xl lg:mb-16">
          <p className="flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-oriana-blue">
            <span className="h-px w-10 bg-oriana-blue/50" aria-hidden />
            Resources
          </p>
          <h2
            className="mt-6 font-display font-medium tracking-[-0.02em] text-oriana-navy"
            style={{ fontSize: 'clamp(2rem, 3.8vw, 3.5rem)', lineHeight: 1.08 }}
          >
            Everything needed to install, run, and maintain
          </h2>
        </FadeIn>

        <div className="grid gap-5 lg:grid-cols-[1.05fr_1fr]">
          <FadeIn className="h-full">
            <div className="group relative h-full min-h-[22rem] overflow-hidden rounded-[1.75rem] bg-oriana-deep lg:min-h-[32rem]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=1600"
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(200deg, rgba(7,21,37,0.25) 0%, rgba(7,21,37,0.75) 55%, rgba(7,21,37,0.96) 100%)',
                }}
              />
              <div className="relative flex h-full flex-col justify-end p-8 lg:p-10">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-oriana-sky">
                  Resource centre
                </p>
                <h3
                  className="mt-5 max-w-sm font-display font-medium leading-tight text-white"
                  style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.5rem)' }}
                >
                  One library for every Oriana product
                </h3>
                <p className="mt-5 max-w-md text-sm leading-7 text-white/72">
                  Browse documents by product category — on-grid, hybrid, utility, and storage — and
                  download the latest revision in a click.
                </p>
                <Link
                  href="/resources/downloads"
                  className="group/cta mt-8 inline-flex w-fit min-h-12 items-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-oriana-deep transition-colors duration-300 hover:bg-oriana-sky focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  Open resource centre
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                    aria-hidden
                  />
                </Link>
              </div>
            </div>
          </FadeIn>

          <Stagger className="grid gap-4" stagger={0.08}>
            {resources.map(({ title, description, href, icon: Icon }) => (
              <StaggerItem key={title} className="h-full">
                <Link
                  href={href}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.5rem] border border-oriana-deep/10 bg-oriana-surface p-7 transition-colors duration-500 hover:border-oriana-blue/30 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oriana-blue lg:p-8"
                >
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-oriana-blue transition-transform duration-500 ease-out group-hover:scale-y-100"
                  />
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <Icon className="h-7 w-7 text-oriana-blue" strokeWidth={1.4} aria-hidden />
                      <h3 className="mt-6 font-display text-xl font-medium text-oriana-navy lg:text-2xl">
                        {title}
                      </h3>
                      <p className="mt-3 max-w-md text-sm leading-6 text-oriana-muted">
                        {description}
                      </p>
                    </div>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-oriana-deep/12 text-oriana-blue transition-colors duration-300 group-hover:border-oriana-blue group-hover:bg-oriana-blue group-hover:text-white">
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}
