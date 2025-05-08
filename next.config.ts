
import type { NextConfig } from "next";
import withPayload from "@payloadcms/next/withPayload";
import redirects from './redirects.js'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.VERCEL_PROJECT_PRODUCTION_URL || 'localhost',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      // If you need to support specific domains, add them here
    ],
  },
  redirects,
  async rewrites() {
    return [
      {
        source: "/rss.xml",
        destination: "/feed/rss.xml",
      },
      {
        source: "/atom.xml",
        destination: "/feed/atom.xml",
      },
      {
        source: "/feed.json",
        destination: "/feed/feed.json",
      },
      {
        source: "/rss",
        destination: "/feed/rss.xml",
      },
      {
        source: "/feed",
        destination: "/feed/rss.xml",
      },
      {
        source: "/atom",
        destination: "/feed/atom.xml",
      },
      {
        source: "/json",
        destination: "/feed/feed.json",
      },
    ];
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
