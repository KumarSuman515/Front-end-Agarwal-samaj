/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BACKEND_URL: 'https://api.abaspunjab.in',
    NEXT_PUBLIC_API_URL: 'https://api.abaspunjab.in',
    NEXT_PUBLIC_API_BASE_URL: 'https://api.abaspunjab.in/api',
    NEXT_PUBLIC_UPLOADS_URL: 'https://api.abaspunjab.in/uploads',
  },
  images: {
    unoptimized: true,
    domains: ["localhost", "images.unsplash.com", "api.abaspunjab.in"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4005",
      },
      {
        protocol: "https",
        hostname: "api.abaspunjab.in",
        port: "",
      },
    ],
  },
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  // Note: Security headers removed as they don't work with output: 'export'
  // Configure these in your web server (nginx/apache) instead
};

module.exports = nextConfig;
