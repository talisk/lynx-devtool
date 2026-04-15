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
var repack_exports = {};
__export(repack_exports, {
  onRepack: () => onRepack
});
module.exports = __toCommonJS(repack_exports);
var import_fileReader = require("@modern-js/runtime-utils/fileReader");
const cleanSSRCache = (distDir) => {
  Object.keys(require.cache).forEach((key) => {
    if (key.startsWith(distDir)) {
      delete require.cache[key];
    }
  });
};
const onRepack = (distDir, runner) => {
  cleanSSRCache(distDir);
  import_fileReader.fileReader.reset();
  runner.reset({
    event: {
      type: "repack"
    }
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  onRepack
});
