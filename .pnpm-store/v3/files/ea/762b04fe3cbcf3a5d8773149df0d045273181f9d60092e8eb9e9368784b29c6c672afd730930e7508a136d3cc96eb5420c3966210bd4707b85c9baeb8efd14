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
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var preset_exports = {};
__export(preset_exports, {
  applyUserBabelConfig: () => import_utils.applyUserBabelConfig,
  getBabelConfig: () => getBabelConfig
});
module.exports = __toCommonJS(preset_exports);
var import_node = require("@modern-js/babel-preset/node");
var import_alias = require("./alias");
__reExport(preset_exports, require("./types"), module.exports);
var import_utils = require("@modern-js/utils");
const getBabelConfig = (libPresetOption) => {
  var _config_presets, _config_plugins;
  const { isEsm } = libPresetOption;
  const config = (0, import_node.getBabelConfigForNode)({
    presetEnv: {
      loose: true,
      modules: isEsm ? false : "commonjs",
      targets: [
        "node >= 14"
      ]
    },
    pluginDecorators: {
      version: "legacy"
    }
  });
  (_config_presets = config.presets) === null || _config_presets === void 0 ? void 0 : _config_presets.push([
    require.resolve("@babel/preset-react"),
    {
      runtime: "automatic"
    }
  ]);
  if (libPresetOption.alias) {
    var _config_plugins1;
    (_config_plugins1 = config.plugins) === null || _config_plugins1 === void 0 ? void 0 : _config_plugins1.push((0, import_alias.aliasPlugin)(libPresetOption.alias));
  }
  (_config_plugins = config.plugins) === null || _config_plugins === void 0 ? void 0 : _config_plugins.push(require.resolve("babel-plugin-transform-typescript-metadata"));
  return config;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  applyUserBabelConfig,
  getBabelConfig,
  ...require("./types")
});
