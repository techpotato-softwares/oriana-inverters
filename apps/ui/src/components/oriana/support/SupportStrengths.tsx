import { FadeIn, Stagger, StaggerItem } from '../FadeIn'

const strengths = [
  {
    title: 'Installation & Commissioning',
    description:
      'Structured pre-commissioning checks and on-site guidance so every system is handed over with confidence.',
    image:
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1400',
    span: 'lg:col-span-7 lg:row-span-2',
  },
  {
    title: 'Technical Support',
    description: 'Product specialists on hand to resolve application and configuration questions.',
    image:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000',
    span: 'lg:col-span-5',
  },
  {
    title: 'Responsive Customer Support',
    description: 'One direct route from the first enquiry to the right service team.',
    image:
      'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&q=80&w=1000',
    span: 'lg:col-span-5',
  },
  {
    title: 'Troubleshooting & Diagnostics',
    description:
      'A systematic fault-finding process that isolates root cause instead of treating symptoms.',
    image:
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200',
    span: 'lg:col-span-5 lg:row-span-2',
  },
  {
    title: 'Warranty & Service Assistance',
    description: 'Practical help with product registration, service requests, and warranty claims.',
    image:
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200',
    span: 'lg:col-span-7',
  },
  {
    title: 'Remote Support & Monitoring',
    description: 'Remote visibility that surfaces issues before they need a site visit.',
    image:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200',
    span: 'lg:col-span-7',
  },
]

export function SupportStrengths() {
  return (
    <section id="our-strengths" className="scroll-mt-40 bg-white py-20 lg:py-28">
      <div className="container">
        <FadeIn className="mb-12 grid gap-8 lg:mb-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-oriana-blue">
              <span className="h-px w-10 bg-oriana-blue/50" aria-hidden />
              Our strength
            </p>
            <h2
              className="mt-6 font-display font-medium tracking-[-0.02em] text-oriana-navy"
              style={{ fontSize: 'clamp(2rem, 3.8vw, 3.5rem)', lineHeight: 1.08 }}
            >
              Six capabilities behind
              <br className="hidden sm:block" /> every service call
            </h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-oriana-muted lg:justify-self-end lg:text-lg">
            Commissioning, diagnostics, warranty, and remote monitoring work as one service layer,
            so each conversation ends with a clear next step and restored uptime.
          </p>
        </FadeIn>

        <Stagger
          className="grid gap-4 sm:grid-cols-2 lg:auto-rows-[13.5rem] lg:grid-cols-12"
          stagger={0.07}
        >
          {strengths.map((item, index) => (
            <StaggerItem key={item.title} className={`${item.span} min-h-[17rem] lg:min-h-0`}>
              <article className="group relative h-full overflow-hidden rounded-3xl bg-oriana-deep">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt=""
                  loading={index < 2 ? 'eager' : 'lazy'}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-95"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(7,21,37,0.05) 0%, rgba(7,21,37,0.35) 45%, rgba(7,21,37,0.92) 100%)',
                  }}
                />

                <div className="relative flex h-full flex-col justify-between p-6 lg:p-7">
                  <span className="font-display text-sm font-medium tracking-[0.2em] text-white/55">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div>
                    <span
                      aria-hidden
                      className="block h-px w-10 origin-left bg-oriana-sky transition-transform duration-500 ease-out group-hover:scale-x-[2.4]"
                    />
                    <h3
                      className="mt-4 max-w-sm font-display font-medium leading-snug text-white"
                      style={{ fontSize: 'clamp(1.15rem, 1.5vw, 1.6rem)' }}
                    >
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-6 text-white/75 transition-all duration-500 ease-out lg:max-h-0 lg:-translate-y-1 lg:overflow-hidden lg:opacity-0 lg:group-hover:max-h-32 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
