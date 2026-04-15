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
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var babel_exports = {};
__export(babel_exports, {
  compileByBabel: () => compileByBabel,
  existTsConfigFile: () => existTsConfigFile,
  readTsConfig: () => readTsConfig,
  resolveBabelConfig: () => resolveBabelConfig
});
module.exports = __toCommonJS(babel_exports);
var path = __toESM(require("path"));
var import_babel_compiler = require("@modern-js/babel-compiler");
var import_utils = require("@modern-js/utils");
var import_common = require("../../common");
var import_preset = require("./preset");
__reExport(babel_exports, require("@babel/core"), module.exports);
const readTsConfig = (tsconfigPath, noExistReturn = null) => {
  if (!import_utils.fs.existsSync(tsconfigPath)) {
    return noExistReturn;
  }
  const content = import_utils.fs.readFileSync(tsconfigPath, "utf-8");
  return import_utils.json5.parse(content);
};
const existTsConfigFile = (tsconfigAbsolutePath) => {
  const tsconfig = readTsConfig(tsconfigAbsolutePath);
  return Boolean(tsconfig);
};
const resolveBabelConfig = (appDirectory, config, option, isEsm) => {
  const { alias, babelConfig } = config;
  const aliasConfig = (0, import_utils.getAliasConfig)(alias, {
    appDirectory,
    ...option
  });
  const defaultBabelConfig = (0, import_preset.getBabelConfig)({
    appDirectory,
    alias: aliasConfig,
    isEsm
  });
  return (0, import_preset.applyUserBabelConfig)(defaultBabelConfig, babelConfig);
};
const compileByBabel = async (appDirectory, config, compileOptions) => {
  const { sourceDirs, distDir, tsconfigPath, moduleType } = compileOptions;
  const isEsm = moduleType === "module";
  const results = await Promise.all(sourceDirs.map(async (sourceDir) => {
    const babelConfig = resolveBabelConfig(appDirectory, config, {
      tsconfigPath: tsconfigPath ? tsconfigPath : ""
    }, isEsm);
    if (await import_utils.fs.pathExists(sourceDir)) {
      const basename = path.basename(sourceDir);
      const targetDir = path.join(distDir, basename);
      await import_utils.fs.copy(sourceDir, targetDir, {
        filter: (src) => ![
          ".ts",
          ".js"
        ].includes(path.extname(src)) && src !== tsconfigPath
      });
    }
    return (0, import_babel_compiler.compiler)({
      rootDir: appDirectory,
      distDir,
      sourceDir,
      extensions: import_common.FILE_EXTENSIONS
    }, babelConfig);
  }));
  results.forEach((result) => {
    if (result.code === 1) {
      throw new Error(result.message);
    }
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  compileByBabel,
  existTsConfigFile,
  readTsConfig,
  resolveBabelConfig,
  ...require("@babel/core")
});
