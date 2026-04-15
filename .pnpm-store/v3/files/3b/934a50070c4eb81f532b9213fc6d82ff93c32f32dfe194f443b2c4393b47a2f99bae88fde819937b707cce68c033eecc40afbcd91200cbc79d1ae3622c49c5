"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var globalVars_exports = {};
__export(globalVars_exports, {
  pluginGlobalVars: () => pluginGlobalVars
});
module.exports = __toCommonJS(globalVars_exports);
var import_utils = require("@modern-js/utils");
const pluginGlobalVars = (options) => ({
  name: "uni-builder:global-vars",
  setup(api) {
    api.modifyBundlerChain((chain, { env, target, bundler }) => {
      if (!options) {
        return;
      }
      const globalVars = (0, import_utils.applyOptionsChain)({}, options, {
        env,
        target
      });
      const serializedVars = {};
      Object.entries(globalVars).forEach(([key, value]) => {
        var _JSON_stringify;
        serializedVars[key] = (_JSON_stringify = JSON.stringify(value)) !== null && _JSON_stringify !== void 0 ? _JSON_stringify : "undefined";
      });
      chain.plugin("globalVars").use(bundler.DefinePlugin, [
        serializedVars
      ]);
    });
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pluginGlobalVars
});
