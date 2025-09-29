import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/takenext',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
