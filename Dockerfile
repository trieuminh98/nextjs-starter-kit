# Install dependencies only when needed
FROM node:22-alpine AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /nextjs-starter-kit
COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm@10.13.1 && pnpm install

FROM node:22-alpine as builder

ENV NODE_ENV production

WORKDIR /nextjs-starter-kit
COPY . .
COPY --from=deps /nextjs-starter-kit/node_modules ./node_modules

RUN npm run build
RUN npm run googlecloud:upload


FROM node:22-alpine AS runner

ARG NEXT_PUBLIC_ASSET_PREFIX
ENV NEXT_PUBLIC_ASSET_PREFIX $NEXT_PUBLIC_ASSET_PREFIX

WORKDIR /nextjs-starter-kit

ENV NODE_ENV production

# Don't run container as root, we should creating a new user with the least privileges.
#RUN addgroup -g 1001 -S nodejs
#RUN adduser -S nextjs -u 1001

COPY --from=builder /nextjs-starter-kit/ ./

RUN apk add --no-cache tzdata && \
  cp -f /usr/share/zoneinfo/Asia/Ho_Chi_Minh /etc/localtime && \
  echo "Asia/Ho_Chi_Minh" > /etc/timezone

# Specify user
#USER nextjs

EXPOSE 8080

CMD [ "npm", "run", "start" ]
