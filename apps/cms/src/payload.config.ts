import { postgresAdapter } from '@payloadcms/db-postgres'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Awards } from './collections/Awards'
import { CaseStudies } from './collections/CaseStudies'
import { Categories } from './collections/Categories'
import { Certifications } from './collections/Certifications'
import { Distributors } from './collections/Distributors'
import { Downloads } from './collections/Downloads'
import { Faqs } from './collections/Faqs'
import { Jobs } from './collections/Jobs'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Partners } from './collections/Partners'
import { Posts } from './collections/Posts'
import { Products } from './collections/Products'
import { Solutions } from './collections/Solutions'
import { SustainabilityReports } from './collections/SustainabilityReports'
import { Users } from './collections/Users'
import { Videos } from './collections/Videos'
import { WarrantyPlans } from './collections/WarrantyPlans'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { About } from './globals/About/config'
import { Careers } from './globals/Careers/config'
import { Contact } from './globals/Contact/config'
import { Home } from './globals/Home/config'
import { Support } from './globals/Support/config'
import { Sustainability } from './globals/Sustainability/config'
import { SiteSettings } from './SiteSettings/config'
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
      max: Number(
        process.env.PG_POOL_MAX ||
          (process.env.PAYLOAD_DATABASE_PUSH === 'true' ? 1 : 5),
      ),
      idleTimeoutMillis: process.env.PAYLOAD_DATABASE_PUSH === 'true' ? 1000 : 5_000,
      connectionTimeoutMillis: Number(process.env.PG_CONNECT_TIMEOUT_MS || 20_000),
      allowExitOnIdle: true,
    },
    // Multi-tenant: prod uses oriana_invertors on shared RDS. Do NOT pass "public" —
    // Drizzle/Payload reject schemaName:'public' (use default pgTable instead).
    ...(() => {
      const schema = (process.env.PAYLOAD_DB_SCHEMA || process.env.DB_SCHEMA || '').trim()
      return schema && schema !== 'public' ? { schemaName: schema } : {}
    })(),
    push: process.env.PAYLOAD_DATABASE_PUSH === 'true',
    prodMigrations: migrations,
  }),
  folders: {
    browseByFolder: true,
  },
  collections: [
    Pages,
    Posts,
    Products,
    Downloads,
    Media,
    Categories,
    CaseStudies,
    Faqs,
    Videos,
    Distributors,
    Jobs,
    Certifications,
    Awards,
    Partners,
    Solutions,
    WarrantyPlans,
    SustainabilityReports,
    Users,
  ],
  cors: [getServerSideURL()].filter(Boolean),
  serverURL: getServerSideURL(),
  globals: [Header, Footer, SiteSettings, Home, About, Careers, Support, Sustainability, Contact],
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
