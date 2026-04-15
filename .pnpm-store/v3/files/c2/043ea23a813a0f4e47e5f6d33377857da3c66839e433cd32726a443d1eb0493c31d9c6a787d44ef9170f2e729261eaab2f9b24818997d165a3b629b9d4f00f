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
var loadPlugins_exports = {};
__export(loadPlugins_exports, {
  isOldPluginConfig: () => isOldPluginConfig,
  loadPlugins: () => loadPlugins
});
module.exports = __toCommonJS(loadPlugins_exports);
var import_utils = require("@modern-js/utils");
var import_manager = require("./manager");
const debug = (0, import_utils.createDebugger)("load-plugins");
const resolveCliPlugin = async (p, appDirectory) => {
  const pkg = typeof p === "string" ? p : p[0];
  const pluginOptions = typeof p === "string" ? void 0 : p[1];
  const path = (0, import_utils.tryResolve)(pkg, appDirectory);
  let module2;
  try {
    module2 = await (0, import_utils.compatibleRequire)(path);
  } catch (e) {
    ({ default: module2 } = await (0, import_utils.dynamicImport)(path));
  }
  if (typeof module2 === "function") {
    const result = module2(pluginOptions);
    return (0, import_manager.createPlugin)(result.setup, result);
  }
  return module2;
};
const isOldPluginConfig = (config) => Array.isArray(config) && config.some((item) => {
  return typeof item === "string" || Array.isArray(item);
});
const loadPlugins = async (appDirectory, userConfig, options = {}) => {
  const pluginConfig = userConfig.plugins;
  const plugins = [
    ...options.forceAutoLoadPlugins || userConfig.autoLoadPlugins ? (0, import_utils.getInternalPlugins)(appDirectory, options.internalPlugins) : [],
    ...isOldPluginConfig(pluginConfig) ? pluginConfig : [],
    ...options.autoLoad ? (0, import_utils.getInternalPlugins)(appDirectory, options.autoLoad) : []
  ];
  const loadedPlugins = await Promise.all(plugins.map((plugin) => {
    const loadedPlugin = resolveCliPlugin(plugin, appDirectory);
    debug(`resolve plugin %s: %s`, plugin, loadedPlugin);
    return loadedPlugin;
  }));
  if (!isOldPluginConfig(pluginConfig)) {
    if (pluginConfig === null || pluginConfig === void 0 ? void 0 : pluginConfig.length) {
      loadedPlugins.push(...pluginConfig.map((item) => (0, import_manager.createPlugin)(item.setup, item)));
    }
  }
  return loadedPlugins;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isOldPluginConfig,
  loadPlugins
});
