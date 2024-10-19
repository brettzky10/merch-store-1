/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.cdn.printful.com",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      }
    ],
    },
};

export default nextConfig;
