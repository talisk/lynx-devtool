// src/index.ts
var PLUGIN_TOML_NAME = "rsbuild:toml";
var pluginToml = (options = {}) => ({
  name: PLUGIN_TOML_NAME,
  async setup(api) {
    const { parse } = await import("toml");
    const { esModule } = options;
    api.transform({ test: /\.toml$/ }, ({ code }) => {
      const parsed = parse(code);
      const exportType = esModule ? "export default" : "module.exports =";
      return `${exportType} ${JSON.stringify(parsed, void 0, "	")};`;
    });
  }
});
export {
  PLUGIN_TOML_NAME,
  pluginToml
};
