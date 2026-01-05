/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    // We're intentionally using <img> tags for external sources
    // that we can't add to domains list
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        "criptor.net",
        "www.criptor.net",
        "localhost:3000",
        "0.0.0.0:3000",
      ],
    },
  },
};

module.exports = nextConfig;
