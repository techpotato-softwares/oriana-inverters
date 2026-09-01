import type { Payload, File } from 'payload'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { staticCategories, staticProducts } from '@/data/products'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const assetsDir = path.resolve(dirname, '../../../public/assets/products')

const seedOpts = { overrideAccess: true as const, context: { disableRevalidate: true } }

function readLocalImage(filename: string): File {
  const filePath = path.join(assetsDir, filename)
  const data = fs.readFileSync(filePath)
  const mimetype = filename.endsWith('.png')
    ? 'image/png'
    : filename.endsWith('.jpg') || filename.endsWith('.jpeg')
      ? 'image/jpeg'
      : 'image/svg+xml'
  return {
    name: filename,
    data,
    mimetype,
    size: data.byteLength,
  }
}

function minimalPdf(name: string): File {
  const data = Buffer.from(
    '%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[]/Count 0>>endobj\nxref\n0 3\ntrailer<</Root 1 0 R/Size 3>>\nstartxref\n9\n%%EOF\n',
  )
  return {
    name,
    data,
    mimetype: 'application/pdf',
    size: data.byteLength,
  }
}

const categoryImages: Record<string, string> = {
  'on-grid-inverters': 'segment-string.png',
  'hybrid-inverters': 'segment-string.png',
  'utility-scale-inverters': 'segment-cabinet.png',
  bess: 'segment-cabinet.png',
}

