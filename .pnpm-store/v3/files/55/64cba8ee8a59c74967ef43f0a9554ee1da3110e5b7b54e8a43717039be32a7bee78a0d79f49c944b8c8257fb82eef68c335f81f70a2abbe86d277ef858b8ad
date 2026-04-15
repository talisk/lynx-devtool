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
var babel_post_exports = {};
__export(babel_post_exports, {
  pluginBabelPost: () => pluginBabelPost
});
module.exports = __toCommonJS(babel_post_exports);
var import_isEqual = __toESM(require("lodash/isEqual"));
var import_plugin_babel = require("@rsbuild/plugin-babel");
const pluginBabelPost = () => ({
  name: "uni-builder:babel-post",
  setup(api) {
    api.modifyBundlerChain({
      handler: async (chain, { CHAIN_ID, environment }) => {
        if (chain.module.rules.get(CHAIN_ID.RULE.JS)) {
          const { cacheIdentifier, ...babelLoaderOptions } = chain.module.rule(CHAIN_ID.RULE.JS).use(CHAIN_ID.USE.BABEL).get("options");
          const { config } = environment;
          if (babelLoaderOptions && (0, import_isEqual.default)((0, import_plugin_babel.getDefaultBabelOptions)(config, api.context), babelLoaderOptions)) {
            chain.module.rule(CHAIN_ID.RULE.JS).uses.delete(CHAIN_ID.USE.BABEL);
          }
        }
      },
      // other plugins can modify babel config in modifyBundlerChain 'default order'
      order: "post"
    });
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pluginBabelPost
});
