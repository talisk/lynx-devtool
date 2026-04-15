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
var plugin_exports = {};
__export(plugin_exports, {
  mergeConfig: () => mergeConfig,
  registerPlugin: () => registerPlugin
});
module.exports = __toCommonJS(plugin_exports);
var import_merge = require("@modern-js/runtime-utils/merge");
var import_base = require("./base");
var import_runner = require("./runner");
__reExport(plugin_exports, require("./base"), module.exports);
function setupConfigContext() {
  const runner = (0, import_runner.getGlobalRunner)();
  const configs = runner.modifyRuntimeConfig();
  import_base.RuntimeConfigContext.set((0, import_merge.merge)({}, ...configs));
}
function registerPlugin(internalPlugins, runtimeConfig, customRuntime) {
  const { plugins = [] } = runtimeConfig || {};
  (customRuntime || import_base.runtime).usePlugin(...internalPlugins, ...plugins);
  const runner = (customRuntime || import_base.runtime).init();
  (0, import_runner.setGlobalRunner)(runner);
  setupConfigContext();
  return runner;
}
function mergeConfig(config, ...otherConfig) {
  return (0, import_merge.merge)({}, config, ...otherConfig);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  mergeConfig,
  registerPlugin,
  ...require("./base")
});
