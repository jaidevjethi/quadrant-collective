import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages. basePath comes from CI only
 * (NEXT_PUBLIC_BASE_PATH=/quadrant-collective for the project page); local
 * dev and a future custom domain run with no prefix. trailingSlash makes
 * every route a folder index so deep links refresh cleanly on Pages. Images
 * use the custom loader so src URLs pick up the basePath in both worlds.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
};

export default nextConfig;
