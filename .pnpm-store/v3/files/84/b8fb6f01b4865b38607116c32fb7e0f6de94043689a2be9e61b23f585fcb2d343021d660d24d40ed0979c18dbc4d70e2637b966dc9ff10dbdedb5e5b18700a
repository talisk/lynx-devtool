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
var loadConfig_exports = {};
__export(loadConfig_exports, {
  loadServerCliConfig: () => loadServerCliConfig,
  loadServerRuntimeConfig: () => loadServerRuntimeConfig
});
module.exports = __toCommonJS(loadConfig_exports);
var import_path = __toESM(require("path"));
var import_utils = require("@modern-js/utils");
var import_flatted = require("flatted");
const requireConfig = async (serverConfigPath) => {
  if (import_utils.fs.pathExistsSync(serverConfigPath)) {
    return (0, import_utils.compatibleRequire)(serverConfigPath);
  }
  return void 0;
};
async function loadServerConfigNew(serverConfigPath) {
  const mod = await (0, import_utils.requireExistModule)(serverConfigPath);
  if (mod) {
    return mod;
  }
  return void 0;
}
async function loadServerConfigOld(pwd, configFile) {
  const serverConfigPath = import_path.default.join(pwd, `${configFile}.cjs`);
  const serverConfig = await requireConfig(serverConfigPath);
  return serverConfig;
}
async function loadServerRuntimeConfig(pwd, oldServerFile = import_utils.DEFAULT_SERVER_CONFIG, newServerConfigPath) {
  const newServerConfig = newServerConfigPath && await loadServerConfigNew(newServerConfigPath);
  if (newServerConfig) {
    return newServerConfig;
  }
  const oldServerConfig = await loadServerConfigOld(pwd, oldServerFile);
  return oldServerConfig;
}
function loadServerCliConfig(pwd, defaultConfig = {}) {
  var _defaultConfig_output_distPath, _defaultConfig_output;
  const cliConfigPath = (0, import_utils.ensureAbsolutePath)(pwd, import_path.default.join(((_defaultConfig_output = defaultConfig.output) === null || _defaultConfig_output === void 0 ? void 0 : (_defaultConfig_output_distPath = _defaultConfig_output.distPath) === null || _defaultConfig_output_distPath === void 0 ? void 0 : _defaultConfig_output_distPath.root) || "dist", import_utils.OUTPUT_CONFIG_FILE));
  let cliConfig = {
    output: {},
    source: {},
    tools: {},
    server: {},
    security: {},
    runtime: {},
    bff: {},
    html: {},
    dev: {}
  };
  try {
    const content = import_utils.fs.readFileSync(cliConfigPath, "utf-8");
    cliConfig = (0, import_flatted.parse)(content);
  } catch (_2) {
  }
  const mergedCliConfig = import_utils.lodash.merge(defaultConfig, cliConfig);
  return mergedCliConfig;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  loadServerCliConfig,
  loadServerRuntimeConfig
});
