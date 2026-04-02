/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs'],
  },
  generateEtags: false,
  poweredByHeader: false,
}

module.exports = nextConfig
