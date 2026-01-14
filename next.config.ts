import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // output:'export',
  // eslint:{
  //   ignoreDuringBuilds: true
  // }
  async rewrites() {
    return [
      {
        source: '/hotels/luxury-hotels-in-:slug',
        destination: '/hotels/luxury-hotels-in/:slug',
      },
    ];
  },
  images: {
    domains: ['cdn.cholantours.com'],
  },
   eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

