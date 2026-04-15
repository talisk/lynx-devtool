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
var shared_exports = {};
__export(shared_exports, {
  checkPlugins: () => checkPlugins,
  hasOwnProperty: () => hasOwnProperty,
  includePlugin: () => includePlugin,
  isObject: () => isObject,
  sortPlugins: () => sortPlugins
});
module.exports = __toCommonJS(shared_exports);
var import_plugin_dag_sort = require("@modern-js/utils/universal/plugin-dag-sort");
const checkPlugins = (plugins) => {
  if (process.env.NODE_ENV !== "production") {
    plugins.forEach((origin) => {
      origin.rivals.forEach((rival) => {
        plugins.forEach((plugin) => {
          if (rival === plugin.name) {
            throw new Error(`${origin.name} has rival ${plugin.name}`);
          }
        });
      });
      origin.required.forEach((required) => {
        if (!plugins.some((plugin) => plugin.name === required)) {
          throw new Error(`The plugin: ${required} is required when plugin: ${origin.name} is exist.`);
        }
      });
    });
  }
};
function sortPlugins(input) {
  return (0, import_plugin_dag_sort.pluginDagSort)(input.slice());
}
const includePlugin = (plugins, input) => plugins.some((plugin) => plugin.name === input.name);
const isObject = (obj) => obj !== null && typeof obj === "object";
const hasOwnProperty = (obj, prop) => obj.hasOwnProperty(prop);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkPlugins,
  hasOwnProperty,
  includePlugin,
  isObject,
  sortPlugins
});
