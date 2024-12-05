module.exports = {
    reactStrictMode: true,
    // Otras configuraciones
    async rewrites() {
      return [
        {
          source: '/service-worker.js',
          destination: '/public/service-worker.js',
        },
      ];
    },
  };
  