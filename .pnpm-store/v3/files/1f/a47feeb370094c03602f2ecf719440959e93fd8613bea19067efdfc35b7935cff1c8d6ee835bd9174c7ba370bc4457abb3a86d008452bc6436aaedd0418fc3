const APP_CONFIG_SYMBOL = "config";
const getConfig = (Component) => (
  // @ts-expect-error
  Component[APP_CONFIG_SYMBOL]
);
const defineConfig = (Component, config) => {
  Component[APP_CONFIG_SYMBOL] = config;
  return Component;
};
const defineRuntimeConfig = (config) => config;
export {
  defineConfig,
  defineRuntimeConfig,
  getConfig
};
