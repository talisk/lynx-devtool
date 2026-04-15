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
var plugins_exports = {};
__export(plugins_exports, {
  autoActions: () => autoActions,
  devtools: () => import_plugin_devtools.default,
  effects: () => effects,
  immer: () => immer
});
module.exports = __toCommonJS(plugins_exports);
var import_plugin_auto_actions = __toESM(require("@modern-js-reduck/plugin-auto-actions"));
var import_plugin_effects = require("@modern-js-reduck/plugin-effects");
var import_plugin_immutable = __toESM(require("@modern-js-reduck/plugin-immutable"));
var import_plugin_devtools = __toESM(require("@modern-js-reduck/plugin-devtools"));
const effects = () => import_plugin_effects.plugin;
const immer = () => import_plugin_immutable.default;
const autoActions = () => import_plugin_auto_actions.default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  autoActions,
  devtools,
  effects,
  immer
});
