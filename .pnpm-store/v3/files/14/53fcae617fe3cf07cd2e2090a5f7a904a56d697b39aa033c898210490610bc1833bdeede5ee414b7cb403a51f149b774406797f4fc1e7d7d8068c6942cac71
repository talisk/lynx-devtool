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
  escapeRegExp: () => escapeRegExp,
  isImportCall: () => isImportCall,
  isRelativePath: () => isRelativePath,
  matchesPattern: () => matchesPattern,
  nodeResolvePath: () => nodeResolvePath,
  replaceExtension: () => replaceExtension,
  stripExtension: () => stripExtension,
  toLocalPath: () => toLocalPath,
  toPosixPath: () => toPosixPath
});
module.exports = __toCommonJS(utils_exports);
var import_path = __toESM(require("path"));
var import_resolve = __toESM(require("resolve"));
function nodeResolvePath(modulePath, basedir, extensions) {
  try {
    return import_resolve.default.sync(modulePath, {
      basedir,
      extensions
    });
  } catch (e) {
    return null;
  }
}
function isRelativePath(nodePath) {
  return nodePath.match(/^\.?\.\//);
}
function toPosixPath(modulePath) {
  return modulePath.replace(/\\/g, "/");
}
function toLocalPath(modulePath) {
  let localPath = modulePath.replace(/\/index$/, "");
  if (!isRelativePath(localPath)) {
    localPath = `./${localPath}`;
  }
  return localPath;
}
function stripExtension(modulePath, stripExtensions) {
  let name = import_path.default.basename(modulePath);
  stripExtensions.some((extension) => {
    if (name.endsWith(extension)) {
      name = name.slice(0, name.length - extension.length);
      return true;
    }
    return false;
  });
  return name;
}
function replaceExtension(modulePath, opts) {
  const filename = stripExtension(modulePath, opts.stripExtensions);
  return import_path.default.join(import_path.default.dirname(modulePath), filename);
}
function matchesPattern(types, calleePath, pattern) {
  const { node } = calleePath;
  if (types.isMemberExpression(node)) {
    return calleePath.matchesPattern(pattern);
  }
  if (!types.isIdentifier(node) || pattern.includes(".")) {
    return false;
  }
  const name = pattern.split(".")[0];
  return node.name === name;
}
function isImportCall(types, calleePath) {
  return types.isImport(calleePath.node.callee);
}
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  escapeRegExp,
  isImportCall,
  isRelativePath,
  matchesPattern,
  nodeResolvePath,
  replaceExtension,
  stripExtension,
  toLocalPath,
  toPosixPath
});
