/** @type {import('next').NextConfig} */
const nextConfig = {
  // Make sure the program database and system prompt are bundled with the
  // serverless function that reads them at runtime.
  experimental: {
    outputFileTracingIncludes: {
      "/api/chat": ["./data/**", "./prompts/**"],
    },
  },
};

export default nextConfig;
