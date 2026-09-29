import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { ComingSoon } from '@/components/oriana/ComingSoon'
import { PageHero } from '@/components/oriana/PageHero'
import { getFaqs } from '@/utilities/getMarketing'
import type { Faq } from '@/payload-types'

export const metadata = {
  title: 'FAQs',
  description:
    'Frequently asked questions about Oriana solar inverters, installation, warranty, and monitoring.',
}

function groupFaqs(docs: Faq[]) {
  const order: string[] = []
  const map = new Map<string, { q: string; a: string }[]>()
  for (const doc of docs) {
    const group = doc.group || 'General'
    if (!map.has(group)) {
      map.set(group, [])
      order.push(group)
    }
    map.get(group)!.push({ q: doc.question, a: doc.answer })
  }
  return order.map((title) => ({
    title,
    items: map.get(title) || [],
  }))
}

export default async function FaqsPage() {
  const docs = (await getFaqs()) as Faq[]

  if (docs.length === 0) {
    return (
      <main>
        <ComingSoon
          eyebrow="Resources"
          title="Frequently Asked Questions"
          description="Published FAQs will appear here once they are added in the CMS. Contact support if you need an answer now."
          breadcrumbs={[
            { label: 'Resources', href: '/resources/downloads' },
            { label: 'FAQs' },
          ]}
          primaryHref="/support"
          primaryLabel="Contact support"
        />
      </main>
    )
  }

  const faqGroups = groupFaqs(docs)

  return (
    <main>
      <PageHero
        eyebrow="Resources"
        title="Frequently Asked Questions"
        description="Answers to common questions about product selection, installation, warranty, and monitoring."
      />
      <Breadcrumbs items={[{ label: 'Resources', href: '/resources/downloads' }, { label: 'FAQs' }]} />

      <section className="py-12 lg:py-16">
        <div className="container max-w-3xl">
          {faqGroups.map((group) => (
            <div key={group.title} className="mb-12">
              <h2 className="font-display text-xl font-bold text-oriana-navy">{group.title}</h2>
              <dl className="mt-6 space-y-6">
                {group.items.map((item) => (
                  <div key={item.q} className="border-b border-oriana-navy/8 pb-6">
                    <dt className="font-semibold text-oriana-navy">{item.q}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-oriana-muted">{item.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
