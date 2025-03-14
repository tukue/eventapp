/** @type {import('next').NextConfig} */
const nextConfig = {
  // Other Next.js configuration options
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /\.test\.js$/,
        loader: 'ignore-loader',
      });
    }
    return config;
  },
};

module.exports = nextConfig;