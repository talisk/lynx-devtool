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
var routes_exports = {};
__export(routes_exports, {
  generateRoutes: () => generateRoutes,
  getPathWithoutExt: () => getPathWithoutExt,
  isMainEntry: () => isMainEntry
});
module.exports = __toCommonJS(routes_exports);
var import_path = __toESM(require("path"));
var import_utils = require("@modern-js/utils");
const generateRoutes = async (appContext) => {
  const { serverRoutes, distDirectory } = appContext;
  const output = JSON.stringify({
    routes: serverRoutes
  }, null, 2);
  await import_utils.fs.outputFile(import_path.default.join(distDirectory, import_utils.ROUTE_SPEC_FILE), output);
};
const getPathWithoutExt = (filename) => {
  const extname = import_path.default.extname(filename);
  return filename.slice(0, -extname.length);
};
const isMainEntry = (entryName, mainEntryName) => {
  return entryName === (mainEntryName || import_utils.MAIN_ENTRY_NAME);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  generateRoutes,
  getPathWithoutExt,
  isMainEntry
});
