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
var extensionPrefix_exports = {};
__export(extensionPrefix_exports, {
  pluginExtensionPrefix: () => pluginExtensionPrefix
});
module.exports = __toCommonJS(extensionPrefix_exports);
const pluginExtensionPrefix = (prefixInfo) => ({
  name: "uni-builder:extension-prefix",
  setup(api) {
    api.modifyBundlerChain((chain, { target }) => {
      const prefix = typeof prefixInfo === "string" ? prefixInfo : prefixInfo[target];
      if (prefix) {
        const extensions = chain.resolve.extensions.values();
        chain.resolve.extensions.clear();
        extensions.forEach((ext) => {
          chain.resolve.extensions.add(prefix + ext);
          chain.resolve.extensions.add(ext);
        });
      }
    });
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pluginExtensionPrefix
});
