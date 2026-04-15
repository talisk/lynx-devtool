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
var locale_exports = {};
__export(locale_exports, {
  i18n: () => i18n,
  localeKeys: () => localeKeys
});
module.exports = __toCommonJS(locale_exports);
var import_plugin_i18n = require("@modern-js/plugin-i18n");
var import_en = require("./en");
var import_zh = require("./zh");
const i18n = new import_plugin_i18n.I18n();
const localeKeys = i18n.init("en", {
  zh: import_zh.ZH_LOCALE,
  en: import_en.EN_LOCALE
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  i18n,
  localeKeys
});
