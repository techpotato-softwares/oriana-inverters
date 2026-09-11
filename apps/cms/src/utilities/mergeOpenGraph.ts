import type { Metadata } from 'next'

import { getServerSideURL } from './getURL'

const siteURL = getServerSideURL()

/** Default OG tags when a page does not override them. */
const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'High-efficiency string, hybrid, and utility-scale solar inverters for residential, commercial, and utility applications.',
  images: [
    {
      url: `${siteURL}/opengraph-image`,
      width: 1200,
      height: 630,
      alt: 'Oriana Inverters',
    },
  ],
  siteName: 'Oriana Inverters',
  title: 'Oriana Inverters | Advanced Solar Inverter Solutions',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  const images = og?.images
  const hasImages = Array.isArray(images) ? images.length > 0 : Boolean(images)

  return {
    ...defaultOpenGraph,
    ...og,
    images: hasImages ? images : defaultOpenGraph.images,
  }
}
