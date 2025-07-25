import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output :'standalone',
  images: {
    domains: ['uploads-ssl.webflow.com', 'lh3.googleusercontent.com', 'images.remotePatterns'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
