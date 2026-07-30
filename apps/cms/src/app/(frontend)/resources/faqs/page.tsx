import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'
import { getFaqsContent, getPageIntros } from '@/utilities/getSiteContent'

export async function generateMetadata(): Promise<Metadata> {
  const intros = await getPageIntros()
  return {
    title: intros.faqs.title,
    description: intros.faqs.description,
  }
}

export default async function FaqsPage() {
  const [intros, faqGroups] = await Promise.all([getPageIntros(), getFaqsContent()])
  const intro = intros.faqs

  return (
    <main>
      <PageHero eyebrow={intro.eyebrow} title={intro.title} description={intro.description} />
      <Breadcrumbs items={[{ label: 'Resources', href: '/resources/downloads' }, { label: 'FAQs' }]} />

      <section className="py-12 lg:py-16">
        <div className="container max-w-3xl">
          {faqGroups.map((group) => (
            <div key={group.title} className="mb-12">
              <h2 className="font-display text-xl font-bold text-oriana-navy">{group.title}</h2>
              <dl className="mt-6 space-y-6">
                {group.items.map((item: { question: string; answer: string }) => (
                  <div key={item.question} className="rounded border border-oriana-navy/8 p-6">
                    <dt className="font-semibold text-oriana-navy">{item.question}</dt>
                    <dd className="mt-3 text-sm leading-relaxed text-oriana-muted">{item.answer}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}

          <div className="rounded border border-oriana-blue/20 bg-oriana-silver/50 p-8 text-center">
            <p className="text-oriana-navy">{intro.ctaPrompt}</p>
            <Link
              href={intro.ctaHref}
              className="mt-4 inline-block rounded bg-oriana-blue px-6 py-3 text-sm font-bold text-white hover:bg-oriana-navy"
            >
              {intro.ctaLabel}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
