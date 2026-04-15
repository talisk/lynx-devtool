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
var utils_exports = {};
__export(utils_exports, {
  getPathWithoutExt: () => getPathWithoutExt,
  getServerCombinedModueFile: () => getServerCombinedModueFile,
  getServerLoadersFile: () => getServerLoadersFile,
  hasAction: () => hasAction,
  hasLoader: () => hasLoader,
  isPageComponentFile: () => isPageComponentFile,
  parseModule: () => parseModule,
  replaceWithAlias: () => replaceWithAlias,
  walkDirectory: () => walkDirectory
});
module.exports = __toCommonJS(utils_exports);
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var import_utils = require("@modern-js/utils");
var import_es_module_lexer = require("es-module-lexer");
var import_esbuild = require("esbuild");
var import_constants = require("../constants");
const walkDirectory = (dir) => import_fs.default.readdirSync(dir).reduce((previous, filename) => {
  const filePath = import_path.default.join(dir, filename);
  if (import_fs.default.statSync(filePath).isDirectory()) {
    return [
      ...previous,
      ...walkDirectory(filePath)
    ];
  } else {
    return [
      ...previous,
      filePath
    ];
  }
}, []);
const isPageComponentFile = (filePath) => {
  if (/\.(d|test|spec|e2e)\.(js|jsx|ts|tsx)$/.test(filePath)) {
    return false;
  }
  if ([
    ".js",
    ".jsx",
    ".ts",
    ".tsx"
  ].includes(import_path.default.extname(filePath))) {
    return true;
  }
  return false;
};
const replaceWithAlias = (base, filePath, alias) => {
  if (filePath.includes(base)) {
    return (0, import_utils.normalizeToPosixPath)(import_path.default.join(alias, import_path.default.relative(base, filePath)));
  } else {
    return filePath;
  }
};
const parseModule = async ({ source, filename }) => {
  let content = source;
  if (import_utils.JS_EXTENSIONS.some((ext) => filename.endsWith(ext))) {
    const result = await (0, import_esbuild.transform)(content, {
      loader: import_path.default.extname(filename).slice(1),
      format: "esm"
    });
    content = result.code;
  }
  return (0, import_es_module_lexer.parse)(content);
};
const hasLoader = async (filename, source) => {
  let content = source;
  if (!source) {
    content = (await import_utils.fs.readFile(filename, "utf-8")).toString();
  }
  if (content) {
    const [, moduleExports] = await parseModule({
      source: content.toString(),
      filename
    });
    return moduleExports.some((e) => e.n === import_constants.LOADER_EXPORT_NAME);
  }
  return false;
};
const hasAction = async (filename, source) => {
  let content = source;
  if (!source) {
    content = (await import_utils.fs.readFile(filename, "utf-8")).toString();
  }
  if (content) {
    const [, moduleExports] = await parseModule({
      source: content.toString(),
      filename
    });
    return moduleExports.some((e) => e.n === import_constants.ACTION_EXPORT_NAME);
  }
  return false;
};
const getServerLoadersFile = (internalDirectory, entryName) => {
  return import_path.default.join(internalDirectory, entryName, "route-server-loaders.js");
};
const getServerCombinedModueFile = (internalDirectory, entryName) => {
  return import_path.default.join(internalDirectory, entryName, "server-loader-combined.js");
};
const getPathWithoutExt = (filename) => {
  const extname = import_path.default.extname(filename);
  return filename.slice(0, -extname.length);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getPathWithoutExt,
  getServerCombinedModueFile,
  getServerLoadersFile,
  hasAction,
  hasLoader,
  isPageComponentFile,
  parseModule,
  replaceWithAlias,
  walkDirectory
});
