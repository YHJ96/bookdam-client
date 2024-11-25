/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: undefined,
        hostname: '**',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
