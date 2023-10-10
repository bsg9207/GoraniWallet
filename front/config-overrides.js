const { removeModuleScopePlugin } = require("customize-cra");
const webpack = require("webpack");

// override webpack config
module.exports = function override(config, env) {
  // enable caver-js module
  config.resolve.fallback = {
    ...config.resolve.fallback,
    assert: require.resolve("assert"),
    buffer: require.resolve("buffer"),
    crypto: require.resolve("crypto-browserify"),
    fs: false,
    https: require.resolve("https-browserify"),
    http: require.resolve("stream-http"),
    os: require.resolve("os-browserify"),
    stream: require.resolve("stream-browserify"),
    url: require.resolve("url"),
    zlib: false,
  };

  config.resolve.extensions = [...config.resolve.extensions, ".js"];

  // https://github.com/web3/web3.js#web3-and-create-react-app
  config.ignoreWarnings = [/Failed to parse source map/];

  // enable importing from outside src directory
  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ];
  removeModuleScopePlugin()(config);

  return config;
};
