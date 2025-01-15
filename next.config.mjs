/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: undefined,
        hostname: '**',
        pathname: '**',
      },
    ],
    minimumCacheTTL: 3600,
  },
};

export default nextConfig;
