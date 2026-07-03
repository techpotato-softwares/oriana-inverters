import { ContentPage } from '@/components/oriana/ContentPage'

export const metadata = {
  title: 'Disclaimer',
  description: 'Website disclaimer for Oriana Inverters product and marketing information.',
}

export default function DisclaimerPage() {
  return (
    <ContentPage
      eyebrow="Legal"
      title="Disclaimer"
      description="Important notices regarding information on this website."
      breadcrumb={[{ label: 'Disclaimer' }]}
      sections={[
        {
          paragraphs: [
            'The information on this website is provided for general informational purposes only. While Oriana Inverters strives to keep content accurate and up to date, we make no warranties about completeness, reliability, or suitability for any purpose.',
          ],
        },
        {
          heading: 'Product Information',
          paragraphs: [
            'Specifications, images, and performance data are subject to change without notice. Always consult the official datasheet for the specific product model and serial number installed at your site.',
          ],
        },
        {
          heading: 'Third-Party Links',
          paragraphs: [
            'Links to external websites are provided for convenience. Oriana does not endorse and is not responsible for content on third-party sites.',
          ],
        },
      ]}
    />
  )
}
