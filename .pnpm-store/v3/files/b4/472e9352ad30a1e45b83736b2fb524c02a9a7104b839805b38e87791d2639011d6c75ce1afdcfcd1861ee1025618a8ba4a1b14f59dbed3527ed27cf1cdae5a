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
var antd_exports = {};
__export(antd_exports, {
  pluginAntd: () => pluginAntd
});
module.exports = __toCommonJS(antd_exports);
var import_utils = require("../utils");
const getAntdMajorVersion = (appDirectory) => {
  try {
    const pkgJsonPath = require.resolve("antd/package.json", {
      paths: [
        appDirectory
      ]
    });
    const { version } = require(pkgJsonPath);
    return Number(version.split(".")[0]);
  } catch (err) {
    return null;
  }
};
const pluginAntd = (imports) => ({
  name: "uni-builder:antd",
  setup(api) {
    api.modifyEnvironmentConfig((rsbuildConfig, { name, mergeEnvironmentConfig }) => {
      if (imports === false || Array.isArray(imports) && (imports === null || imports === void 0 ? void 0 : imports.some((item) => typeof item === "object" && item.libraryName === "antd"))) {
        return;
      }
      const useServerEnvironment = (0, import_utils.isServerEnvironment)(rsbuildConfig.output.target, name);
      const antdMajorVersion = getAntdMajorVersion(api.context.rootPath);
      if (antdMajorVersion && antdMajorVersion < 5) {
        return mergeEnvironmentConfig({
          source: {
            transformImport: [
              {
                libraryName: "antd",
                libraryDirectory: useServerEnvironment ? "lib" : "es",
                style: true
              }
            ]
          }
        }, rsbuildConfig);
      }
      return rsbuildConfig;
    });
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pluginAntd
});
