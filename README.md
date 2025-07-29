# Next.js Starter Kit

A modern Next.js starter kit with authentication, HTTP client architecture, and comprehensive tooling.

## 🚀 Features

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React Query** for data fetching
- **Authentication** with JWT tokens
- **HTTP Client** with Axios and interceptors
- **Code Quality** tools (ESLint, Prettier, Husky)
- **Health Check APIs** for monitoring
- **SVG Optimization** with SVGO
- **Git Hooks** with commitlint

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd nextjs-starter-kit

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## 🔧 Scripts

```bash
# Development
pnpm dev          # Start dev server on port 4000
pnpm build        # Build for production
pnpm start        # Start production server
pnpm serve        # Build and start production server

# Code Quality
pnpm lint         # Run ESLint
pnpm format       # Format code with Prettier

# Utilities
pnpm svgo         # Optimize SVG files
```

## 🔐 Authentication

### Login Flow

- **Endpoint**: `/api/auth/signin`
- **Method**: POST
- **Credentials**: `admin@example.com` / `123456`
- **Response**: JWT token stored in HttpOnly cookie

### Protected Routes

- Middleware checks for `jwtToken` cookie
- Redirects to `/login` if not authenticated
- Public paths: `/login`

## 🌐 HTTP Client Architecture

### Features

- **Global instance** with base URL and headers
- **Request/Response interceptors** for tokens and error handling
- **Automatic retry** (max 5 attempts)
- **Request cancellation** support
- **Isomorphic** (client & server compatible)
- **Easy replacement** (can switch to other HTTP clients)

## 🏥 Health Check APIs

### Endpoints

#### 1. `/api/health` - Basic Health Check

**GET** - Returns basic system information

```bash
curl http://localhost:4000/api/health
```

**Response:**

```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 3600,
  "environment": "development",
  "version": "1.0.0"
}
```

#### 2. `/api/health/live` - Liveness Check

**GET/HEAD** - Simple check for load balancers

```bash
curl http://localhost:4000/api/health/live
```

**Response:**

```json
{
  "status": "ok"
}
```

### Container Integration

#### Docker Compose

```yaml
version: '3.8'
services:
  app:
    build: .
    healthcheck:
      test: ['CMD', 'curl', '-f', 'http://localhost:4000/api/health/live']
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

## 🛠️ Development Tools

### Code Quality

- **ESLint** - Code linting with Next.js config
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Run linters on staged files
- **commitlint** - Enforce commit message format

### Commit Message Format

```
type: subject

feat: add new feature
fix: bug fix
refactor: code refactoring
docs: documentation changes
style: formatting changes
chore: maintenance tasks
```

### SVG Optimization

- **SVGO** - Automatic SVG optimization
- Runs before commit via lint-staged
- Configurable via `svgo.config.mjs`

## 🔧 Configuration

### Environment Variables

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
NODE_ENV=development
```

### Next.js Config

- **Turbopack** enabled for faster development
- **Image optimization** with WebP/AVIF support
- **Experimental features** enabled

## 📊 Monitoring

### Health Check Status Codes

- **200** - Healthy
- **503** - Unhealthy/Error

### Logging

- Health check failures are logged to console
- Structured logging for debugging

## 🚀 Deployment

### Build

```bash
pnpm build
```

### Start Production

```bash
pnpm start
```

### Docker

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
EXPOSE 8080
CMD ["pnpm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Commit with conventional format
6. Create a pull request

## 📝 License

MIT License - see LICENSE file for details

---

**Health Check APIs** provide essential monitoring capabilities for production deployments, container orchestration, and load balancer integration.
