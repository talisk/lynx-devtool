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
var arco_exports = {};
__export(arco_exports, {
  pluginArco: () => pluginArco
});
module.exports = __toCommonJS(arco_exports);
var import_utils = require("@modern-js/utils");
var import_utils2 = require("../utils");
const pluginArco = (imports) => ({
  name: "uni-builder:arco",
  setup(api) {
    const ARCO_NAME = "@arco-design/web-react";
    const ARCO_ICON = `${ARCO_NAME}/icon`;
    api.modifyEnvironmentConfig((rsbuildConfig, { name, mergeEnvironmentConfig }) => {
      if (imports === false || !(0, import_utils.isPackageInstalled)(ARCO_NAME, api.context.rootPath)) {
        return;
      }
      const defaultImports = [];
      const useServerEnvironment = (0, import_utils2.isServerEnvironment)(rsbuildConfig.output.target, name);
      if (typeof imports === "function" || !(imports === null || imports === void 0 ? void 0 : imports.some((item) => typeof item === "object" && item.libraryName === ARCO_NAME))) {
        defaultImports.push({
          libraryName: ARCO_NAME,
          libraryDirectory: useServerEnvironment ? "lib" : "es",
          camelToDashComponentName: false,
          style: true
        });
      }
      if (typeof imports === "function" || !(imports === null || imports === void 0 ? void 0 : imports.some((item) => typeof item === "object" && item.libraryName === ARCO_ICON))) {
        defaultImports.push({
          libraryName: ARCO_ICON,
          libraryDirectory: useServerEnvironment ? "react-icon-cjs" : "react-icon",
          camelToDashComponentName: false
        });
      }
      return defaultImports.length ? mergeEnvironmentConfig({
        source: {
          transformImport: defaultImports
        }
      }, rsbuildConfig) : rsbuildConfig;
    });
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pluginArco
});
