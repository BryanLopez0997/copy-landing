/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      { source: '/guia-proteccion', destination: '/guia-proteccion.html' },
    ]
  },
}

export default nextConfig
