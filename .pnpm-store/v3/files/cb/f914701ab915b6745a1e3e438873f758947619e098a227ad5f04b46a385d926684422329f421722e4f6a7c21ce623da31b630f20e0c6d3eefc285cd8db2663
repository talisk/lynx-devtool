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
var loadPlugin_exports = {};
__export(loadPlugin_exports, {
  loadServerPlugins: () => loadServerPlugins
});
module.exports = __toCommonJS(loadPlugin_exports);
var import_utils = require("@modern-js/utils");
async function resolveServerPlugin(plugin, appDirectory) {
  const { name, options } = plugin;
  const pluginPath = (0, import_utils.tryResolve)(name, appDirectory);
  const module2 = await (0, import_utils.compatibleRequire)(pluginPath);
  const pluginInstance = module2(options);
  return pluginInstance;
}
async function loadServerPlugins(serverPlugins, appDirectory) {
  const instances = await Promise.all(serverPlugins.map((plugin) => resolveServerPlugin(plugin, appDirectory)));
  return instances;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  loadServerPlugins
});
