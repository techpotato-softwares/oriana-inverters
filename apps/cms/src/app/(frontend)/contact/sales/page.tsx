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
  title: 'Sales Enquiry',
  description:
    'Talk to Oriana sales about products, volumes, channel opportunities, and project support across India.',
}

export default async function SalesEnquiryPage() {
  const [contact, form] = await Promise.all([getContact(), getContactForm()])
  const cards: ContactCard[] = resolveContactCards(contact?.cards ?? [])
  const successMessage =
    contact?.successMessage ||
    'Thank you for your sales enquiry. Our team will contact you within one business day.'

  return (
    <main>
      <AboutHero
        eyebrow="Contact"
        title="Sales Enquiry"
        description="Share your product interests, target volumes, and market — our sales team will follow up with the right technical and commercial support."
        media={{ kind: 'image', src: heroImages.contact.src, alt: heroImages.contact.alt }}
        primary={{ label: 'Start enquiry', href: '#contact-form' }}
        secondary={{ label: 'Become a distributor', href: '/partners/become-a-distributor' }}
        nav={<ContactPageNav />}
      />
      <Breadcrumbs
        items={[{ label: 'Contact', href: '/contact' }, { label: 'Sales Enquiry' }]}
      />

      <section className="section-safe-y">
        <div className="container">
          <ContactForm
            cards={cards}
            form={form}
            successMessage={successMessage}
            intent="sales"
          />
        </div>
      </section>
    </main>
  )
}
