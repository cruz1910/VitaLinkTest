module.exports = {
  devServer: {
    setupMiddlewares: (middlewares, devServer) => {
      // This replaces the deprecated onAfterSetupMiddleware
      return middlewares;
    },
  },
  webpack: {
    configure: (webpackConfig) => {
      // Additional webpack configuration if needed
      return webpackConfig;
    },
  },
};
