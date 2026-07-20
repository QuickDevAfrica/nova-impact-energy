/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@nova/ui', '@nova/design-tokens', '@nova/content-model'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
};

export default nextConfig;
