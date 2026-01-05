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
};

module.exports = nextConfig;
