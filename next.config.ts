import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_URL_API_SERVER: "https://apiesenglish-y99l.onrender.com/api",
  },
};

export default nextConfig;
