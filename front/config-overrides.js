const { removeModuleScopePlugin } = require("customize-cra");
const webpack = require("webpack");

// override webpack config
module.exports = function override(config, env) {
  // enable caver-js module
  config.resolve.fallback = {
    ...config.resolve.fallback,
    assert: require.resolve('assert'),
    buffer: require.resolve('buffer'),
    crypto: require.resolve("crypto-browserify"),
    fs: false,
    https: require.resolve("https-browserify"),
    http: require.resolve("stream-http"),
    os: require.resolve("os-browserify"),
    stream: require.resolve("stream-browserify"),
    url: require.resolve("url"),
  };

  // enable importing from outside src directory
  if (!config.plugins) {
    config.plugins = [];
  }
  removeModuleScopePlugin()(config);

  return config;
};
