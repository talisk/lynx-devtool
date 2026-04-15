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
var mainFields_exports = {};
__export(mainFields_exports, {
  pluginMainFields: () => pluginMainFields
});
module.exports = __toCommonJS(mainFields_exports);
const pluginMainFields = (resolveMainFields) => ({
  name: "uni-builder:main-fields",
  setup(api) {
    api.modifyBundlerChain((chain, { target }) => {
      const mainFields = Array.isArray(resolveMainFields) ? resolveMainFields : resolveMainFields[target];
      if (mainFields) {
        mainFields.reduce((result, fields) => {
          if (Array.isArray(fields)) {
            result.push(...fields);
          } else {
            result.push(fields);
          }
          return result;
        }, []).forEach((field) => {
          chain.resolve.mainFields.add(field);
        });
      }
    });
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pluginMainFields
});
