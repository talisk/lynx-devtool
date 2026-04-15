// node_modules/.pnpm/tsup@8.0.2_postcss@8.4.38_typescript@5.5.2/node_modules/tsup/assets/esm_shims.js
import { fileURLToPath } from "url";
import path from "path";
var getFilename = () => fileURLToPath(import.meta.url);
var getDirname = () => path.dirname(getFilename());
var __dirname = /* @__PURE__ */ getDirname();

// src/index.ts
import { join } from "node:path";
var PLUGIN_YAML_NAME = "rsbuild:yaml";
var pluginYaml = () => ({
  name: PLUGIN_YAML_NAME,
  setup(api) {
    api.modifyBundlerChain((chain) => {
      chain.module.rule("yaml").type("javascript/auto").test(/\.ya?ml$/).use("yaml").loader(join(__dirname, "../compiled", "yaml-loader"));
    });
  }
});
export {
  PLUGIN_YAML_NAME,
  pluginYaml
};
