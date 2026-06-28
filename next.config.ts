import type { NextConfig } from "next";

const repoName = "black-sky-labs-portfolio-coming-soon";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",
  images: {
    unoptimized: true
  },
  trailingSlash: true
};

export default nextConfig;
