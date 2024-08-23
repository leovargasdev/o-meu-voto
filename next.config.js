/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['page.tsx', 'ts'],
  experimental: {
    optimizePackageImports: ['@phosphor-icons/react'],
  },
}

module.exports = nextConfig
