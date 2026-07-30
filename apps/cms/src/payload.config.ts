import { postgresAdapter } from '@payloadcms/db-postgres'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { CaseStudies } from './collections/CaseStudies'
import { Categories } from './collections/Categories'
import { Certifications } from './collections/Certifications'
import { ContentPages } from './collections/ContentPages'
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
import { Users } from './collections/Users'
import { Videos } from './collections/Videos'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { About } from './globals/About'
import { Careers } from './globals/Careers'
import { Contact } from './globals/Contact'
import { Home } from './globals/Home'
import { PageIntros } from './globals/PageIntros'
import { SiteSettings } from './globals/SiteSettings'
import { Support } from './globals/Support'
import { Sustainability } from './globals/Sustainability'
import { SustainabilityReports } from './globals/SustainabilityReports'
import { Warranty } from './globals/Warranty'
import { WhereToBuy } from './globals/WhereToBuy'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    meta: {
      titleSuffix: '— Oriana Inverters',
    },
    components: {
      beforeLogin: ['@/components/BeforeLogin'],
      beforeDashboard: ['@/components/BeforeDashboard'],
      graphics: {
        Logo: '@/components/AdminLogo#Logo',
        Icon: '@/components/AdminIcon#Icon',
      },
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
      // Supabase session pooler is tiny (often pool_size=15 shared). Keep this low so
      // schema:push / Lambda don't exhaust EMAXCONNSESSION during Drizzle introspect.
      max: Number(
        process.env.PG_POOL_MAX ||
          (process.env.PAYLOAD_DATABASE_PUSH === 'true' ? 1 : 3),
      ),
      idleTimeoutMillis: process.env.PAYLOAD_DATABASE_PUSH === 'true' ? 1000 : 10_000,
      connectionTimeoutMillis: 60_000,
      allowExitOnIdle: true,
    },
    // Set PAYLOAD_DATABASE_PUSH=true for first-time schema bootstrap; prefer migrations in CI/CD
    push: process.env.PAYLOAD_DATABASE_PUSH === 'true',
    prodMigrations: migrations,
  }),
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
    Partners,
    Certifications,
    Solutions,
    ContentPages,
    Users,
  ],
  cors: [getServerSideURL()].filter(Boolean),
  serverURL: getServerSideURL(),
  globals: [
    Header,
    Footer,
    SiteSettings,
    Home,
    About,
    Contact,
    Careers,
    Support,
    Warranty,
    Sustainability,
    SustainabilityReports,
    WhereToBuy,
    PageIntros,
  ],
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
