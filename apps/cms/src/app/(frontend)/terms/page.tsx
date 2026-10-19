import { LivePreviewListener } from '@/components/LivePreviewListener'
import { ContentPage } from '@/components/oriana/ContentPage'
import { getLegalPage } from '@/utilities/getLegalPage'

export const metadata = {
  title: 'Terms of Use',
  description: 'Terms and conditions for using the Oriana Inverters website and digital services.',
}

export default async function TermsPage() {
  const page = await getLegalPage('terms')

  return (
    <>
      {page.isDraft ? <LivePreviewListener /> : null}
      <ContentPage
        eyebrow="Legal"
        title={page.title}
        description={page.description}
        breadcrumb={[{ label: 'Terms of Use' }]}
        sections={page.sections}
      />
    </>
  )
}
