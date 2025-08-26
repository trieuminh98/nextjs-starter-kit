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
};

export default nextConfig;
