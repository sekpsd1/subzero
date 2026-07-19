import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DEV_DIST_DIR ?? ".next",
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
