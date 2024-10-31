import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    dirs: ["./src/components","./src/app"], // Only run ESLint on these directories during production builds (next build)
  },
};

export default nextConfig;
