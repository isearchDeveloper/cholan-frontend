// 

import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  // trailingSlash: true,

  async rewrites() {
    return [
      // existing hotel rewrite
      {
        source: "/hotels/luxury-hotels-in-:slug",
        destination: "/hotels/luxury-hotels-in/:slug",
      },

      //  INDIA category URLs
      // {
      //   source: "/india/:city/:category",
      //   destination:
      //     "/india/:city-tour-packages?category_slug=:category&page=1",
      // },

      //  INTERNATIONAL category URLs
      // {
      //   source: "/international-holidays/:city/:category",
      //   destination:
      //     "/international-holidays/:city-tour-packages?category_slug=:category&page=1",
      // },
    ];
  },

  images: {
    domains: ["cdn.cholantours.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cholan-admin.maxbridgesolution.in",
      },
    ],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
