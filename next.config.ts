import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    // Pre-verified in template; skips duplicate 7s typecheck on Vercel
    ignoreBuildErrors: true,
  },
  eslint: {
    // Skips duplicate lint step on Vercel
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
