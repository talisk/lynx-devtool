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
var src_exports = {};
__export(src_exports, {
  I18n: () => I18n
});
module.exports = __toCommonJS(src_exports);
var import_lodash = require("@modern-js/utils/lodash");
var import_utils = require("./utils");
class I18n {
  format(msg, vars) {
    return msg.replace(/\{(\w+)\}/g, (_match, capture) => Object.prototype.hasOwnProperty.call(vars, capture) ? vars[capture] : capture);
  }
  getMessage(lang, key, vars, fallbackText) {
    const languages = Object.keys(this.languageMap);
    const resultLang = languages.find((l) => l === lang);
    if (!resultLang && languages.length === 0) {
      return fallbackText || key;
    }
    const model = this.languageMap[resultLang || "en"];
    if (!model) {
      return fallbackText || key;
    }
    const message = (0, import_lodash.get)(model, key);
    const value = message || fallbackText || key;
    if (typeof value === "string") {
      return this.format(value, vars || {});
    }
    throw new Error("key is not a string");
  }
  init(language, languageMap) {
    this.language = language || "en";
    if (languageMap) {
      this.languageMap = languageMap;
    }
    return (0, import_utils.getObjKeyMap)(this.languageMap[this.language]);
  }
  changeLanguage(config) {
    this.language = config.locale || "en";
  }
  t(key, vars, fallbackText) {
    return this.getMessage(this.language, key, vars, fallbackText);
  }
  lang(lang) {
    return {
      t: (key, vars, fallbackText) => this.getMessage(lang, key, vars, fallbackText)
    };
  }
  constructor() {
    this.language = "en";
    this.languageMap = {};
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  I18n
});
