# Oriana Invertors Web — Next.js standalone + AWS Lambda Web Adapter
FROM public.ecr.aws/docker/library/node:22-alpine AS base
RUN apk add --no-cache libc6-compat

FROM base AS deps
WORKDIR /app

# Workspace root manifests
COPY package.json package-lock.json* ./
COPY apps/cms/package.json ./apps/cms/
COPY apps/ui/package.json ./apps/ui/
COPY packages/shared/package.json ./packages/shared/
COPY cdk/package.json ./cdk/

RUN npm ci --workspace=@oriana/cms --include-workspace-root || npm install --workspace=@oriana/cms --include-workspace-root

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV NEXT_IMAGE_UNOPTIMIZED=true

# Build args for public URL (CloudFront) — can be empty at image build
ARG NEXT_PUBLIC_SERVER_URL=http://localhost:3000
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL

# Always build inside Docker so standalone includes traced node_modules.
# Do NOT reuse CI .next output: CDK excludes **/node_modules from the build
# context, which strips .next/standalone/node_modules and breaks the image.
RUN PAYLOAD_SECRET=build-time-placeholder \
    DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/postgres \
    BUILD_SKIP_DB=true \
    npm run build:next -w @oriana/cms

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_IMAGE_UNOPTIMIZED=true
ENV PORT=3000
ENV AWS_LWA_ENABLE_COMPRESSION=false
ENV AWS_LWA_INVOKE_MODE=buffered

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

# Lambda Web Adapter
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.9.1 /lambda-adapter /opt/extensions/lambda-adapter

COPY --from=builder /app/apps/cms/public ./apps/cms/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/cms/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/cms/.next/static ./apps/cms/.next/static

# Next.js writes cache data at runtime; Lambda only allows writes under /tmp.
RUN mkdir -p /tmp/next-cache \
  && rm -rf /app/apps/cms/.next/cache \
  && ln -sfn /tmp/next-cache /app/apps/cms/.next/cache \
  && chown -h nextjs:nodejs /app/apps/cms/.next/cache

USER nextjs
EXPOSE 3000

# standalone output places server.js under apps/cms when monorepo
CMD ["sh", "-c", "mkdir -p /tmp/next-cache && exec node apps/cms/server.js"]
