import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    // Prevent Next from inferring the wrong monorepo root on Windows
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
