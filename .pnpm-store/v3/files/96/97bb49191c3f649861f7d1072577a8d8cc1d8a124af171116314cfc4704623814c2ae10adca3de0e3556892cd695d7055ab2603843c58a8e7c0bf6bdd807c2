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
  hasApp: () => hasApp,
  isRuntimeEntry: () => isRuntimeEntry
});
module.exports = __toCommonJS(entry_exports);
var import_path = __toESM(require("path"));
var import_utils = require("@modern-js/utils");
var import_constants = require("./constants");
const hasApp = (dir) => (0, import_utils.findExists)(import_utils.JS_EXTENSIONS.map((ext) => import_path.default.resolve(dir, `${import_constants.APP_FILE_NAME}${ext}`)));
const isRuntimeEntry = (dir) => hasApp(dir);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  hasApp,
  isRuntimeEntry
});
