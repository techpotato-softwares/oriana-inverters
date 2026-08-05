import { postgresAdapter } from '@payloadcms/db-postgres'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Downloads } from './collections/Downloads'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Products } from './collections/Products'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    theme: 'light',
    meta: {
      titleSuffix: '— Oriana Inverters',
      icons: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          url: '/favicon.svg',
        },
        {
          rel: 'icon',
          type: 'image/x-icon',
          url: '/favicon.ico',
        },
      ],
    },
    components: {
      graphics: {
        Logo: '@/components/AdminLogo',
        Icon: '@/components/AdminIcon',
      },
      beforeLogin: ['@/components/BeforeLogin'],
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
      // Prefer Supabase transaction pooler (:6543). Session mode (:5432) caps at
      // pool_size≈15 and returns EMAXCONNSESSION under Lambda concurrency → blank admin.
      // Keep ≥2 so Payload can hold one client and still run a second query.
      max: Number(
        process.env.PG_POOL_MAX ||
          (process.env.PAYLOAD_DATABASE_PUSH === 'true' ? 1 : 2),
      ),
      idleTimeoutMillis: process.env.PAYLOAD_DATABASE_PUSH === 'true' ? 1000 : 5_000,
      // Keep well under CloudFront's 60s origin timeout so admin fails fast
      // instead of hanging with an empty response.
      connectionTimeoutMillis: Number(process.env.PG_CONNECT_TIMEOUT_MS || 10_000),
      allowExitOnIdle: true,
    },
    // Set PAYLOAD_DATABASE_PUSH=true for first-time schema bootstrap; prefer migrations in CI/CD
    push: process.env.PAYLOAD_DATABASE_PUSH === 'true',
    prodMigrations: migrations,
  }),
  collections: [Pages, Posts, Products, Downloads, Media, Categories, Users],
  cors: [getServerSideURL()].filter(Boolean),
  serverURL: getServerSideURL(),
  globals: [Header, Footer],
  plugins,
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        if (req.user) return true

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})
