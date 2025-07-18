import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/bsky",
        destination: "https://bsky.app/profile/liam.so",
        permanent: false,
      },
      {
        source: "/bluesky",
        destination: "https://bsky.app/profile/liam.so",
        permanent: false,
      },
      {
        source: "/twitter",
        destination: "https://x.com/lermatroid",
        permanent: false,
      },
      {
        source: "/x",
        destination: "https://x.com/lermatroid",
        permanent: false,
      },
      {
        source: "/github",
        destination: "https://github.com/lermatroid",
        permanent: false,
      },
      {
        source: "/gh",
        destination: "https://github.com/lermatroid",
        permanent: false,
      },
      {
        source: "/instagram",
        destination: "https://www.instagram.com/lermatroid",
        permanent: false,
      },
      {
        source: "/ig",
        destination: "https://www.instagram.com/lermatroid",
        permanent: false,
      },
      {
        source: "/instagram",
        destination: "https://www.instagram.com/lermatroid",
        permanent: false,
      },
      {
        source: "/linkedin",
        destination: "https://linkedin.com/in/liamrmurray",
        permanent: false,
      },
      {
        source: "/resume",
        destination: "https://fs.liam.so/Liam%20Murray%20Resume%202024.pdf",
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.basehub.com",
      },
    ],
  },
};

export default nextConfig;
