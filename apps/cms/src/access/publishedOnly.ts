import type { Access } from 'payload'

/**
 * Public can only read published docs; authenticated users see everything.
 * Use on collections with `versions.drafts`.
 */
export const publishedOnly: Access = ({ req: { user } }) => {
  if (user) return true

  return {
    _status: {
      equals: 'published',
    },
  }
}
