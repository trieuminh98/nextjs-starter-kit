import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    devtoolSegmentExplorer: true,
    browserDebugInfoInTerminal: true,
  },
  typedRoutes: true,
};

export default nextConfig;
