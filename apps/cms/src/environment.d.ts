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
      /** Local/dev static keys only — never set these on Lambda (use IAM role). */
      S3_ACCESS_KEY_ID?: string
      S3_SECRET_ACCESS_KEY?: string
      S3_SESSION_TOKEN?: string
      PAYLOAD_DATABASE_PUSH?: string
      ADMIN_EMAIL?: string
      ADMIN_PASSWORD?: string
      ADMIN_NAME?: string
    }
  }
}

export {}
