import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/takenext',
  assetPrefix: '/takenext/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
