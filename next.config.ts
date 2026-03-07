import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://cocktails.solvro.pl/images/cocktails/**"),
    ],
  },
};

export default nextConfig;
