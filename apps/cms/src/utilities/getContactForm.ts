import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

import type { Form } from '@/payload-types'

export type WebsiteFormField = NonNullable<Form['fields']>[number]

export type WebsiteForm = {
  id: number
  fields: WebsiteFormField[]
  submitButtonLabel: string | null
  redirectUrl: string | null
}

export const CONTACT_FORM_TITLE = 'Contact Form'

function toWebsiteForm(form: Form): WebsiteForm {
  return {
    id: form.id,
    fields: form.fields ?? [],
    submitButtonLabel: form.submitButtonLabel || null,
    redirectUrl: form.confirmationType === 'redirect' ? form.redirect?.url || null : null,
  }
}

/** Form chosen on the Contact Page global, else the form titled "Contact Form". */
export const getContactForm = unstable_cache(
  async (): Promise<WebsiteForm | null> => {
    try {
      const payload = await getPayload({ config: configPromise })
      const contact = await payload.findGlobal({ slug: 'contact', depth: 1 })
      if (contact?.form && typeof contact.form === 'object') return toWebsiteForm(contact.form)

      const { docs } = await payload.find({
        collection: 'forms',
        where: { title: { equals: CONTACT_FORM_TITLE } },
        limit: 1,
        depth: 0,
        sort: 'createdAt',
      })
      return docs[0] ? toWebsiteForm(docs[0]) : null
    } catch (error) {
      console.error('[getContactForm] failed:', error)
      return null
    }
  },
  ['contact-form'],
  { tags: ['contact', 'forms'] },
)
