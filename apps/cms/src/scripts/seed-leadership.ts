/**
 * Pre-fill About Pages › Leadership with the built-in directors and upload their portraits to Media,
 * so editors start from real entries in the admin. Skips when directors already exist unless --force.
 *
 *   npm run seed:leadership -w @oriana/cms [-- --force]
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { getPayload, type File } from 'payload'
import config from '@payload-config'

import {
  defaultLeaders,
  defaultLeadership,
} from '@/components/oriana/about/leadership/leadershipData'

const force = process.argv.includes('--force')
const seedOpts = { overrideAccess: true as const, context: { disableRevalidate: true } }

const dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.resolve(dirname, '../../public')

function readPublicFile(publicPath: string): File {
  const data = fs.readFileSync(path.join(publicDir, publicPath))
  return {
    name: path.basename(publicPath),
    data,
    mimetype: 'image/jpeg',
    size: data.byteLength,
  }
}

const payload = await getPayload({ config })

const about = await payload.findGlobal({ slug: 'about', depth: 0, ...seedOpts })
if ((about.leadership?.members?.length ?? 0) > 0 && !force) {
  payload.logger.info('Leadership already has directors — skipping (pass --force to overwrite).')
  await payload.destroy()
  process.exit(0)
}

const members = []
for (const leader of defaultLeaders) {
  let photo: number | undefined
  if (leader.image) {
    const filename = path.basename(leader.image)
    try {
      const existing = await payload.find({
        collection: 'media',
        where: { filename: { equals: filename } },
        limit: 1,
        ...seedOpts,
      })
      photo =
        existing.docs[0]?.id ??
        (
          await payload.create({
            collection: 'media',
            data: { alt: `Portrait of ${leader.name}, ${leader.role}` },
            file: readPublicFile(leader.image),
            ...seedOpts,
          })
        ).id
    } catch (error) {
      payload.logger.warn(`Could not upload ${filename}; the built-in portrait will be used. ${String(error)}`)
    }
  }
  members.push({
    name: leader.name,
    title: leader.role,
    bio: leader.bio,
    linkedinUrl: leader.linkedin || null,
    photo,
  })
}

await payload.updateGlobal({
  slug: 'about',
  data: {
    leadership: {
      intro: {
        eyebrow: defaultLeadership.eyebrow,
        title: defaultLeadership.title,
        description: defaultLeadership.description,
      },
      members,
    },
  },
  ...seedOpts,
})

payload.logger.info(`Seeded ${members.length} directors into About Pages › Leadership.`)
await payload.destroy()
