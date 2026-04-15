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
var entry_exports = {};
__export(entry_exports, {
  hasNestedRoutes: () => hasNestedRoutes,
  hasPages: () => hasPages,
  isRouteEntry: () => isRouteEntry,
  modifyEntrypoints: () => modifyEntrypoints
});
module.exports = __toCommonJS(entry_exports);
var import_path = __toESM(require("path"));
var import_utils = require("@modern-js/utils");
var import_entry = require("../../cli/entry");
var import_constants = require("./constants");
const hasPages = (dir) => import_utils.fs.existsSync(import_path.default.join(dir, import_constants.PAGES_DIR_NAME));
const hasNestedRoutes = (dir) => import_utils.fs.existsSync(import_path.default.join(dir, import_constants.NESTED_ROUTES_DIR));
const isRouteEntry = (dir) => {
  if (hasNestedRoutes(dir)) {
    return import_path.default.join(dir, import_constants.NESTED_ROUTES_DIR);
  }
  if (hasPages(dir)) {
    return import_path.default.join(dir, import_constants.PAGES_DIR_NAME);
  }
  return false;
};
const modifyEntrypoints = (entrypoints, config = {}) => {
  return entrypoints.map((entrypoint) => {
    if (!entrypoint.isAutoMount) {
      return entrypoint;
    }
    if (entrypoint === null || entrypoint === void 0 ? void 0 : entrypoint.isCustomSourceEntry) {
      if (entrypoint.fileSystemRoutes) {
        if ((0, import_utils.isRouterV5)(config)) {
          throw Error("Custom entries with conventional routing not support use react router v5!");
        }
        entrypoint.nestedRoutesEntry = entrypoint.entry;
      }
      return entrypoint;
    }
    const isHasApp = (0, import_entry.hasApp)(entrypoint.absoluteEntryDir);
    if (isHasApp) {
      return entrypoint;
    }
    const isHasPages = hasPages(entrypoint.absoluteEntryDir);
    if (isHasPages) {
      entrypoint.pageRoutesEntry = import_path.default.join(entrypoint.absoluteEntryDir, import_constants.PAGES_DIR_NAME);
      entrypoint.fileSystemRoutes = {
        ...entrypoint.fileSystemRoutes,
        globalApp: (0, import_utils.findExists)(import_utils.JS_EXTENSIONS.map((ext) => import_path.default.resolve(entrypoint.absoluteEntryDir, `./${import_constants.PAGES_DIR_NAME}/${import_constants.FILE_SYSTEM_ROUTES_GLOBAL_LAYOUT}${ext}`)))
      };
    }
    const isHasNestedRoutes = hasNestedRoutes(entrypoint.absoluteEntryDir);
    if (isHasNestedRoutes) {
      entrypoint.nestedRoutesEntry = import_path.default.join(entrypoint.absoluteEntryDir, import_constants.NESTED_ROUTES_DIR);
    }
    return entrypoint;
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  hasNestedRoutes,
  hasPages,
  isRouteEntry,
  modifyEntrypoints
});
