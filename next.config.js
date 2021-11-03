const path = require('path');

/** @type {import('next').NextConfig} */
module.exports = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      return {
        ...config,
        entry() {
          return config.entry().then((entry) => ({
              ...entry,
              worker: path.resolve(process.cwd(), 'worker.ts')
            })
          );
        }
      };
    }
    return config;
  },
  reactStrictMode: true
};
