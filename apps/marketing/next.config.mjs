/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@nova/ui', '@nova/design-tokens', '@nova/content-model'],
  images: {
    // cdn.sanity.io is what serves every project photo -- confirmed present
    // here as part of Phase 2 task 3's image-bug investigation.
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  // Phase 2 task 2 renamed /services -> /solutions and /impact -> /proof.
  // Redirect the old paths rather than letting them 404 -- anyone with an
  // old link (bookmark, external site, search result) still lands correctly.
  async redirects() {
    return [
      { source: '/services', destination: '/solutions', permanent: true },
      { source: '/services/:path*', destination: '/solutions/:path*', permanent: true },
      { source: '/impact', destination: '/proof', permanent: true },
      { source: '/impact/:path*', destination: '/proof/:path*', permanent: true },
    ];
  },
};

export default nextConfig;
