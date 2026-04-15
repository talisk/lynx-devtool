"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var styledComponents_exports = {};
__export(styledComponents_exports, {
  pluginStyledComponents: () => pluginStyledComponents
});
module.exports = __toCommonJS(styledComponents_exports);
var import_utils = require("@modern-js/utils");
var import_core = require("@rsbuild/core");
var import_utils2 = require("../../shared/utils");
const getDefaultStyledComponentsConfig = (isProd, ssr) => {
  return {
    ssr,
    // "pure" is used to improve dead code elimination in production.
    // we don't need to enable it in development because it will slow down the build process.
    pure: isProd,
    displayName: true,
    transpileTemplateLiterals: true
  };
};
const pluginStyledComponents = (userConfig = {}) => ({
  name: "uni-builder:styled-components",
  pre: [
    import_core.PLUGIN_SWC_NAME,
    "uni-builder:babel"
  ],
  setup(api) {
    api.modifyBundlerChain(async (chain, { CHAIN_ID, isProd }) => {
      const hasSSR = Object.entries(api.getNormalizedConfig().environments).some(([name, config]) => (0, import_utils2.isServerEnvironment)(config.output.target, name));
      const styledComponentsOptions = (0, import_utils.applyOptionsChain)(getDefaultStyledComponentsConfig(isProd, hasSSR), userConfig);
      if (!styledComponentsOptions) {
        return;
      }
      [
        CHAIN_ID.RULE.JS,
        CHAIN_ID.RULE.JS_DATA_URI
      ].forEach((ruleId) => {
        if (chain.module.rules.has(ruleId)) {
          const rule = chain.module.rule(ruleId);
          if (rule.uses.has(CHAIN_ID.USE.SWC)) {
            rule.use(CHAIN_ID.USE.SWC).tap((swc) => {
              swc.extensions.styledComponents = styledComponentsOptions;
              return swc;
            });
          } else if (rule.uses.has(CHAIN_ID.USE.BABEL)) {
            rule.use(CHAIN_ID.USE.BABEL).tap((babelConfig) => {
              var _babelConfig;
              var _plugins;
              (_plugins = (_babelConfig = babelConfig).plugins) !== null && _plugins !== void 0 ? _plugins : _babelConfig.plugins = [];
              babelConfig.plugins.push([
                require.resolve("babel-plugin-styled-components"),
                styledComponentsOptions
              ]);
              return babelConfig;
            });
          }
        }
      });
    });
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pluginStyledComponents
});
