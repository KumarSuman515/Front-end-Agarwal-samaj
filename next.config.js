/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BACKEND_URL: 'https://api.abaspunjab.in',
    NEXT_PUBLIC_API_URL: 'https://api.abaspunjab.in',
    NEXT_PUBLIC_API_BASE_URL: 'https://api.abaspunjab.in/api',
    NEXT_PUBLIC_UPLOADS_URL: 'https://api.abaspunjab.in/uploads',
  },
  images: {
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
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
