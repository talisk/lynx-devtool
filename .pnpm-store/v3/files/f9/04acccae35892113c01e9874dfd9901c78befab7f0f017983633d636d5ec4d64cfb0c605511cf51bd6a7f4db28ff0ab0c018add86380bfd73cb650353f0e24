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
var base_exports = {};
__export(base_exports, {
  RuntimeConfigContext: () => RuntimeConfigContext,
  createRuntime: () => createRuntime,
  runtime: () => runtime,
  useRuntimeConfigContext: () => useRuntimeConfigContext
});
module.exports = __toCommonJS(base_exports);
var import_plugin = require("@modern-js/plugin");
const RuntimeConfigContext = (0, import_plugin.createContext)({});
const useRuntimeConfigContext = () => RuntimeConfigContext.use().value;
const wrapRoot = (0, import_plugin.createWaterfall)();
const beforeRender = (0, import_plugin.createAsyncInterruptWorkflow)();
const pickContext = (0, import_plugin.createWaterfall)();
const modifyRuntimeConfig = (0, import_plugin.createSyncParallelWorkflow)();
const runtimeHooks = {
  beforeRender,
  wrapRoot,
  pickContext,
  modifyRuntimeConfig
};
const runtimePluginAPI = {
  useRuntimeConfigContext
};
const createRuntime = () => (0, import_plugin.createManager)(runtimeHooks, runtimePluginAPI);
const runtime = createRuntime();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RuntimeConfigContext,
  createRuntime,
  runtime,
  useRuntimeConfigContext
});
