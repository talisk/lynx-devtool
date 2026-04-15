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
var mergeConfig_exports = {};
__export(mergeConfig_exports, {
  mergeConfig: () => mergeConfig
});
module.exports = __toCommonJS(mergeConfig_exports);
var import_utils = require("@modern-js/utils");
var import_lodash = require("@modern-js/utils/lodash");
const mergeConfig = (configs) => (0, import_lodash.mergeWith)({}, ...configs, (target, source, key) => {
  if (key === "designSystem" || key === "tailwindcss" && typeof source === "object") {
    return (0, import_lodash.mergeWith)({}, target !== null && target !== void 0 ? target : {}, source !== null && source !== void 0 ? source : {});
  }
  if ((0, import_utils.isOverriddenConfigKey)(key)) {
    return source !== null && source !== void 0 ? source : target;
  }
  if (Array.isArray(target) || Array.isArray(source)) {
    if (target === void 0) {
      return source;
    }
    if (source === void 0) {
      return target;
    }
    return [
      ...(0, import_utils.ensureArray)(target),
      ...(0, import_utils.ensureArray)(source)
    ];
  }
  if ((0, import_lodash.isFunction)(target) || (0, import_lodash.isFunction)(source)) {
    if (source === void 0) {
      return target;
    }
    if (target === void 0) {
      return source;
    }
    return [
      target,
      source
    ];
  }
  return void 0;
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  mergeConfig
});
