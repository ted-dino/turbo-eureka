/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["argon2"],
  },
  images: {
    domains: ["image.tmdb.org", "api.dicebear.com"],
  },
  trailingSlash: true,
};

module.exports = nextConfig;
