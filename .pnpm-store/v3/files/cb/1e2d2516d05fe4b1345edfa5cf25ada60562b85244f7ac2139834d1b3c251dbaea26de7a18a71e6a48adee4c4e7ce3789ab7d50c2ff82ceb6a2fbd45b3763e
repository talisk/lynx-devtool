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
var alias_exports = {};
__export(alias_exports, {
  aliasPlugin: () => aliasPlugin
});
module.exports = __toCommonJS(alias_exports);
var import_path = __toESM(require("path"));
var import_utils = require("@modern-js/utils");
var import_tsconfig_paths = require("@modern-js/utils/tsconfig-paths");
const { resolvePath } = require("@modern-js/babel-plugin-module-resolver");
const defaultPaths = {
  "@": [
    "./src"
  ]
};
const aliasPlugin = (alias) => {
  const { absoluteBaseUrl, isTsPath, isTsProject = false } = alias;
  const mergedPaths = isTsPath ? alias.paths || {} : {
    ...defaultPaths,
    ...alias.paths || {}
  };
  let tsPaths = {};
  if (isTsProject) {
    tsPaths = (0, import_utils.getUserAlias)(mergedPaths);
  }
  tsPaths = Object.keys(tsPaths).reduce((o, key) => {
    if (typeof tsPaths[key] === "string") {
      return {
        ...o,
        [`${key}`]: [
          tsPaths[key]
        ]
      };
    }
    return {
      ...o,
      [`${key}`]: tsPaths[key]
    };
  }, {});
  const resolvePathFn = (sourcePath, currentFile, opts) => {
    if (sourcePath === "." || sourcePath === "./") {
      return sourcePath;
    }
    const matchPath = (0, import_tsconfig_paths.createMatchPath)(absoluteBaseUrl, tsPaths, [
      "index"
    ]);
    const result = matchPath(sourcePath, void 0, void 0, [
      ".js",
      ".jsx",
      ".ts",
      ".tsx"
    ]);
    if (result) {
      const relativePath = import_path.default.relative(import_path.default.dirname(currentFile), import_path.default.dirname(result));
      const fileName = import_path.default.basename(result);
      const filePath = import_path.default.normalize(`${relativePath.length === 0 ? "." : relativePath}/${fileName}`).replace(/\\/, "/");
      return filePath.startsWith(".") ? filePath : `./${filePath}`;
    }
    return resolvePath(sourcePath, currentFile, opts);
  };
  const typescriptExts = [
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".es",
    ".es6",
    ".mjs"
  ];
  return [
    require.resolve("@modern-js/babel-plugin-module-resolver"),
    {
      root: absoluteBaseUrl,
      alias: mergedPaths,
      resolvePath: isTsPath ? resolvePathFn : void 0,
      extensions: isTsProject ? typescriptExts : void 0
    }
  ];
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  aliasPlugin
});
