
const path = require('path');

module.exports = {
  webpack: function (config, env) {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.alias,
        '@config': path.resolve(__dirname, 'src/config'),
        '@redux': path.resolve(__dirname, 'src/redux'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@services': path.resolve(__dirname, 'src/services'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@type': path.resolve(__dirname, 'src/type'),
      },
    };
    return config;
  },


  jest: function (config) {
    config.moduleNameMapper = {
      ...config.moduleNameMapper,
      "@config/(.*)": "<rootDir>/src/config/$1",
      "@redux/(.*)": "<rootDir>/src/redux/$1",
      "@hooks/(.*)": "<rootDir>/src/hooks/$1",
      "@services/(.*)": "<rootDir>/src/services/$1",
      "@pages/(.*)": "<rootDir>/src/pages/$1",
      "@styles/(.*)": "<rootDir>/src/styles/$1",
      "@components/(.*)": "<rootDir>/src/components/$1",
      "@type/(.*)": "<rootDir>/src/type/$1"
    }

    return config
  }
}