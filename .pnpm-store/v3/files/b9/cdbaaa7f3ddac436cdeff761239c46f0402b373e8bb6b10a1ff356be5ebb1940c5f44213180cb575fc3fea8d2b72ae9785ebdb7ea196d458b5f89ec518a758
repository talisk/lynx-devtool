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
var config_exports = {};
__export(config_exports, {
  defineConfig: () => defineConfig,
  defineRuntimeConfig: () => defineRuntimeConfig,
  getConfig: () => getConfig
});
module.exports = __toCommonJS(config_exports);
const APP_CONFIG_SYMBOL = "config";
const getConfig = (Component) => (
  // @ts-expect-error
  Component[APP_CONFIG_SYMBOL]
);
const defineConfig = (Component, config) => {
  Component[APP_CONFIG_SYMBOL] = config;
  return Component;
};
const defineRuntimeConfig = (config) => config;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  defineConfig,
  defineRuntimeConfig,
  getConfig
});
