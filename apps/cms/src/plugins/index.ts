import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { s3Storage } from '@payloadcms/storage-s3'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, Field, Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'

import { authenticated } from '@/access/authenticated'
import { Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import {
  assertFormRateLimit,
  assertHoneypotEmpty,
  clientKeyFromHeaders,
  sanitizePersonName,
  sanitizeSubmissionData,
} from '@/utilities/formSecurity'
import {
  allowEditField,
  fullNameFromSubmissionData,
  unlockedLeadFieldAccess,
} from '@/utilities/leadAdmin'

export const FORMS_GROUP = 'Forms & Leads'

function revalidateFormsTag(context: Record<string, unknown> | undefined) {
  if (context?.disableRevalidate) return
  void import('next/cache').then(({ revalidateTag }) => revalidateTag('forms'))
}

const revalidateFormsAfterChange: CollectionAfterChangeHook = ({ doc, req }) => {
  revalidateFormsTag(req.context)
  return doc
}

const revalidateFormsAfterDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
  revalidateFormsTag(req.context)
  return doc
}

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
      admin: {
        group: FORMS_GROUP,
        description:
          'Fields added here appear on the website form. The contact page uses the form chosen in Contact Page, or the form titled "Contact Form".',
      },
      hooks: {
        afterChange: [revalidateFormsAfterChange],
        afterDelete: [revalidateFormsAfterDelete],
      },
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
    formSubmissionOverrides: {
      labels: { singular: 'Enquiry', plural: 'Website enquiries' },
      admin: {
        group: FORMS_GROUP,
        description: 'Every contact and product enquiry submitted on the website.',
        defaultColumns: ['fullName', 'form', 'createdAt'],
        useAsTitle: 'fullName',
      },
      access: {
        // Public create from the site; logged-in users may unlock and edit.
        update: authenticated,
      },
      fields: ({ defaultFields }): Field[] => {
        const lockedDefaults = defaultFields.map((field): Field => {
          if (!('name' in field)) return field
          if (field.name !== 'form' && field.name !== 'submissionData') return field
          return {
            ...field,
            access: {
              update: unlockedLeadFieldAccess,
            },
          } as Field
        })
        return [
          {
            name: 'fullName',
            type: 'text',
            label: 'Full name',
            admin: {
              description: 'Taken from the enquiry’s name field. Used as the document title.',
              readOnly: true,
            },
          },
          {
            // Bot trap — public forms post this; must stay empty. Hidden from editors.
            name: 'companyWebsite',
            type: 'text',
            admin: { hidden: true },
            access: { update: () => false },
          },
          allowEditField(),
          ...lockedDefaults,
        ]
      },
      hooks: {
        beforeChange: [
          ({ data, operation, req }) => {
            if (!data) return data
            if (operation === 'create') {
              assertHoneypotEmpty(data as Record<string, unknown>)
              assertFormRateLimit({
                key: `form-submissions:${clientKeyFromHeaders(req.headers)}`,
              })
              data.submissionData = sanitizeSubmissionData(data.submissionData)
              // Never persist honeypot even if a client posts it as a top-level field.
              delete (data as Record<string, unknown>).companyWebsite
            } else if (Array.isArray(data.submissionData)) {
              // Admin edits of older leads — scrub markup without re-enforcing new phone rules.
              data.submissionData = sanitizeSubmissionData(data.submissionData, { mode: 'scrub' })
            }
            const fromRows = fullNameFromSubmissionData(data.submissionData)
            if (fromRows) {
              try {
                data.fullName = sanitizePersonName(fromRows)
              } catch {
                data.fullName = fromRows.slice(0, 120)
              }
            } else if (typeof data.fullName === 'string' && data.fullName.trim()) {
              try {
                data.fullName = sanitizePersonName(data.fullName)
              } catch {
                data.fullName = String(data.fullName).trim().slice(0, 120)
              }
            } else {
              data.fullName = 'Untitled enquiry'
            }
            return data
          },
        ],
        afterRead: [
          ({ doc }) => {
            if (!doc) return doc
            if (!doc.fullName) {
              doc.fullName = fullNameFromSubmissionData(doc.submissionData) || 'Untitled enquiry'
            }
            return doc
          },
        ],
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
    // Required on Lambda Function URL (buffered): request/response bodies cap ~6MB.
    // Browser PUTs the file straight to S3 with a short-lived presigned URL from
    // POST /api/storage-s3-generate-signed-url — never through the Lambda body.
    // Infra: CDK S3Construct IAM (PutObject + multipart) + MediaBucketClientUploadCors.
    // Without S3_BUCKET this plugin stays schema-only and local disk upload is used
    // (fine for dev; >6MB uploads only work on AWS with S3_BUCKET set).
    clientUploads: true,
    collections: {
      media: {
        prefix: 'media',
      },
      'career-applications': {
        prefix: 'career-resumes',
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
