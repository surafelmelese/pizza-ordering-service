/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['pizza-ordering-service-ivory.vercel.app', 'assets'], // Corrected domains
  },
    eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
