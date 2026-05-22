/** @type {import('next').NextConfig} */
const nextConfig = {
  // Bỏ qua lỗi TypeScript trong quá trình build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Tắt hoàn toàn ESLint trong quá trình build
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
  images: {
    unoptimized: true,
  },
}

export default nextConfig