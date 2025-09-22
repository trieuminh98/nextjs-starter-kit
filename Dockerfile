# Stage 1: Dependencies
FROM node:22-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* .npmrc* ./

# Install dependencies (clean up cache)
RUN corepack enable \
  && pnpm install --frozen-lockfile --prefer-offline \
  && pnpm store prune \
  && npm cache clean --force

# Stage 2: Builder
FROM node:22-alpine AS builder
WORKDIR /app

# Copy dependencies and source
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time environment variables
ARG NODE_ENV=production
ARG SKIP_ENV_VALIDATION=true
ARG NEXT_PUBLIC_API_BASE_URL

ENV NODE_ENV=$NODE_ENV \
    SKIP_ENV_VALIDATION=$SKIP_ENV_VALIDATION \
    NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

# Build the application
RUN npm run build

# Stage 3: Runner (Distroless)
FROM gcr.io/distroless/nodejs22 AS runner
WORKDIR /app

# Copy only what is needed to run
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set environment variables
ENV NODE_ENV=production \
    PORT=4000 \
    HOSTNAME="0.0.0.0"

# Expose port
EXPOSE 4000

# Healthcheck (Distroless không có shell, nên chỉ chạy node trực tiếp)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD ["node", "healthcheck.js"]

# Run server
CMD ["server.js"]
