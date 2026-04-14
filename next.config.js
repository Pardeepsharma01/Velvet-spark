/** @type {import('next').NextConfig} */
const nextConfig = {
  //  images: {
  //   domains: ["images.unsplash.com","plus.unsplash.com"],
  // },
   images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
  // config
};

export default nextConfig;
