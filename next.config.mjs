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
  },
};

export default nextConfig;
