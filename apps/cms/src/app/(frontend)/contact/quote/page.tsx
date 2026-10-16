import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { AboutHero } from '@/components/oriana/about/shared/AboutHero'
import { ContactPageNav } from '@/components/oriana/contact/ContactPageNav'
import { heroImages } from '@/components/oriana/heroImages'
import { getContactForm } from '@/utilities/getContactForm'
import { resolveContactCards } from '@/utilities/contactDetails'
import { getContact } from '@/utilities/getMarketing'
import { ContactForm, type ContactCard } from '../ContactForm'

export const metadata: Metadata = {
  title: 'Request a Quote',
  description:
    'Request a quote for Oriana solar inverters — share system size, location, and timeline with our team.',
}

export default async function RequestQuotePage() {
  const [contact, form] = await Promise.all([getContact(), getContactForm()])
  const cards: ContactCard[] = resolveContactCards(contact?.cards ?? [])
  const successMessage =
    contact?.successMessage ||
    'Thank you for your quote request. Our team will contact you within one business day.'

  return (
    <main>
      <AboutHero
        eyebrow="Contact"
        title="Request a Quote"
        description="Tell us about system size, site location, and timeline. We will route your request to the right Oriana specialist."
        media={{ kind: 'image', src: heroImages.contact.src, alt: heroImages.contact.alt }}
        primary={{ label: 'Request a quote', href: '#contact-form' }}
        secondary={{ label: 'Browse products', href: '/products' }}
        nav={<ContactPageNav />}
      />
      <Breadcrumbs
        items={[{ label: 'Contact', href: '/contact' }, { label: 'Request a Quote' }]}
      />

      <section className="section-safe-y">
        <div className="container">
          <ContactForm
            cards={cards}
            form={form}
            successMessage={successMessage}
            intent="quote"
          />
        </div>
      </section>
    </main>
  )
}
