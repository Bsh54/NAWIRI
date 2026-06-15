/** @type {import('next').NextConfig} */
const nextConfig = {
  // Make sure the program database and system prompt are bundled with the
  // serverless function that reads them at runtime (Vercel).
  // NOTE: this project is pinned to Next.js 14.2.x, where this key lives
  // under `experimental`. (Next 16 moved it to the top level.)
  experimental: {
    outputFileTracingIncludes: {
      "/api/chat": ["./data/**/*.md", "./prompts/**"],
    },
  },
};

export default nextConfig;
