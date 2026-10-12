import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'
import { heroImages } from '@/components/oriana/heroImages'

type ContentSection = {
  heading?: string
  paragraphs: string[]
}

type ContentPageProps = {
  eyebrow: string
  title: string
  description: string
  breadcrumb: { label: string; href?: string }[]
  sections: ContentSection[]
}

export function ContentPage({
  eyebrow,
  title,
  description,
  breadcrumb,
  sections,
}: ContentPageProps) {
  return (
    <main>
      <PageHero
        image={heroImages.content}
        eyebrow={eyebrow}
        title={title}
        description={description}
      />
      <Breadcrumbs items={breadcrumb} />

      <section className="py-12 lg:py-16">
        <div className="container max-w-3xl">
          {sections.map((section) => (
            <div key={section.heading ?? section.paragraphs[0]} className="mb-10 last:mb-0">
              {section.heading && (
                <h2 className="font-display text-xl font-bold text-oriana-navy">
                  {section.heading}
                </h2>
              )}
              {section.paragraphs.map((p) => (
                <p
                  key={p.slice(0, 40)}
                  className={`text-sm leading-relaxed text-oriana-muted ${section.heading ? 'mt-4' : ''}`}
                >
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
