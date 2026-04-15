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
var sri_exports = {};
__export(sri_exports, {
  pluginSRI: () => pluginSRI
});
module.exports = __toCommonJS(sri_exports);
var import_webpack_subresource_integrity = require("webpack-subresource-integrity");
const pluginSRI = (options) => ({
  name: "uni-builder:sri",
  setup(api) {
    api.modifyBundlerChain((chain, { CHAIN_ID }) => {
      chain.output.crossOriginLoading("anonymous");
      chain.plugin(CHAIN_ID.PLUGIN.SUBRESOURCE_INTEGRITY).use(import_webpack_subresource_integrity.SubresourceIntegrityPlugin, [
        typeof options === "object" ? options : void 0
      ]);
    });
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pluginSRI
});
