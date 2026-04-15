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
var src_exports = {};
__export(src_exports, {
  AGGRED_DIR: () => import_constants.AGGRED_DIR,
  ErrorDigest: () => import_utils.ErrorDigest,
  PluginManager: () => import_pluginManager.PluginManager,
  createErrorHtml: () => import_utils.createErrorHtml,
  createServerBase: () => import_serverBase.createServerBase,
  getLoaderCtx: () => import_helper.getLoaderCtx,
  onError: () => import_utils.onError
});
module.exports = __toCommonJS(src_exports);
var import_utils = require("./utils");
var import_constants = require("./constants");
var import_serverBase = require("./serverBase");
var import_pluginManager = require("./pluginManager");
var import_helper = require("./helper");
__reExport(src_exports, require("./plugins"), module.exports);
__reExport(src_exports, require("./types/plugin"), module.exports);
__reExport(src_exports, require("./types/render"), module.exports);
__reExport(src_exports, require("@modern-js/plugin"), module.exports);
__reExport(src_exports, require("./types/config"), module.exports);
__reExport(src_exports, require("./types/requestHandler"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AGGRED_DIR,
  ErrorDigest,
  PluginManager,
  createErrorHtml,
  createServerBase,
  getLoaderCtx,
  onError,
  ...require("./plugins"),
  ...require("./types/plugin"),
  ...require("./types/render"),
  ...require("@modern-js/plugin"),
  ...require("./types/config"),
  ...require("./types/requestHandler")
});
