import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { ContentPage } from '@/components/oriana/ContentPage'
import type { ContentPageBlock, Page } from '@/payload-types'

export const metadata = {
  title: 'Privacy Policy',
  description: 'Oriana Inverters privacy policy — how we collect, use, and protect your personal information.',
}

const fallbackSections = [
  {
    heading: 'Information We Collect',
    paragraphs: [
      'We collect information you provide when requesting quotes, registering products, subscribing to our newsletter, or contacting support. This may include your name, email address, company name, phone number, and project details.',
      'We also collect technical data when you visit our website, including IP address, browser type, and pages viewed, through cookies and analytics tools used to improve our services.',
    ],
  },
  {
    heading: 'How We Use Your Information',
    paragraphs: [
      'Your information is used to respond to inquiries, process warranty registrations, deliver marketing communications you have opted into, and improve our products and website experience.',
      'We do not sell personal information to third parties. We may share data with authorized distributors and service partners solely to fulfil your requests.',
    ],
  },
  {
    heading: 'Your Rights',
    paragraphs: [
      'You may request access, correction, or deletion of your personal data by contacting privacy@orianainverters.com. California residents have additional rights under the CCPA.',
    ],
  },
  {
    heading: 'Contact',
    paragraphs: [
      'For privacy-related questions, email privacy@orianainverters.com or write to Oriana Inverters, Privacy Office, United States.',
    ],
  },
]

async function getPublishedPageBySlug(slug: string): Promise<Page | null> {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'pages',
      where: {
        and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }],
      },
      limit: 1,
      depth: 2,
    })
    return (result.docs[0] as Page | undefined) ?? null
  } catch {
    return null
  }
}

function sectionsFromPage(page: Page) {
  const block = page.layout?.find(
    (b): b is ContentPageBlock => b.blockType === 'contentPage',
  )
  if (!block?.sections?.length) return null
  return block.sections.map((s) => ({
    heading: s.heading,
    paragraphs: s.body
      .split(/\n+/)
      .map((p) => p.trim())
      .filter(Boolean),
  }))
}

export default async function PrivacyPage() {
  const page = await getPublishedPageBySlug('privacy')
  const sections = (page && sectionsFromPage(page)) || fallbackSections

  return (
    <ContentPage
      eyebrow="Legal"
      title={page?.title || 'Privacy Policy'}
      description={page?.meta?.description || 'Last updated: January 2026'}
      breadcrumb={[{ label: 'Privacy Policy' }]}
      sections={sections}
    />
  )
}
