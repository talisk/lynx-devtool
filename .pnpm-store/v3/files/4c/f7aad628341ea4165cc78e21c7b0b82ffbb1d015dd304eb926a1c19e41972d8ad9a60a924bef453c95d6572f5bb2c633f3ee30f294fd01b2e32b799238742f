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
  AppContext: () => import_context.AppContext,
  ConfigContext: () => import_context.ConfigContext,
  ResolvedConfigContext: () => import_context.ResolvedConfigContext,
  cli: () => cli,
  createPlugin: () => import_manager.createPlugin,
  initAppContext: () => import_context.initAppContext,
  initAppDir: () => import_utils.initAppDir,
  loadConfig: () => import_config.loadConfig,
  manager: () => import_manager.manager,
  mergeConfig: () => import_utils.mergeConfig,
  registerHook: () => import_manager.registerHook,
  useAppContext: () => import_context.useAppContext,
  useConfigContext: () => import_context.useConfigContext,
  useResolvedConfigContext: () => import_context.useResolvedConfigContext
});
module.exports = __toCommonJS(src_exports);
var import_createCli = require("./createCli");
__reExport(src_exports, require("./types"), module.exports);
__reExport(src_exports, require("./loadEnv"), module.exports);
__reExport(src_exports, require("@modern-js/plugin"), module.exports);
var import_config = require("./config");
var import_utils = require("./utils");
var import_manager = require("./manager");
var import_context = require("./context");
const cli = (0, import_createCli.createCli)();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AppContext,
  ConfigContext,
  ResolvedConfigContext,
  cli,
  createPlugin,
  initAppContext,
  initAppDir,
  loadConfig,
  manager,
  mergeConfig,
  registerHook,
  useAppContext,
  useConfigContext,
  useResolvedConfigContext,
  ...require("./types"),
  ...require("./loadEnv"),
  ...require("@modern-js/plugin")
});
