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
var nestedRoutes_exports = {};
__export(nestedRoutes_exports, {
  matchEntry: () => matchEntry
});
module.exports = __toCommonJS(nestedRoutes_exports);
function sortByUrlPath(entries) {
  entries.sort(function(a, b) {
    const length1 = a.urlPath.length;
    const length2 = b.urlPath.length;
    if (length1 < length2) {
      return 1;
    }
    if (length1 > length2) {
      return -1;
    }
    return 0;
  });
  return entries;
}
const matchEntry = (pathname, entries) => {
  sortByUrlPath(entries);
  return entries.find((entry) => pathname.startsWith(entry.urlPath));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  matchEntry
});
