/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Apply this rule to client-side builds only
    if (!isServer) {
      config.module.rules.push({
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true,
            },
          },
        ],
      });
    }

    return config;
  },
};

export default nextConfig;
