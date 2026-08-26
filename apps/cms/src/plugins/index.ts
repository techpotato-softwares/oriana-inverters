import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { s3Storage } from '@payloadcms/storage-s3'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'

import { Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Oriana Inverters` : 'Oriana Inverters'
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

// Always register the plugin so `prefix` (and related upload fields) stay in the
// collection schema even when S3_BUCKET is unset locally. Without that column,
// Lambda (which has S3_BUCKET) 500s on every /api/media query → admin image
// upload spins forever.
const s3Bucket = process.env.S3_BUCKET?.trim() || ''

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'posts'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formOverrides: {
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
  }),
  searchPlugin({
    collections: ['posts'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
  s3Storage({
    enabled: Boolean(s3Bucket),
    alwaysInsertFields: true,
    // Required on Lambda/Function URL: buffered invoke caps request bodies at ~6MB.
    // Browser PUTs the file to S3 via a short-lived presigned URL instead.
    // Bucket CORS must allow PUT from the admin origin (see CDK S3Construct).
    clientUploads: true,
    collections: {
      media: {
        prefix: 'media',
      },
    },
    // Required by the plugin type even when disabled; unused unless enabled.
    bucket: s3Bucket || 'oriana-media-placeholder',
    config: {
      region: process.env.S3_REGION || process.env.AWS_REGION || 'ap-south-1',
      // Do NOT read AWS_ACCESS_KEY_ID here. On Lambda those are temporary ASIA*
      // role creds; passing them without AWS_SESSION_TOKEN makes S3 return
      // InvalidAccessKeyId. Let the default provider chain use the IAM role.
      // For local/dev static keys only, set S3_ACCESS_KEY_ID / S3_SECRET_ACCESS_KEY.
      ...(process.env.S3_ACCESS_KEY_ID && process.env.S3_SECRET_ACCESS_KEY
        ? {
            credentials: {
              accessKeyId: process.env.S3_ACCESS_KEY_ID,
              secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
              ...(process.env.S3_SESSION_TOKEN
                ? { sessionToken: process.env.S3_SESSION_TOKEN }
                : {}),
            },
          }
        : {}),
    },
  }),
]
