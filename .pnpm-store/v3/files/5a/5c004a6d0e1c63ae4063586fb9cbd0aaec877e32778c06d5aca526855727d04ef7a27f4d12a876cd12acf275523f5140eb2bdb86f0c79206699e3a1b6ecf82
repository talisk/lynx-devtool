"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var utils_exports = {};
__export(utils_exports, {
  attributesToString: () => attributesToString,
  checkIsNode: () => checkIsNode,
  getSSRConfigByEntry: () => getSSRConfigByEntry,
  getSSRMode: () => getSSRMode,
  safeReplace: () => safeReplace,
  serializeErrors: () => serializeErrors
});
module.exports = __toCommonJS(utils_exports);
var import_remix_router = require("@modern-js/runtime-utils/remix-router");
function attributesToString(attributes) {
  return Object.entries(attributes).reduce((str, [key, value]) => {
    return value === void 0 ? str : `${str} ${key}="${value}"`;
  }, "");
}
function safeReplace(source, searchValue, replaceValue) {
  return source.replace(searchValue, () => replaceValue);
}
function checkIsNode() {
  var _process_release;
  return typeof process !== "undefined" && ((_process_release = process.release) === null || _process_release === void 0 ? void 0 : _process_release.name) === "node";
}
function serializeErrors(errors) {
  if (!errors) {
    return null;
  }
  const entries = Object.entries(errors);
  const serialized = {};
  for (const [key, val] of entries) {
    if ((0, import_remix_router.isRouteErrorResponse)(val)) {
      serialized[key] = {
        ...val,
        __type: "RouteErrorResponse"
      };
    } else if (val instanceof Error) {
      serialized[key] = {
        message: val.message,
        stack: val.stack,
        __type: "Error"
      };
    } else {
      serialized[key] = val;
    }
  }
  return serialized;
}
function getSSRConfigByEntry(entryName, ssr, ssrByEntries) {
  if (ssrByEntries === null || ssrByEntries === void 0 ? void 0 : ssrByEntries[entryName]) {
    return ssrByEntries[entryName];
  }
  return ssr || true;
}
function getSSRMode(ssrConfig) {
  if (typeof ssrConfig === "boolean") {
    return ssrConfig ? "string" : false;
  }
  return (ssrConfig === null || ssrConfig === void 0 ? void 0 : ssrConfig.mode) === "stream" ? "stream" : "string";
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  attributesToString,
  checkIsNode,
  getSSRConfigByEntry,
  getSSRMode,
  safeReplace,
  serializeErrors
});
