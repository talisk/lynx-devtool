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
var manager_exports = {};
__export(manager_exports, {
  createPlugin: () => createPlugin,
  manager: () => manager,
  registerHook: () => registerHook
});
module.exports = __toCommonJS(manager_exports);
var import_plugin = require("@modern-js/plugin");
var import_context = require("./context");
const baseHooks = {
  beforeConfig: (0, import_plugin.createAsyncWorkflow)(),
  config: (0, import_plugin.createParallelWorkflow)(),
  resolvedConfig: (0, import_plugin.createAsyncWaterfall)(),
  prepare: (0, import_plugin.createAsyncWorkflow)(),
  afterPrepare: (0, import_plugin.createAsyncWorkflow)(),
  commands: (0, import_plugin.createAsyncWorkflow)(),
  watchFiles: (0, import_plugin.createParallelWorkflow)(),
  fileChange: (0, import_plugin.createAsyncWorkflow)(),
  beforeExit: (0, import_plugin.createWorkflow)(),
  addRuntimeExports: (0, import_plugin.createAsyncWaterfall)()
};
const pluginAPI = {
  setAppContext: import_context.setAppContext,
  useAppContext: import_context.useAppContext,
  useConfigContext: import_context.useConfigContext,
  useResolvedConfigContext: import_context.useResolvedConfigContext
};
const manager = (0, import_plugin.createAsyncManager)(baseHooks, pluginAPI);
const { createPlugin, registerHook } = manager;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createPlugin,
  manager,
  registerHook
});
