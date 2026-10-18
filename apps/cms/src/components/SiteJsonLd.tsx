import { DEFAULT_KEYWORDS } from '@/utilities/seoKeywords'
import { getServerSideURL } from '@/utilities/getURL'

type SiteJsonLdProps = {
  siteName: string
  description: string
  keywords?: string[]
}

/** Organization + WebSite structured data for search engines. */
export function SiteJsonLd({ siteName, description, keywords = DEFAULT_KEYWORDS }: SiteJsonLdProps) {
  const url = getServerSideURL()
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${url}/#organization`,
        name: siteName,
        url,
        description,
        logo: `${url}/favicon.svg`,
        sameAs: [],
        keywords: keywords.join(', '),
        founder: {
          '@type': 'Organization',
          name: 'TechPotato Software LLP',
          url: 'https://techpotato.in',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${url}/#website`,
        url,
        name: siteName,
        description,
        publisher: { '@id': `${url}/#organization` },
        inLanguage: 'en-IN',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${url}/search?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'WebPage',
        '@id': `${url}/#webpage`,
        url,
        name: siteName,
        isPartOf: { '@id': `${url}/#website` },
        about: { '@id': `${url}/#organization` },
        description,
        inLanguage: 'en-IN',
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  )
}
