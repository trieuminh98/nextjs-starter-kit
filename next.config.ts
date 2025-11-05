import { ImageQuality } from '@/types/common';
import type { NextConfig } from 'next';

const IMAGE_QUALITIES: ImageQuality[] = [25, 50, 75, 100];

const nextConfig: NextConfig = {
  output: 'standalone',
  reactCompiler: true,
  experimental: {
    browserDebugInfoInTerminal: true,
    turbopackFileSystemCacheForDev: true,
  },
  typedRoutes: true,
  images: {
    qualities: IMAGE_QUALITIES, // Explicitly allow quality={25, 50, 75, 100}
  },
  transpilePackages: ['jotai-devtools'],
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Prevent embedding iframe
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          // Prevent MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Prevent referrer policy
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Prevent camera, microphone, geolocation
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },

  // Rewrites for API versioning
  async rewrites() {
    return [
      // {
      //   source: '/api/v1/:path*',
      //   destination: '/api/:path*',
      // },
    ];
  },
};

export default nextConfig;
