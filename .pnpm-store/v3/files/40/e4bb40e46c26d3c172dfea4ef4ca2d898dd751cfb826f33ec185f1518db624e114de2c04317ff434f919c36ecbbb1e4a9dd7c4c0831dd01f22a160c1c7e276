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
var runtimeChunk_exports = {};
__export(runtimeChunk_exports, {
  pluginRuntimeChunk: () => pluginRuntimeChunk
});
module.exports = __toCommonJS(runtimeChunk_exports);
var import_utils = require("../utils");
const pluginRuntimeChunk = (disableInlineRuntimeChunk) => ({
  name: "uni-builder:runtime-chunk",
  setup(api) {
    api.modifyBundlerChain(async (chain, { target, environment }) => {
      if (target !== "web") {
        return;
      }
      const { config } = environment;
      const { chunkSplit } = config.performance;
      if (chunkSplit.strategy !== "all-in-one") {
        chain.optimization.runtimeChunk({
          name: import_utils.RUNTIME_CHUNK_NAME
        });
      }
    });
    api.modifyRsbuildConfig((config) => {
      var _config;
      (_config = config).output || (_config.output = {});
      if (disableInlineRuntimeChunk) {
        return;
      }
      const regexp = new RegExp(`${import_utils.RUNTIME_CHUNK_NAME}([.].+)?\\.js$`);
      if (!config.output.inlineScripts) {
        config.output.inlineScripts = regexp;
      }
    });
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pluginRuntimeChunk
});
