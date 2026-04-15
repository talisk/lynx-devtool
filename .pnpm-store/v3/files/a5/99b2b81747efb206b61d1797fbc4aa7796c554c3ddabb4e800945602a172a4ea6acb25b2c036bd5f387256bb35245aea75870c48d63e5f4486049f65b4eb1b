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
  debug: () => debug,
  findLayout: () => findLayout,
  getRouteWeight: () => getRouteWeight,
  shouldSkip: () => shouldSkip
});
module.exports = __toCommonJS(utils_exports);
var import_path = __toESM(require("path"));
var import_utils = require("@modern-js/utils");
var import_constants = require("../../constants");
const debug = (0, import_utils.createDebugger)("get-client-routes");
const findLayout = (dir) => (0, import_utils.findExists)(import_utils.JS_EXTENSIONS.map((ext) => import_path.default.resolve(dir, `${import_constants.FILE_SYSTEM_ROUTES_LAYOUT}${ext}`)));
const getRouteWeight = (route) => route === "*" ? 999 : route.split(":").length - 1;
const shouldSkip = (file) => {
  if (import_utils.fs.statSync(file).isDirectory()) {
    return false;
  }
  const ext = import_path.default.extname(file);
  if (import_constants.FILE_SYSTEM_ROUTES_IGNORED_REGEX.test(file) || !import_utils.JS_EXTENSIONS.includes(ext) || import_constants.FILE_SYSTEM_ROUTES_GLOBAL_LAYOUT === import_path.default.basename(file, ext)) {
    return true;
  }
  return false;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  debug,
  findLayout,
  getRouteWeight,
  shouldSkip
});
