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
var loadCache_exports = {};
__export(loadCache_exports, {
  loadCacheConfig: () => loadCacheConfig
});
module.exports = __toCommonJS(loadCache_exports);
var import_path = __toESM(require("path"));
var import_utils = require("@modern-js/utils");
const CACHE_FILENAME = "cache";
async function loadCacheConfig(pwd) {
  const serverCacheFilepath = import_path.default.resolve(pwd, import_utils.SERVER_DIR, CACHE_FILENAME);
  const mod = await (0, import_utils.requireExistModule)(serverCacheFilepath, {
    interop: false
  });
  if (mod === null || mod === void 0 ? void 0 : mod.cacheOption) {
    return {
      strategy: mod.cacheOption,
      container: mod.customContainer
    };
  }
  return void 0;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  loadCacheConfig
});
