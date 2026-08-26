import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'
import { getContact } from '@/utilities/getMarketing'
import type { Form } from '@/payload-types'
import { ContactForm, type ContactCard } from './ContactForm'

const fallbackCards: ContactCard[] = [
  { iconKey: 'mail', title: 'Email', detail: 'info@orianainverters.com' },
  { iconKey: 'phone', title: 'Phone', detail: '+1 (800) ORIANA-1' },
  { iconKey: 'mapPin', title: 'Headquarters', detail: 'United States' },
]

function formIdFromRelation(form: number | Form | null | undefined): number | null {
  if (typeof form === 'number' && Number.isFinite(form)) return form
  if (form && typeof form === 'object' && 'id' in form) return form.id
  return null
}

export async function generateMetadata(): Promise<Metadata> {
  const contact = await getContact()
  return {
    title: contact?.seo?.metaTitle || 'Contact',
    description:
      contact?.seo?.metaDescription ||
      "Tell us about your project. Our engineering and sales teams respond within one business day.",
  }
}

export default async function ContactPage() {
  const contact = await getContact()
  const hero = contact?.hero
  const cards: ContactCard[] = contact?.cards?.length
    ? contact.cards.map((c) => ({
        iconKey: c.iconKey,
        title: c.title,
        detail: c.detail,
      }))
    : fallbackCards
  const formId = formIdFromRelation(contact?.form)
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
          <ContactForm cards={cards} formId={formId} successMessage={successMessage} />
        </div>
      </section>
    </main>
  )
}
