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
var common_exports = {};
__export(common_exports, {
  FILE_EXTENSIONS: () => FILE_EXTENSIONS,
  compile: () => compile
});
module.exports = __toCommonJS(common_exports);
var path = __toESM(require("path"));
var import_utils = require("@modern-js/utils");
const FILE_EXTENSIONS = [
  ".js",
  ".ts",
  ".mjs",
  ".ejs"
];
const validateAbsolutePath = (filename, message) => {
  if (!path.isAbsolute(filename)) {
    throw new Error(message);
  }
};
const validateAbsolutePaths = (filenames, messageFunc) => {
  filenames.forEach((filename) => validateAbsolutePath(filename, messageFunc(filename)));
};
const compile = async (appDirectory, modernConfig, compileOptions) => {
  var _modernConfig_server;
  const { sourceDirs, distDir, tsconfigPath } = compileOptions;
  validateAbsolutePaths(sourceDirs, (dir) => `source dir ${dir} is not an absolute path.`);
  validateAbsolutePath(distDir, `dist dir ${distDir} is not an absolute path.`);
  const compiler = modernConfig === null || modernConfig === void 0 ? void 0 : (_modernConfig_server = modernConfig.server) === null || _modernConfig_server === void 0 ? void 0 : _modernConfig_server.compiler;
  const isTsProject = tsconfigPath && await import_utils.fs.pathExists(tsconfigPath);
  if (!isTsProject || compiler === "babel") {
    const { compileByBabel } = await Promise.resolve().then(() => __toESM(require("../compilers/babel")));
    await compileByBabel(appDirectory, modernConfig, compileOptions);
  } else {
    const { compileByTs } = await Promise.resolve().then(() => __toESM(require("../compilers/typescript")));
    await compileByTs(appDirectory, modernConfig, compileOptions);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FILE_EXTENSIONS,
  compile
});
