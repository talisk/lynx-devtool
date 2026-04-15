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
  getObjKeyMap: () => getObjKeyMap
});
module.exports = __toCommonJS(utils_exports);
var import_lodash = require("@modern-js/utils/lodash");
function getObjKeyMap(obj, prefix = "") {
  const result = {};
  Object.keys(obj).forEach((key) => {
    if ((0, import_lodash.isString)(obj[key])) {
      result[key] = prefix ? `${prefix}.${key}` : key;
    } else if ((0, import_lodash.isObject)(obj[key])) {
      result[key] = getObjKeyMap(obj[key], prefix ? `${prefix}.${key}` : key);
    }
  });
  return result;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getObjKeyMap
});
