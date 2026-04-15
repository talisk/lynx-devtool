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
var processedBy_exports = {};
__export(processedBy_exports, {
  processedByPlugin: () => processedByPlugin
});
module.exports = __toCommonJS(processedBy_exports);
const processedByPlugin = () => ({
  name: "@modern-js/plugin-processed",
  setup(api) {
    return {
      prepare() {
        const { middlewares } = api.useAppContext();
        middlewares.push({
          name: "processed-by",
          handler: async (c, next) => {
            await next();
            c.header("X-Processed-By", "Modern.js");
          }
        });
      }
    };
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  processedByPlugin
});
