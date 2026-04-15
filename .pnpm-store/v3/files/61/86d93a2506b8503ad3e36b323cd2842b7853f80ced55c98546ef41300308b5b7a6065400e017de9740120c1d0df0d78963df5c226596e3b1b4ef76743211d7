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
var createLoadedConfig_exports = {};
__export(createLoadedConfig_exports, {
  assignPkgConfig: () => assignPkgConfig,
  createLoadedConfig: () => createLoadedConfig
});
module.exports = __toCommonJS(createLoadedConfig_exports);
var import_path = __toESM(require("path"));
var import_utils = require("@modern-js/utils");
var import_lodash = require("@modern-js/utils/lodash");
var import_utils2 = require("../utils");
var import_loadConfig = require("./loadConfig");
const assignPkgConfig = (userConfig = {}, pkgConfig = {}) => (0, import_lodash.mergeWith)({}, userConfig, pkgConfig, (objValue, srcValue) => {
  if (objValue === void 0 && (0, import_utils.isPlainObject)(srcValue)) {
    return {
      ...srcValue
    };
  }
  return void 0;
});
async function getConfigObject(config) {
  if (typeof config === "function") {
    return await config({
      env: (0, import_utils.getNodeEnv)(),
      command: (0, import_utils.getCommand)()
    }) || {};
  }
  return config || {};
}
async function loadLocalConfig(appDirectory, configFile) {
  let localConfigFile = false;
  if (typeof configFile === "string") {
    for (const ext of import_utils.CONFIG_FILE_EXTENSIONS) {
      if (configFile.endsWith(ext)) {
        const replacedPath = configFile.replace(ext, `.local${ext}`);
        if (import_utils.fs.existsSync(replacedPath)) {
          localConfigFile = replacedPath;
        }
      }
    }
  } else {
    localConfigFile = (0, import_utils.findExists)(import_utils.CONFIG_FILE_EXTENSIONS.map((extension) => import_path.default.resolve(appDirectory, `${import_loadConfig.LOCAL_CONFIG_FILE_NAME}${extension}`)));
  }
  if (localConfigFile) {
    const loaded = await (0, import_loadConfig.loadConfig)(appDirectory, localConfigFile);
    return getConfigObject(loaded.config);
  }
  return null;
}
async function createLoadedConfig(appDirectory, filePath, packageJsonConfig, loadedConfig) {
  const configFile = (0, import_loadConfig.getConfigFilePath)(appDirectory, filePath);
  const loaded = await (0, import_loadConfig.loadConfig)(appDirectory, configFile, packageJsonConfig, loadedConfig);
  if (!loaded.config && !loaded.pkgConfig) {
    import_utils.logger.warn(`Can not find any config file in the current project, please check if you have a correct config file.`);
    import_utils.logger.warn(`Current project path: ${import_utils.chalk.yellow(appDirectory)}`);
  }
  const config = await getConfigObject(loaded.config);
  let mergedConfig = config;
  if (loaded.pkgConfig) {
    mergedConfig = assignPkgConfig(config, loaded === null || loaded === void 0 ? void 0 : loaded.pkgConfig);
  }
  if ((0, import_utils.isDevCommand)()) {
    const localConfig = await loadLocalConfig(appDirectory, configFile);
    if (localConfig) {
      mergedConfig = (0, import_utils2.mergeConfig)([
        mergedConfig,
        localConfig
      ]);
    }
  }
  return {
    config: mergedConfig,
    filePath: loaded.path,
    dependencies: loaded.dependencies || [],
    pkgConfig: loaded.pkgConfig || {},
    jsConfig: config || {}
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assignPkgConfig,
  createLoadedConfig
});
