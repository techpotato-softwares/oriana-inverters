import { LivePreviewListener } from '@/components/LivePreviewListener'
import { ContentPage } from '@/components/oriana/ContentPage'
import { getLegalPage } from '@/utilities/getLegalPage'

export const metadata = {
  title: 'Privacy Policy',
  description:
    'Oriana Inverters privacy policy — how we collect, use, and protect your personal information.',
}

export default async function PrivacyPage() {
  const page = await getLegalPage('privacy')

  return (
    <>
      {page.isDraft ? <LivePreviewListener /> : null}
      <ContentPage
        eyebrow="Legal"
        title={page.title}
        description={page.description}
        breadcrumb={[{ label: 'Privacy Policy' }]}
        sections={page.sections}
      />
    </>
  )
}
