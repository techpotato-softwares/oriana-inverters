# Oriana Invertors Web — Next.js standalone + AWS Lambda Web Adapter
FROM public.ecr.aws/docker/library/node:22-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Workspace root manifests
COPY package.json package-lock.json* ./
COPY apps/cms/package.json ./apps/cms/
COPY apps/ui/package.json ./apps/ui/
COPY packages/shared/package.json ./packages/shared/
COPY cdk/package.json ./cdk/

RUN npm ci --workspace=@oriana/cms --include-workspace-root --omit=optional || npm install --workspace=@oriana/cms --include-workspace-root

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/cms/node_modules ./apps/cms/node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build args for public URL (CloudFront) — can be empty at image build
ARG NEXT_PUBLIC_SERVER_URL=http://localhost:3000
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL
# Dummy secrets so Next/Payload can compile; runtime overrides via Lambda env
ARG PAYLOAD_SECRET=build-time-secret-change-me
ENV PAYLOAD_SECRET=$PAYLOAD_SECRET
ARG DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres
ENV DATABASE_URL=$DATABASE_URL

RUN npm run build:next -w @oriana/cms

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV AWS_LWA_ENABLE_COMPRESSION=true
ENV AWS_LWA_INVOKE_MODE=response_stream

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

# Lambda Web Adapter
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.9.1 /lambda-adapter /opt/extensions/lambda-adapter

COPY --from=builder /app/apps/cms/public ./apps/cms/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/cms/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/cms/.next/static ./apps/cms/.next/static

USER nextjs
EXPOSE 3000

# standalone output places server.js under apps/cms when monorepo
CMD ["node", "apps/cms/server.js"]
