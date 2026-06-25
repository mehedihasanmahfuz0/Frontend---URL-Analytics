import type { NextConfig } from "next";

if (!process.env.NEXT_PUBLIC_API_URL) {
  console.warn(
    "\x1b[33m⚠ NEXT_PUBLIC_API_URL is not set. Using default: https://link-analytics-backend-n4g4.onrender.com\x1b[0m"
  );
}

const nextConfig: NextConfig = {
  // Prevent duplicate metadata in production
  reactStrictMode: true,
};

export default nextConfig;
