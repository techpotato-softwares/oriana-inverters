import { ContentPage } from '@/components/oriana/ContentPage'

export const metadata = {
  title: 'Terms of Use',
  description: 'Terms and conditions for using the Oriana Inverters website and digital services.',
}

export default function TermsPage() {
  return (
    <ContentPage
      eyebrow="Legal"
      title="Terms of Use"
      description="Last updated: January 2026"
      breadcrumb={[{ label: 'Terms of Use' }]}
      sections={[
        {
          heading: 'Acceptance of Terms',
          paragraphs: [
            'By accessing www.orianainverters.com you agree to these Terms of Use. If you do not agree, please discontinue use of this website.',
          ],
        },
        {
          heading: 'Website Content',
          paragraphs: [
            'Product specifications, images, and documentation on this site are for general reference. Always refer to the official datasheet for the product serial number installed at your site.',
            'Oriana reserves the right to update product information without prior notice. Nothing on this website constitutes a binding offer or warranty beyond published product documentation.',
          ],
        },
        {
          heading: 'Intellectual Property',
          paragraphs: [
            'All trademarks, logos, datasheets, and website content are owned by Oriana Inverters or its licensors. You may not reproduce materials without written permission.',
          ],
        },
        {
          heading: 'Limitation of Liability',
          paragraphs: [
            'Oriana is not liable for indirect or consequential damages arising from use of this website. Product warranties are governed by separate warranty documents supplied with each unit.',
          ],
        },
      ]}
    />
  )
}
