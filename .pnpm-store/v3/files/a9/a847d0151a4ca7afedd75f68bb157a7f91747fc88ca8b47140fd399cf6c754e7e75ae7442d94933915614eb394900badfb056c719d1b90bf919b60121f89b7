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
var node_exports = {};
__export(node_exports, {
  default: () => node_default,
  getBabelConfigForNode: () => getBabelConfigForNode
});
module.exports = __toCommonJS(node_exports);
var import_base = require("./base");
const getBabelConfigForNode = (options = {}) => {
  var _config_plugins;
  if (options.presetEnv !== false) {
    var _options, _options_presetEnv;
    var _presetEnv;
    (_presetEnv = (_options = options).presetEnv) !== null && _presetEnv !== void 0 ? _presetEnv : _options.presetEnv = {};
    var _targets;
    (_targets = (_options_presetEnv = options.presetEnv).targets) !== null && _targets !== void 0 ? _targets : _options_presetEnv.targets = [
      "node >= 16"
    ];
  }
  const config = (0, import_base.generateBaseConfig)(options);
  (_config_plugins = config.plugins) === null || _config_plugins === void 0 ? void 0 : _config_plugins.push(require.resolve("babel-plugin-dynamic-import-node"));
  return config;
};
function node_default(api, options = {}) {
  api.cache(true);
  return getBabelConfigForNode(options);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getBabelConfigForNode
});
