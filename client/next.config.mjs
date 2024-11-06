/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['pizza-ordering-service-1.onrender.com'], // Corrected domains
  },
    eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
