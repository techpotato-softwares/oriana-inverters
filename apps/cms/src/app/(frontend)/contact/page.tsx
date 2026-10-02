import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'
import { getContactForm } from '@/utilities/getContactForm'
import { getContact } from '@/utilities/getMarketing'
import { ContactForm, type ContactCard } from './ContactForm'

const fallbackCards: ContactCard[] = [
  { iconKey: 'mail', title: 'Email', detail: 'info@orianainverters.com' },
  { iconKey: 'phone', title: 'Phone', detail: '+1 (800) ORIANA-1' },
  { iconKey: 'mapPin', title: 'Headquarters', detail: 'United States' },
]

export async function generateMetadata(): Promise<Metadata> {
  const contact = await getContact()
  return {
    title: contact?.seo?.metaTitle || 'Contact',
    description:
      contact?.seo?.metaDescription ||
      "Tell us about your project. Our engineering and sales teams respond within one business day.",
  }
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ intent?: string }>
}) {
  const [{ intent }, contact, form] = await Promise.all([
    searchParams,
    getContact(),
    getContactForm(),
  ])
  const hero = contact?.hero
  const cards: ContactCard[] = contact?.cards?.length
    ? contact.cards.map((c) => ({
        iconKey: c.iconKey,
        title: c.title,
        detail: c.detail,
      }))
    : fallbackCards
  const successMessage =
    contact?.successMessage ||
    'Thank you for reaching out. Our team will contact you within one business day.'

  return (
    <main>
      <PageHero
        eyebrow={hero?.eyebrow || 'Contact'}
        title={hero?.title || "Let's Build Together"}
        description={
          hero?.description ||
          'Tell us about your project. Our engineering and sales teams respond within one business day.'
        }
      />
      <Breadcrumbs items={[{ label: 'Contact' }]} />

      <section className="py-20 lg:py-28">
        <div className="container">
          <ContactForm
            cards={cards}
            form={form}
            successMessage={successMessage}
            intent={intent}
          />
        </div>
      </section>
    </main>
  )
}
