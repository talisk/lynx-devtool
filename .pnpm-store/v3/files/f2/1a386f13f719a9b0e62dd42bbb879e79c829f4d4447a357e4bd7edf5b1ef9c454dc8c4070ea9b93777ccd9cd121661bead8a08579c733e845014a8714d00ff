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
  CONFIG_FILE_NAME: () => CONFIG_FILE_NAME,
  LOCAL_CONFIG_FILE_NAME: () => LOCAL_CONFIG_FILE_NAME,
  PACKAGE_JSON_CONFIG_NAME: () => PACKAGE_JSON_CONFIG_NAME,
  clearFilesOverTime: () => clearFilesOverTime,
  getConfigFilePath: () => getConfigFilePath,
  getDependencies: () => getDependencies,
  getPackageConfig: () => getPackageConfig,
  loadConfig: () => loadConfig
});
module.exports = __toCommonJS(loadConfig_exports);
var import_path = __toESM(require("path"));
var import_node_bundle_require = require("@modern-js/node-bundle-require");
var import_utils = require("@modern-js/utils");
const debug = (0, import_utils.createDebugger)("load-config");
const CONFIG_FILE_NAME = "modern.config";
const LOCAL_CONFIG_FILE_NAME = "modern.config.local";
const PACKAGE_JSON_CONFIG_NAME = "modernConfig";
const getPackageConfig = (appDirectory, packageJsonConfig) => {
  const json = JSON.parse(import_utils.fs.readFileSync(import_path.default.resolve(appDirectory, "./package.json"), "utf8"));
  return json[packageJsonConfig !== null && packageJsonConfig !== void 0 ? packageJsonConfig : PACKAGE_JSON_CONFIG_NAME];
};
const getDependencies = (filePath) => {
  const mod = require.cache[filePath];
  if (!mod) {
    debug(`${filePath} has not been required yet`);
    return [];
  }
  const deps = [];
  if (!/\/node_modules\/|\/modern-js\/packages\//.test(mod.id)) {
    deps.push(mod.id);
    for (const child of mod.children) {
      deps.push(...getDependencies(child.id));
    }
  }
  return deps;
};
const clearFilesOverTime = async (targetDir, overtime) => {
  try {
    const files = await (0, import_utils.globby)(`${targetDir}/**/*`, {
      stats: true,
      absolute: true
    });
    const currentTime = Date.now();
    if (files.length > 0) {
      for (const file of files) {
        if (currentTime - file.stats.birthtimeMs >= overtime * 1e3) {
          import_utils.fs.unlinkSync(file.path);
        }
      }
    }
  } catch (err) {
  }
};
const bundleRequireWithCatch = async (configFile, { appDirectory }) => {
  try {
    const mod = await (0, import_node_bundle_require.bundleRequire)(configFile, {
      autoClear: false,
      getOutputFile: async (filePath) => {
        const defaultOutputFileName = import_path.default.basename(await (0, import_node_bundle_require.defaultGetOutputFile)(filePath));
        const outputPath = import_path.default.join(appDirectory, import_utils.CONFIG_CACHE_DIR);
        const timeLimit = 10 * 60;
        await clearFilesOverTime(outputPath, timeLimit);
        return import_path.default.join(outputPath, defaultOutputFileName);
      }
    });
    return mod;
  } catch (e) {
    if (e instanceof Error) {
      e.message = `Get Error while loading config file: ${configFile}, please check it and retry.
${e.message || ""}`;
    }
    throw e;
  }
};
const getConfigFilePath = (appDirectory, filePath) => {
  if (filePath) {
    if (import_path.default.isAbsolute(filePath)) {
      return filePath;
    }
    return import_path.default.resolve(appDirectory, filePath);
  }
  return (0, import_utils.findExists)(import_utils.CONFIG_FILE_EXTENSIONS.map((extension) => import_path.default.resolve(appDirectory, `${CONFIG_FILE_NAME}${extension}`)));
};
const loadConfig = async (appDirectory, configFile, packageJsonConfig, loadedConfig) => {
  const pkgConfig = getPackageConfig(appDirectory, packageJsonConfig);
  let config;
  const dependencies = pkgConfig ? [
    import_path.default.resolve(appDirectory, "./package.json")
  ] : [];
  if (loadedConfig) {
    config = loadedConfig;
  } else if (configFile) {
    delete require.cache[configFile];
    const mod = await bundleRequireWithCatch(configFile, {
      appDirectory
    });
    config = mod.default || mod;
  }
  return {
    path: configFile,
    config,
    pkgConfig,
    dependencies
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CONFIG_FILE_NAME,
  LOCAL_CONFIG_FILE_NAME,
  PACKAGE_JSON_CONFIG_NAME,
  clearFilesOverTime,
  getConfigFilePath,
  getDependencies,
  getPackageConfig,
  loadConfig
});
