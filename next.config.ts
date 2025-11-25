import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // 静态导出时关闭图片优化以兼容无服务器环境
    unoptimized: true,
  },
  // 优化构建
  reactStrictMode: true,
};

export default nextConfig;




