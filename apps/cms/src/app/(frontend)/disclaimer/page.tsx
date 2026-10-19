import { LivePreviewListener } from '@/components/LivePreviewListener'
import { ContentPage } from '@/components/oriana/ContentPage'
import { getLegalPage } from '@/utilities/getLegalPage'

export const metadata = {
  title: 'Disclaimer',
  description: 'Website disclaimer for Oriana Inverters product and marketing information.',
}

export default async function DisclaimerPage() {
  const page = await getLegalPage('disclaimer')

  return (
    <>
      {page.isDraft ? <LivePreviewListener /> : null}
      <ContentPage
        eyebrow="Legal"
        title={page.title}
        description={page.description}
        breadcrumb={[{ label: 'Disclaimer' }]}
        sections={page.sections}
      />
    </>
  )
}
