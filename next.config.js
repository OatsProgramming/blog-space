/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 360 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 10,
  },
}

module.exports = nextConfig
