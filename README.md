# 🚀 Next.js Starter Kit (App Router)

Opinionated starter focused on clarity and DX. Includes nextjs best concept examples, API routes, global state with Jotai, and React Query for server state.

## ✨ Features

### 🏗️ Core

- ⚡ Next.js 15 (App Router, Server Components)
- 🔷 TypeScript (strict)
- ⚛️ React 19

### 🔌 Data & State

- 🔁 TanStack Query v5 (server state, caching, devtools)
- 🧪 Axios instance with env-based baseURL (`NEXT_PUBLIC_API_BASE_URL`)
- 🧊 Jotai global state (Provider wired, hydration example)
- 🧩 API Routes examples under `src/app/api`

### 🛠️ Dev Experience

- 🧭 React Query Devtools, Jotai DevTools
- 🛰️ React Scan (dev-only performance overlay)
- 🧹 ESLint + Prettier

### 🐳 Ops

- 🐳 Dockerfile (multi-stage ready)
- 🏥 Health endpoints (`/api/health`)

## 🚀 Quick Start

### Prerequisites

- Node.js 22+
- pnpm (required)

### Install

```bash
pnpm install

# Dev
pnpm dev

# Build / Start
pnpm build && pnpm start
```

Visit http://localhost:3000

## 📁 Project Structure

```
src/
  app/
    api/                 # API routes (e.g. /api/configs, /api/auth/...)
    hydrated-page/       # SSR fetch + hydrate Jotai example
    components/          # Client components (UserInfo, etc.)
    layout.tsx           # Root layout
    page.tsx             # Landing page
  components/core/       # Core UI helpers (ComponentWrapper, Image)
  constants/             # Keys, common constants
  lib/                   # http (axios, fetcher), cookies
  providers/             # React Query, Auth, DevTools, Provider tree
  services/              # API services (auth, user, configs)
  state/                 # Jotai atoms (e.g., configsAtom)
  types/                 # Shared types
  utils/                 # Utilities
```

## 🔧 Configuration

### Environment Variables

Create `.env.local` and set at least:

- `NEXT_PUBLIC_API_BASE_URL` (e.g. http://localhost:3000)
- Optional ISR for configs demo: `NEXT_PUBLIC_CONFIGS_REVALIDATE=300`

Axios instance reads `NEXT_PUBLIC_API_BASE_URL`. Server-side examples use Next.js `fetch` with ISR/no-store depending on the route.

## 🧭 Notable Examples

- SSR + hydrate to Jotai: `src/app/hydrated-page/page.tsx` → fetch `/api/configs`, render SSR, hydrate into `configsAtom` for client.
- API mocks: `src/app/api/configs/route.ts`, `src/app/api/auth/*`
- Global providers: `src/providers/provider.tsx` (Jotai, React Query, DevTools)
- ONLY USE server side fetch for global API (without auth), remaining will be fetch on client side

## 🧰 Dev Tools

- React Query Devtools and Jotai DevTools are enabled in dev.
- React Scan is wired in `src/providers/devTool.tsx` (toolbar, optional `trackUnnecessaryRenders`). See project README for options.

## 🧪 Lint & Format

```bash
pnpm lint
pnpm format
```

## 🐳 Docker

```bash
pnpm build
docker build -t nextjs-starter-kit .
```

## 📄 License

MIT

---

⭐ Star nếu template này hữu ích!
