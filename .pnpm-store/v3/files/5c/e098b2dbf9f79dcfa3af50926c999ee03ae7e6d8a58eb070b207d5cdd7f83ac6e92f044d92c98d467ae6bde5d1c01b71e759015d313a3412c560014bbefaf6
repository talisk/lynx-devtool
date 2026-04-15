var APP_CONFIG_SYMBOL = "config";
var getConfig = function(Component) {
  return (
    // @ts-expect-error
    Component[APP_CONFIG_SYMBOL]
  );
};
var defineConfig = function(Component, config) {
  Component[APP_CONFIG_SYMBOL] = config;
  return Component;
};
var defineRuntimeConfig = function(config) {
  return config;
};
export {
  defineConfig,
  defineRuntimeConfig,
  getConfig
};
