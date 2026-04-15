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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  PLUGIN_PUG_NAME: () => PLUGIN_PUG_NAME,
  pluginPug: () => pluginPug
});
module.exports = __toCommonJS(src_exports);
var import_reduce_configs = require("reduce-configs");
var PLUGIN_PUG_NAME = "rsbuild:pug";
var pluginPug = (options = {}) => ({
  name: PLUGIN_PUG_NAME,
  async setup(api) {
    const VUE_SFC_REGEXP = /\.vue$/;
    const { compile, compileClient } = await import("pug");
    const pugOptions = (0, import_reduce_configs.reduceConfigs)({
      initial: {
        doctype: "html",
        compileDebug: false
      },
      config: options.pugOptions
    });
    api.transform(
      { test: /\.pug$/ },
      ({ code, resourcePath, addDependency }) => {
        const options2 = {
          filename: resourcePath,
          ...pugOptions
        };
        if (VUE_SFC_REGEXP.test(resourcePath)) {
          const template = compile(code, options2);
          const { dependencies } = template;
          if (dependencies) {
            dependencies.forEach(addDependency);
          }
          return template();
        }
        const templateCode = compileClient(code, options2);
        return `${templateCode}; export default template;`;
      }
    );
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PLUGIN_PUG_NAME,
  pluginPug
});
