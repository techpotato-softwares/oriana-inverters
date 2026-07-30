import type { Metadata } from 'next'

import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'
import { FadeIn } from '@/components/oriana/FadeIn'
import { getAboutContent } from '@/utilities/getSiteContent'

export async function generateMetadata(): Promise<Metadata> {
  const content = await getAboutContent()
  return {
    title: content.seo?.metaTitle,
    description: content.seo?.metaDescription,
  }
}

export default async function AboutPage() {
  const content = await getAboutContent()

  return (
    <main>
      <PageHero
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        description={content.hero.description}
      />
      <Breadcrumbs items={[{ label: 'About' }]} />

      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <FadeIn>
              <h2 className="font-display text-3xl font-bold text-oriana-navy">{content.story.title}</h2>
              {content.story.paragraphs.map((p, i) => (
                <p key={p.text.slice(0, 40)} className={i === 0 ? 'mt-6 leading-relaxed text-oriana-muted' : 'mt-4 leading-relaxed text-oriana-muted'}>
                  {p.text}
                </p>
              ))}
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                {content.stats.map((stat) => (
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
            {content.values.map((value, i) => (
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
