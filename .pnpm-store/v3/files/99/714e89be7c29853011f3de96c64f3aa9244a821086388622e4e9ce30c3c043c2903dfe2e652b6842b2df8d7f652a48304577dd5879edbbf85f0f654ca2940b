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
var createLoaderCtx_exports = {};
__export(createLoaderCtx_exports, {
  LoaderContext: () => LoaderContext,
  createLoaderContext: () => createLoaderContext
});
module.exports = __toCommonJS(createLoaderCtx_exports);
class LoaderContext {
  getDefaultValue() {
    if (!this.defaultValue) {
      throw new Error("Can't get defaultValue before initialed");
    }
    return this.defaultValue;
  }
  constructor(defaultValue) {
    this.defaultValue = defaultValue;
    this.symbol = Symbol("loaderContext");
  }
}
function createLoaderContext(defaultValue) {
  return new LoaderContext(defaultValue);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LoaderContext,
  createLoaderContext
});
