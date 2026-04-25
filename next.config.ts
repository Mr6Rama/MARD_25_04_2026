import type { NextConfig } from "next";
<<<<<<< HEAD

const nextConfig: NextConfig = {
  /* config options here */
=======
import path from "node:path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.resolve(__dirname),
>>>>>>> 078473e3bd9fa783777c0e85e195e0c823324cf0
};

export default nextConfig;
