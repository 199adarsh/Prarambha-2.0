import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  // Netlify static exports don't support Next.js Image Optimization API without a custom loader
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
