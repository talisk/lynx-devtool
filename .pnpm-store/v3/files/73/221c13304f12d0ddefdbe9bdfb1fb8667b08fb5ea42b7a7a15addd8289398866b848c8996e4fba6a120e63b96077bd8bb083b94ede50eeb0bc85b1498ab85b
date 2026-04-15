// src/index.ts
import { reduceConfigs } from "reduce-configs";
var PLUGIN_PUG_NAME = "rsbuild:pug";
var pluginPug = (options = {}) => ({
  name: PLUGIN_PUG_NAME,
  async setup(api) {
    const VUE_SFC_REGEXP = /\.vue$/;
    const { compile, compileClient } = await import("pug");
    const pugOptions = reduceConfigs({
      initial: {
        doctype: "html",
        compileDebug: false
      },
      config: options.pugOptions
    });
    api.transform(
      { test: /\.pug$/ },
      ({ code, resourcePath, addDependency }) => {
        const options2 = {
          filename: resourcePath,
          ...pugOptions
        };
        if (VUE_SFC_REGEXP.test(resourcePath)) {
          const template = compile(code, options2);
          const { dependencies } = template;
          if (dependencies) {
            dependencies.forEach(addDependency);
          }
          return template();
        }
        const templateCode = compileClient(code, options2);
        return `${templateCode}; export default template;`;
      }
    );
  }
});
export {
  PLUGIN_PUG_NAME,
  pluginPug
};
