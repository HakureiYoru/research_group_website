import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // 优化构建
  reactStrictMode: true,
  // 支持静态导出（可选）
  // output: 'export',
};

export default nextConfig;




