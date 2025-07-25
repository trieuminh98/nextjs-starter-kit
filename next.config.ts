import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    devtoolSegmentExplorer: true,
    browserDebugInfoInTerminal: true,
  },
};

export default nextConfig;
