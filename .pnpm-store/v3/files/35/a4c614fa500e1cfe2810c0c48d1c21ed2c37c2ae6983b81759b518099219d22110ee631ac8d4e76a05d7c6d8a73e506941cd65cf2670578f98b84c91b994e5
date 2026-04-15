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
var typescriptLoader_exports = {};
__export(typescriptLoader_exports, {
  TypescriptLoader: () => TypescriptLoader
});
module.exports = __toCommonJS(typescriptLoader_exports);
class TypescriptLoader {
  load() {
    if (this.tsBinary) {
      return this.tsBinary;
    }
    try {
      const tsPath = require.resolve("typescript", {
        paths: [
          this.appDirectory || process.cwd()
        ]
      });
      const ts = require(tsPath);
      return ts;
    } catch (error) {
      throw new Error('TypeScript could not be found! Please, install "typescript" package.');
    }
  }
  constructor({ appDirectory }) {
    this.appDirectory = appDirectory;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TypescriptLoader
});
