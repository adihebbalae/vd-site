/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/vd-site",
  distDir: "docs",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
