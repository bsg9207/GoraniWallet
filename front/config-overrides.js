const { removeModuleScopePlugin } = require("customize-cra");

// override webpack config
module.exports = function override(config, env) {
  // enable importing from outside src directory
  if (!config.plugins) {
    config.plugins = [];
  }
  removeModuleScopePlugin()(config);

  return config;
};
