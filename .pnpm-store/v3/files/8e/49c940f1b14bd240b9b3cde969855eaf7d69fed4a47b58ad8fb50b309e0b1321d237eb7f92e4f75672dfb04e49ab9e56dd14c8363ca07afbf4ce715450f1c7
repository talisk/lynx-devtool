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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  PLUGIN_YAML_NAME: () => PLUGIN_YAML_NAME,
  pluginYaml: () => pluginYaml
});
module.exports = __toCommonJS(src_exports);
var import_node_path = require("path");
var PLUGIN_YAML_NAME = "rsbuild:yaml";
var pluginYaml = () => ({
  name: PLUGIN_YAML_NAME,
  setup(api) {
    api.modifyBundlerChain((chain) => {
      chain.module.rule("yaml").type("javascript/auto").test(/\.ya?ml$/).use("yaml").loader((0, import_node_path.join)(__dirname, "../compiled", "yaml-loader"));
    });
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PLUGIN_YAML_NAME,
  pluginYaml
});
