import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { FadeIn } from '@/components/oriana/FadeIn'
import { PageHero } from '@/components/oriana/PageHero'
import { getSustainabilityContent } from '@/utilities/getSiteContent'

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSustainabilityContent()
  return {
    title: content.seo?.metaTitle,
    description: content.seo?.metaDescription,
  }
}

export default async function SustainabilityPage() {
  const content = await getSustainabilityContent()

  return (
    <main>
      <PageHero
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        description={content.hero.description}
      />
      <Breadcrumbs items={[{ label: 'Sustainability' }]} />

      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {content.highlights.map((h, i) => (
              <FadeIn key={h.label} delay={i * 0.05}>
                <div className="border border-oriana-navy/8 bg-oriana-silver/40 p-6 text-center">
                  <p className="font-display text-2xl font-light text-oriana-blue">{h.value}</p>
                  <p className="mt-2 text-sm text-oriana-muted">{h.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-center">
            <FadeIn>
              <div className="relative aspect-[4/3] overflow-hidden rounded border border-oriana-navy/8 bg-oriana-silver">
                <Image
                  src={content.approach.imageUrl}
                  alt="Sustainable solar manufacturing"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-display text-2xl font-bold text-oriana-navy">{content.approach.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-oriana-muted">{content.approach.description}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={content.approach.primaryCta.href}
                  className="rounded-full border-2 border-oriana-blue px-6 py-2.5 text-sm font-semibold text-oriana-blue hover:bg-oriana-blue hover:text-white"
                >
                  {content.approach.primaryCta.label}
                </Link>
                <Link
                  href={content.approach.secondaryCta.href}
                  className="text-sm font-semibold text-oriana-blue hover:underline"
                >
                  {content.approach.secondaryCta.label}
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </main>
  )
}
