import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'
import { heroImages } from '@/components/oriana/heroImages'
import { mediaUrl } from '@/utilities/cmsContent'
import { getContactForm } from '@/utilities/getContactForm'
import { resolveContactCards } from '@/utilities/contactDetails'
import { getContact } from '@/utilities/getMarketing'
import { ContactForm, type ContactCard } from './ContactForm'

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
  const cmsHeroImage = mediaUrl(hero?.image)
  const heroImage = cmsHeroImage
    ? { src: cmsHeroImage, alt: heroImages.contact.alt }
    : heroImages.contact
  const cards: ContactCard[] = resolveContactCards(contact?.cards ?? [])
  const successMessage =
    contact?.successMessage ||
    'Thank you for reaching out. Our team will contact you within one business day.'

  return (
    <main>
      <PageHero
        image={heroImage}
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
