// /** @type {import('next').NextConfig} */

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      env: {
        NEXTAUTH_URL: 'http://localhost:3000',
      },
    };
  }
  return {
    reactStrictMode: true,
    env: {
      NEXTAUTH_URL: 'http://localhost:3000',
    },
  };
};

// module.exports = nextConfig;
