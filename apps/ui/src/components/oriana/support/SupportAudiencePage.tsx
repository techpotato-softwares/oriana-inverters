import Link from 'next/link'
import { PageHero } from '../PageHero'
import { FadeIn } from '../FadeIn'
import type { SupportAudiencePageContent } from './supportData'

export function SupportAudiencePage({ content }: { content: SupportAudiencePageContent }) {
  const { hero, cards, faqTitle, faqs, faqLink } = content

  return (
    <main className="flex min-h-screen flex-col">
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        variant="light"
      />

      <section className="bg-white py-24">
        <div className="container">
          <FadeIn>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {cards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-gray-100 bg-oriana-surface p-8 transition hover:shadow-md"
                >
                  <h3 className="mb-4 font-display text-xl font-medium text-oriana-navy">
                    {card.title}
                  </h3>
                  {card.body ? <p className="mb-6 text-oriana-muted">{card.body}</p> : null}
                  {card.href ? (
                    <Link href={card.href} className="font-medium text-oriana-blue hover:underline">
                      {card.linkLabel || 'Learn more'} &rarr;
                    </Link>
                  ) : null}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {faqs.length > 0 ? (
        <section className="bg-oriana-silver py-24">
          <div className="container max-w-4xl">
            <FadeIn>
              <h2 className="mb-10 text-center font-display text-3xl font-semibold text-oriana-navy">
                {faqTitle}
              </h2>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div
                    key={faq.question}
                    className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
                  >
                    <h3 className="font-medium text-oriana-navy">{faq.question}</h3>
                    <p className="mt-2 text-sm text-oriana-muted">{faq.answer}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link
                  href={faqLink.href}
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-oriana-blue px-6 text-sm font-semibold text-oriana-blue transition hover:bg-oriana-blue hover:text-white"
                >
                  {faqLink.label}
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      ) : null}
    </main>
  )
}
