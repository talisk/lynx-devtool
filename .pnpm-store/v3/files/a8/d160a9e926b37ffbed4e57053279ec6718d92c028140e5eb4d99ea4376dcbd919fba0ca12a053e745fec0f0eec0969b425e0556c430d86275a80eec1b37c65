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
var generateWatchFiles_exports = {};
__export(generateWatchFiles_exports, {
  addServerConfigToDeps: () => addServerConfigToDeps,
  generateWatchFiles: () => generateWatchFiles
});
module.exports = __toCommonJS(generateWatchFiles_exports);
var import_path = __toESM(require("path"));
var import_utils = require("@modern-js/utils");
const getPackageConfig = (appDirectory, packageJsonConfig) => {
  const PACKAGE_JSON_CONFIG_NAME = "modernConfig";
  const json = JSON.parse(import_utils.fs.readFileSync(import_path.default.resolve(appDirectory, "./package.json"), "utf8"));
  return json[packageJsonConfig !== null && packageJsonConfig !== void 0 ? packageJsonConfig : PACKAGE_JSON_CONFIG_NAME];
};
const addServerConfigToDeps = async (dependencies, appDirectory, serverConfigFile) => {
  const serverConfig = await (0, import_utils.getServerConfig)(appDirectory, serverConfigFile);
  if (serverConfig) {
    dependencies.push(serverConfig);
  }
};
async function generateWatchFiles(appContext, configDir) {
  const { appDirectory, configFile } = appContext;
  const configPath = import_path.default.join(appDirectory, configDir || "");
  const dependencies = getPackageConfig(appContext.appDirectory, appContext.packageName) ? [
    import_path.default.resolve(appDirectory, "./package.json")
  ] : [];
  await addServerConfigToDeps(dependencies, appContext.appDirectory, appContext.serverConfigFile);
  return [
    `${configPath}/html`,
    configFile || "./config",
    ...dependencies
  ];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addServerConfigToDeps,
  generateWatchFiles
});
