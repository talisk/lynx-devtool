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
var env_exports = {};
__export(env_exports, {
  checkIsProd: () => checkIsProd,
  getRuntimeEnv: () => getRuntimeEnv
});
module.exports = __toCommonJS(env_exports);
const getRuntimeEnv = () => {
  var _globalThis_process_release, _globalThis_process, _globalThis;
  if (((_globalThis = globalThis) === null || _globalThis === void 0 ? void 0 : (_globalThis_process = _globalThis.process) === null || _globalThis_process === void 0 ? void 0 : (_globalThis_process_release = _globalThis_process.release) === null || _globalThis_process_release === void 0 ? void 0 : _globalThis_process_release.name) === "node") {
    return "node";
  }
  return "other";
};
const checkIsProd = () => {
  const env = getRuntimeEnv();
  switch (env) {
    case "node":
      return process.env.NODE_ENV === "production";
    default:
      return false;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkIsProd,
  getRuntimeEnv
});
