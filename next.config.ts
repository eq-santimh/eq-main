import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    // Ensure Turbopack resolves modules from this app's root (not the parent folder).
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
