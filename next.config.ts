import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // 便于 OSS 静态网站托管直接访问目录路径
  trailingSlash: true,
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




