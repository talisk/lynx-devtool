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
  getAutoInjectEnv: () => getAutoInjectEnv
});
module.exports = __toCommonJS(env_exports);
var import_universal = require("@modern-js/utils/universal");
function getAutoInjectEnv(appContext) {
  const { metaName } = appContext;
  const prefix = `${(0, import_universal.cutNameByHyphen)(metaName)}_`.toUpperCase();
  const envReg = new RegExp(`^${prefix}`);
  return Object.keys(process.env).reduce((prev, key) => {
    const value = process.env[key];
    if (envReg.test(key) && typeof value !== "undefined") {
      prev[`process.env.${key}`] = value;
    }
    return prev;
  }, {});
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getAutoInjectEnv
});
