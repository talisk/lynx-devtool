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
var web_exports = {};
__export(web_exports, {
  default: () => web_default,
  getBabelConfigForWeb: () => getBabelConfigForWeb
});
module.exports = __toCommonJS(web_exports);
var import_node_path = require("node:path");
var import_base = require("./base");
var import_pluginLockCorejsVersion = require("./pluginLockCorejsVersion");
const getDefaultPresetEnvOption = (options) => {
  var _options_presetEnv;
  if (options.presetEnv === false) {
    return false;
  }
  return {
    bugfixes: true,
    // core-js is required for web target
    corejs: ((_options_presetEnv = options.presetEnv) === null || _options_presetEnv === void 0 ? void 0 : _options_presetEnv.useBuiltIns) ? {
      version: (0, import_pluginLockCorejsVersion.getCoreJsVersion)(),
      proposals: true
    } : void 0
  };
};
const getBabelConfigForWeb = (options) => {
  var _config_plugins;
  if (options.presetEnv !== false) {
    options.presetEnv = {
      ...getDefaultPresetEnvOption(options),
      ...options.presetEnv
    };
  }
  const config = (0, import_base.generateBaseConfig)(options);
  const { pluginTransformRuntime = {} } = options;
  if (pluginTransformRuntime) {
    var _config_plugins1;
    (_config_plugins1 = config.plugins) === null || _config_plugins1 === void 0 ? void 0 : _config_plugins1.push([
      require.resolve("@babel/plugin-transform-runtime"),
      {
        version: require("@babel/runtime/package.json").version,
        // this option has been deprecated
        // but enabling it can help to reduce bundle size
        useESModules: true,
        ...pluginTransformRuntime
      }
    ]);
  }
  (_config_plugins = config.plugins) === null || _config_plugins === void 0 ? void 0 : _config_plugins.push((0, import_node_path.join)(__dirname, "./pluginLockCorejsVersion.js"));
  return config;
};
function web_default(api, options) {
  api.cache(true);
  return getBabelConfigForWeb(options);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getBabelConfigForWeb
});
