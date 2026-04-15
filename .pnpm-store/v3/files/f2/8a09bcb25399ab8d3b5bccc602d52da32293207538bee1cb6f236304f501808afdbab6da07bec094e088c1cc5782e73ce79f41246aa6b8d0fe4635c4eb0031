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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  PLUGIN_TYPED_CSS_MODULES_NAME: () => PLUGIN_TYPED_CSS_MODULES_NAME,
  pluginTypedCSSModules: () => pluginTypedCSSModules
});
module.exports = __toCommonJS(src_exports);
var import_node_path = __toESM(require("path"), 1);
var PLUGIN_TYPED_CSS_MODULES_NAME = "rsbuild:typed-css-modules";
var pluginTypedCSSModules = () => ({
  name: PLUGIN_TYPED_CSS_MODULES_NAME,
  setup(api) {
    api.modifyBundlerChain({
      order: "post",
      handler: async (chain, { target, CHAIN_ID }) => {
        if (target === "web") {
          const ruleIds = [
            CHAIN_ID.RULE.CSS,
            CHAIN_ID.RULE.SASS,
            CHAIN_ID.RULE.LESS,
            CHAIN_ID.RULE.STYLUS
          ];
          for (const ruleId of ruleIds) {
            if (!chain.module.rules.has(ruleId)) {
              continue;
            }
            const rule = chain.module.rule(ruleId);
            if (!rule.uses.has(CHAIN_ID.USE.CSS)) {
              continue;
            }
            const cssLoaderOptions = rule.use(CHAIN_ID.USE.CSS).get("options");
            if (!cssLoaderOptions.modules || typeof cssLoaderOptions.modules === "object" && cssLoaderOptions.modules.auto === false) {
              continue;
            }
            rule.use(CHAIN_ID.USE.CSS_MODULES_TS).loader(import_node_path.default.resolve(__dirname, "./loader.cjs")).options({
              modules: cssLoaderOptions.modules
            }).before(CHAIN_ID.USE.CSS);
          }
        }
      }
    });
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PLUGIN_TYPED_CSS_MODULES_NAME,
  pluginTypedCSSModules
});
