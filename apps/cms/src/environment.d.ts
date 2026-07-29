declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PAYLOAD_SECRET: string
      DATABASE_URL: string
      NEXT_PUBLIC_SERVER_URL: string
      VERCEL_PROJECT_PRODUCTION_URL?: string
      CRON_SECRET?: string
      PREVIEW_SECRET?: string
      S3_BUCKET?: string
      S3_REGION?: string
      AWS_REGION?: string
      AWS_ACCESS_KEY_ID?: string
      AWS_SECRET_ACCESS_KEY?: string
      PAYLOAD_DATABASE_PUSH?: string
      ADMIN_EMAIL?: string
      ADMIN_PASSWORD?: string
      ADMIN_NAME?: string
    }
  }
}

export {}
