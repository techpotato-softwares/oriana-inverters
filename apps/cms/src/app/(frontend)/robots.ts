import type { MetadataRoute } from 'next'

import { getServerSideURL } from '@/utilities/getURL'

/** Crawl rules for search engines — prefer this over a stale public/robots.txt. */
export default function robots(): MetadataRoute.Robots {
  const base = getServerSideURL()
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/admin', '/api/', '/next/', '/coming-soon'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: [
      `${base}/sitemap.xml`,
      `${base}/pages-sitemap.xml`,
      `${base}/posts-sitemap.xml`,
    ],
    host: base,
  }
}
