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
var createResolvedConfig_exports = {};
__export(createResolvedConfig_exports, {
  createResolveConfig: () => createResolveConfig
});
module.exports = __toCommonJS(createResolvedConfig_exports);
var import_utils = require("@modern-js/utils");
var import_mergeConfig = require("../utils/mergeConfig");
var import_createDefaultConfig = require("./createDefaultConfig");
const debug = (0, import_utils.createDebugger)("resolve-config");
const createResolveConfig = async (loaded, configs) => {
  const { config: userConfig } = loaded;
  const resolved = (0, import_mergeConfig.mergeConfig)([
    (0, import_createDefaultConfig.createDefaultConfig)(),
    ...configs,
    userConfig
  ]);
  debug("resolved %o", resolved);
  return resolved;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createResolveConfig
});
