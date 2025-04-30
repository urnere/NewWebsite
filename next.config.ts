
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
       // Removed picsum.photos pattern
      {
        protocol: 'https',
        hostname: 'picsum.photos', // Keep for project placeholders if needed
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
