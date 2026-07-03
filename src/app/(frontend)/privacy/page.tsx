import { ContentPage } from '@/components/oriana/ContentPage'

export const metadata = {
  title: 'Privacy Policy',
  description: 'Oriana Inverters privacy policy — how we collect, use, and protect your personal information.',
}

export default function PrivacyPage() {
  return (
    <ContentPage
      eyebrow="Legal"
      title="Privacy Policy"
      description="Last updated: January 2026"
      breadcrumb={[{ label: 'Privacy Policy' }]}
      sections={[
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
      ]}
    />
  )
}
