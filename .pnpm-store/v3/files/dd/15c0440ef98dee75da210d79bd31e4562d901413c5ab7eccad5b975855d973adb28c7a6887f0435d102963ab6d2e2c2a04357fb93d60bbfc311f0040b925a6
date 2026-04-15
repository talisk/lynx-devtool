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
var resolvePath_exports = {};
__export(resolvePath_exports, {
  default: () => resolvePath
});
module.exports = __toCommonJS(resolvePath_exports);
var import_path = __toESM(require("path"));
var import_log = require("./log");
var import_mapToRelative = __toESM(require("./mapToRelative"));
var import_normalizeOptions = __toESM(require("./normalizeOptions"));
var import_utils = require("./utils");
function getRelativePath(sourcePath, currentFile, absFileInRoot, opts) {
  const realSourceFileExtension = import_path.default.extname(absFileInRoot);
  const sourceFileExtension = import_path.default.extname(sourcePath);
  let relativePath = (0, import_mapToRelative.default)(opts.cwd, currentFile, absFileInRoot);
  if (realSourceFileExtension !== sourceFileExtension) {
    relativePath = (0, import_utils.replaceExtension)(relativePath, opts);
  }
  return (0, import_utils.toLocalPath)((0, import_utils.toPosixPath)(relativePath));
}
function findPathInRoots(sourcePath, { extensions, root }) {
  let resolvedSourceFile;
  root.some((basedir) => {
    resolvedSourceFile = (0, import_utils.nodeResolvePath)(`./${sourcePath}`, basedir, extensions);
    return resolvedSourceFile !== null;
  });
  return resolvedSourceFile;
}
function resolvePathFromRootConfig(sourcePath, currentFile, opts) {
  const absFileInRoot = findPathInRoots(sourcePath, opts);
  if (!absFileInRoot) {
    return null;
  }
  return getRelativePath(sourcePath, currentFile, absFileInRoot, opts);
}
function checkIfPackageExists(modulePath, currentFile, extensions, loglevel) {
  const resolvedPath = (0, import_utils.nodeResolvePath)(modulePath, currentFile, extensions);
  if (resolvedPath === null && loglevel !== "silent") {
    (0, import_log.warn)(`Could not resolve "${modulePath}" in file ${currentFile}.`);
  }
}
function resolvePathFromAliasConfig(sourcePath, currentFile, opts) {
  let aliasedSourceFile;
  opts.alias.find(([regExp, substitute]) => {
    const execResult = regExp.exec(sourcePath);
    if (execResult === null) {
      return false;
    }
    aliasedSourceFile = substitute(execResult);
    return true;
  });
  if (!aliasedSourceFile) {
    return null;
  }
  if (Array.isArray(aliasedSourceFile)) {
    return aliasedSourceFile.map((asf) => {
      if ((0, import_utils.isRelativePath)(asf)) {
        return (0, import_utils.toLocalPath)((0, import_utils.toPosixPath)((0, import_mapToRelative.default)(opts.cwd, currentFile, asf)));
      }
      return asf;
    }).find((src) => (0, import_utils.nodeResolvePath)(src, import_path.default.dirname(currentFile), opts.extensions));
  }
  if ((0, import_utils.isRelativePath)(aliasedSourceFile)) {
    return (0, import_utils.toLocalPath)((0, import_utils.toPosixPath)((0, import_mapToRelative.default)(opts.cwd, currentFile, aliasedSourceFile)));
  }
  if (process.env.NODE_ENV !== "production") {
    checkIfPackageExists(aliasedSourceFile, currentFile, opts.extensions, opts.loglevel);
  }
  return aliasedSourceFile;
}
const resolvers = [
  resolvePathFromAliasConfig,
  resolvePathFromRootConfig
];
function resolvePath(sourcePath, currentFile, opts) {
  if ((0, import_utils.isRelativePath)(sourcePath)) {
    return sourcePath;
  }
  const normalizedOpts = (0, import_normalizeOptions.default)(currentFile, opts);
  const absoluteCurrentFile = import_path.default.resolve(currentFile);
  let resolvedPath = null;
  resolvers.some((resolver) => {
    resolvedPath = resolver(sourcePath, absoluteCurrentFile, normalizedOpts);
    return resolvedPath !== null;
  });
  return resolvedPath;
}