export async function seedProducts({ payload }: { payload: Payload }) {
  payload.logger.info('— Seeding product categories...')

  const categoryIds: Record<string, number> = {}

  for (const [index, cat] of staticCategories.entries()) {
    const existing = await payload.find({
      collection: 'categories',
      where: { slug: { equals: cat.slug } },
      limit: 1,
      ...seedOpts,
    })

    if (existing.docs[0]) {
      categoryIds[cat.slug] = existing.docs[0].id
      await payload.update({
        collection: 'categories',
        id: existing.docs[0].id,
        data: {
          title: cat.title,
          description: cat.description,
          sortOrder: index * 10 + 10,
        },
        ...seedOpts,
      })
      continue
    }

    const doc = await payload.create({
      collection: 'categories',
      data: {
        title: cat.title,
        slug: cat.slug,
        description: cat.description,
        sortOrder: index * 10 + 10,
      },
      ...seedOpts,
    })

    categoryIds[cat.slug] = doc.id
  }

  payload.logger.info('— Seeding products...')

  if (!staticProducts.length) {
    payload.logger.info(
      '— No static products to seed. Add products in Admin → Catalogue → Products.',
    )
  }

  const canonicalSlugs = new Set(staticProducts.map((p) => p.slug))

  for (const product of staticProducts) {
    // Prefer canonical model slug; also reclaim any name-based duplicate slug.
    const existing = await payload.find({
      collection: 'products',
      where: {
        or: [{ slug: { equals: product.slug } }, { name: { equals: product.name } }],
      },
      limit: 50,
      ...seedOpts,
    })

    const preferred =
      existing.docs.find((doc) => doc.slug === product.slug) ?? existing.docs[0] ?? null

    // Skip uploading seed media unless S3 is configured. Local disk uploads break
    // Lambda media populate and hide the whole catalogue.
    const canUploadMedia = Boolean(process.env.S3_BUCKET)
    let heroImageId: number | undefined =
      preferred?.heroImage && typeof preferred.heroImage === 'object'
        ? preferred.heroImage.id
        : typeof preferred?.heroImage === 'number'
          ? preferred.heroImage
          : undefined

    if (canUploadMedia && !heroImageId) {
      try {
        const imageFile = readLocalImage(categoryImages[product.categorySlug] ?? 'segment-string.png')
        const hero = await payload.create({
          collection: 'media',
          data: {
            alt: product.name,
            mediaType: 'image',
          },
          file: imageFile,
          ...seedOpts,
        })
        heroImageId = hero.id
      } catch (error) {
        payload.logger.warn(
          `— Skipping hero image for ${product.slug}: ${error instanceof Error ? error.message : error}`,
        )
      }
    }

    const data = {
      name: product.name,
      slug: product.slug,
      generateSlug: false,
      category: categoryIds[product.categorySlug],
      segment: product.segmentKey,
      shortDescription: product.description,
      powerRange: product.powerRange,
      efficiency: product.efficiency,
      phases: product.phases,
      warranty: product.warranty,
      modelSeries:
        product.modelSeries ??
        product.specs.find((s) => s.label === 'Model Series')?.value ??
        undefined,
      featured: product.featured ?? false,
      keySpecs: product.specs.map((s) => ({ label: s.label, value: s.value })),
      // Clear broken local-disk media refs when S3 isn't available (Lambda-safe).
      heroImage: canUploadMedia ? heroImageId : null,
      _status: 'published' as const,
    }

    if (preferred) {
      await payload.update({
        collection: 'products',
        id: preferred.id,
        data,
        ...seedOpts,
      })
    } else {
      await payload.create({
        collection: 'products',
        data,
        ...seedOpts,
      })
    }

    // Remove duplicate rows for the same display name / non-canonical slugs.
    for (const doc of existing.docs) {
      if (preferred && doc.id === preferred.id) continue
      if (doc.name === product.name || !canonicalSlugs.has(doc.slug)) {
        await payload.delete({
          collection: 'products',
          id: doc.id,
          ...seedOpts,
        })
        payload.logger.info(`— Removed duplicate product ${doc.slug} (#${doc.id})`)
      }
    }
  }

  // Remove every product that is not in the new catalogue (old OG6 SKUs, etc.).
  const leftovers = await payload.find({
    collection: 'products',
    depth: 0,
    limit: 500,
    pagination: false,
    ...seedOpts,
  })
  for (const doc of leftovers.docs) {
    if (canonicalSlugs.has(doc.slug)) continue
    await payload.delete({
      collection: 'products',
      id: doc.id,
      ...seedOpts,
    })
    payload.logger.info(`— Removed old product ${doc.slug} (#${doc.id})`)
  }

  const canonicalCategorySlugs = new Set(staticCategories.map((cat) => cat.slug))
  const oldCategories = await payload.find({
    collection: 'categories',
    depth: 0,
    limit: 100,
    pagination: false,
    ...seedOpts,
  })
  for (const doc of oldCategories.docs) {
    if (canonicalCategorySlugs.has(doc.slug)) continue
    await payload.delete({
      collection: 'categories',
      id: doc.id,
      ...seedOpts,
    })
    payload.logger.info(`— Removed old category ${doc.slug} (#${doc.id})`)
  }

  payload.logger.info('— Seeding downloads...')

  const sampleDownloads = [
    { title: 'On Grid Inverters Datasheet', type: 'datasheet' as const },
    { title: 'Hybrid Inverters Datasheet', type: 'datasheet' as const },
    { title: 'Utility Scale Inverters Datasheet', type: 'datasheet' as const },
    { title: 'BESS Home Datasheet', type: 'datasheet' as const },
    { title: 'UL 1741 SA Certificate', type: 'certificate' as const },
    { title: 'ISO 9001 Quality Certificate', type: 'certificate' as const },
  ]

  for (const dl of sampleDownloads) {
    const existing = await payload.find({
      collection: 'downloads',
      where: { title: { equals: dl.title } },
      limit: 1,
      ...seedOpts,
    })

    if (existing.docs[0]) continue

    const fileDoc = await payload.create({
      collection: 'media',
      data: {
        alt: dl.title,
        mediaType: 'document',
      },
      file: minimalPdf(`${dl.title.replace(/\s+/g, '-').toLowerCase()}.pdf`),
      ...seedOpts,
    })

    await payload.create({
      collection: 'downloads',
      data: {
        title: dl.title,
        documentType: dl.type,
        file: fileDoc.id,
        locale: 'en',
      },
      ...seedOpts,
    })
  }
}
