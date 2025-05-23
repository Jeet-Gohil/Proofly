import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['uploads-ssl.webflow.com', 'lh3.googleusercontent.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
