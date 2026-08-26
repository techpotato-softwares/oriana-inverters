import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'
import { FadeIn } from '@/components/oriana/FadeIn'
import { getAbout } from '@/utilities/getMarketing'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAbout()
  return {
    title: about?.seo?.metaTitle || 'About Us',
    description:
      about?.seo?.metaDescription ||
      'Learn about Oriana Inverters — our mission, technology, and commitment to clean energy.',
  }
}

export default async function AboutPage() {
  const about = await getAbout()
  const hero = about?.hero
  const storyParagraphs = about?.storyParagraphs?.length
    ? about.storyParagraphs
    : [
        {
          text: 'Founded by power electronics engineers with decades of experience in renewable energy, Oriana was built on a simple belief: the world needs inverters that are as reliable as the sun itself.',
        },
        {
          text: 'Today, over one million Oriana inverters operate across 25 countries — on rooftops, in industrial parks, and across desert solar farms — converting sunlight into clean, dependable power for millions of people.',
        },
      ]
  const stats = about?.stats?.length
    ? about.stats
    : [
        { value: '2010', label: 'Founded' },
        { value: '1M+', label: 'Units Deployed' },
        { value: '25+', label: 'Countries' },
        { value: '500+', label: 'Team Members' },
      ]
  const values = about?.values?.length
    ? about.values
    : [
        {
          title: 'Engineering Excellence',
          description:
            'Every product undergoes rigorous design validation, environmental stress testing, and field trials before market release.',
        },
        {
          title: 'Customer Partnership',
          description:
            'We work alongside installers, EPCs, and distributors with dedicated technical support, training, and co-marketing resources.',
        },
        {
          title: 'Sustainable Future',
          description:
            'Our mission is to accelerate the global transition to clean energy through reliable, accessible power conversion technology.',
        },
      ]

  return (
    <main>
      <PageHero
        eyebrow={hero?.eyebrow || 'About'}
        title={hero?.title || 'Powering a Cleaner Tomorrow'}
        description={
          hero?.description ||
          'Oriana Inverters is a global manufacturer of solar inverter technology, serving residential, commercial, and utility markets with products engineered for performance and longevity.'
        }
      />
      <Breadcrumbs items={[{ label: 'About' }]} />

      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <FadeIn>
              <h2 className="font-display text-3xl font-bold text-oriana-navy">
                {about?.storyTitle || 'Our Story'}
              </h2>
              {storyParagraphs.map((p, i) => (
                <p
                  key={i}
                  className={`${i === 0 ? 'mt-6' : 'mt-4'} leading-relaxed text-oriana-muted`}
                >
                  {p.text}
                </p>
              ))}
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-oriana-navy/8 bg-oriana-silver/50 p-6 text-center"
                  >
                    <p className="font-display text-3xl font-bold text-oriana-blue">{stat.value}</p>
                    <p className="mt-1 text-sm text-oriana-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          <div className="mt-24 grid gap-8 md:grid-cols-3">
            {values.map((value, i) => (
              <FadeIn key={value.title} delay={i * 0.08}>
                <div className="rounded-2xl border border-oriana-navy/8 p-8">
                  <h3 className="font-display text-xl font-bold text-oriana-navy">{value.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-oriana-muted">{value.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
