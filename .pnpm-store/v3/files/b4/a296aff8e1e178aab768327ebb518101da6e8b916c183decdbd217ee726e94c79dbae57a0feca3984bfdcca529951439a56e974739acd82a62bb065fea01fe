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
var context_exports = {};
__export(context_exports, {
  AppContext: () => AppContext,
  ConfigContext: () => ConfigContext,
  ResolvedConfigContext: () => ResolvedConfigContext,
  initAppContext: () => initAppContext,
  setAppContext: () => setAppContext,
  useAppContext: () => useAppContext,
  useConfigContext: () => useConfigContext,
  useResolvedConfigContext: () => useResolvedConfigContext
});
module.exports = __toCommonJS(context_exports);
var import_path = __toESM(require("path"));
var import_plugin = require("@modern-js/plugin");
var import_utils = require("@modern-js/utils");
const AppContext = (0, import_plugin.createContext)({});
const ConfigContext = (0, import_plugin.createContext)({});
const ResolvedConfigContext = (0, import_plugin.createContext)({});
const setAppContext = (value) => AppContext.set(value);
const useAppContext = () => AppContext.use().value;
const useConfigContext = () => ConfigContext.use().value;
const useResolvedConfigContext = () => ResolvedConfigContext.use().value;
const initAppContext = ({ appDirectory, plugins, configFile, runtimeConfigFile, options, serverConfigFile }) => {
  const { metaName = "modern-js", srcDir = "src", distDir = "", apiDir = "api", sharedDir = "shared" } = options || {};
  return {
    metaName,
    appDirectory,
    configFile,
    runtimeConfigFile,
    serverConfigFile,
    ip: import_utils.address.ip(),
    port: 0,
    packageName: require(import_path.default.resolve(appDirectory, "./package.json")).name,
    moduleType: require(import_path.default.resolve(appDirectory, "./package.json")).type || "commonjs",
    srcDirectory: import_path.default.resolve(appDirectory, srcDir),
    apiDirectory: import_path.default.resolve(appDirectory, apiDir),
    lambdaDirectory: import_path.default.resolve(appDirectory, apiDir, "lambda"),
    distDirectory: distDir,
    sharedDirectory: import_path.default.resolve(appDirectory, sharedDir),
    nodeModulesDirectory: import_path.default.resolve(appDirectory, "./node_modules"),
    serverPlugins: [],
    internalDirectory: import_path.default.resolve(appDirectory, `./node_modules/.${metaName}`),
    plugins,
    htmlTemplates: {},
    serverRoutes: [],
    entrypoints: [],
    checkedEntries: [],
    apiOnly: false,
    internalDirAlias: `@_${metaName.replace(/-/g, "_")}_internal`,
    internalSrcAlias: `@_${metaName.replace(/-/g, "_")}_src`
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AppContext,
  ConfigContext,
  ResolvedConfigContext,
  initAppContext,
  setAppContext,
  useAppContext,
  useConfigContext,
  useResolvedConfigContext
});
