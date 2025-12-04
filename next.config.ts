import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_URL_API_SERVER: "https://apiesenglish-y99l.onrender.com/api",
    NEXT_PUBLIC_GEMINI_API_KEY: "AIzaSyBrzjD61AGiY3esZTmTTpcgdoQ0Thvh-3Q",
  },
};

export default nextConfig;
