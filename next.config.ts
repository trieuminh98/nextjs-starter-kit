import { ImageQuality } from '@/types/common';
import type { NextConfig } from 'next';

const IMAGE_QUALITIES: ImageQuality[] = [25, 50, 75, 100];

const nextConfig: NextConfig = {
  experimental: {
    devtoolSegmentExplorer: true,
    browserDebugInfoInTerminal: true,
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
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
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
