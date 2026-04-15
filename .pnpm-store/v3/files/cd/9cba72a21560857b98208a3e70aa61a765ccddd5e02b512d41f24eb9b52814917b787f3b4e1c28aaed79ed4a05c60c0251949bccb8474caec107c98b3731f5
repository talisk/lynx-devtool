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
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var core_exports = {};
__export(core_exports, {
  RuntimeReactContext: () => import_runtime.RuntimeReactContext,
  ServerRouterContext: () => import_runtime.ServerRouterContext,
  defineConfig: () => import_config.defineConfig,
  defineRuntimeConfig: () => import_config.defineRuntimeConfig,
  getConfig: () => import_config.getConfig,
  runtime: () => import_plugin.runtime
});
module.exports = __toCommonJS(core_exports);
var import_plugin = require("./plugin");
var import_config = require("./config");
__reExport(core_exports, require("./compatible"), module.exports);
var import_runtime = require("./context/runtime");
__reExport(core_exports, require("./loader"), module.exports);
__reExport(core_exports, require("@modern-js/plugin"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RuntimeReactContext,
  ServerRouterContext,
  defineConfig,
  defineRuntimeConfig,
  getConfig,
  runtime,
  ...require("./compatible"),
  ...require("./loader"),
  ...require("@modern-js/plugin")
});
