import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [25, 50, 75, 85, 90, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/nh6l4zx7/production/**",
      },
    ],
  },
};

export default nextConfig;
