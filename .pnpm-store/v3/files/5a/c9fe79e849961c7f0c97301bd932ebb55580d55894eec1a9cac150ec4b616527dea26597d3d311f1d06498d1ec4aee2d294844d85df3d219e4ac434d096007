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
var languageDetector_exports = {};
__export(languageDetector_exports, {
  I18CLILanguageDetector: () => I18CLILanguageDetector,
  getLocaleLanguage: () => getLocaleLanguage
});
module.exports = __toCommonJS(languageDetector_exports);
class I18CLILanguageDetector {
  formatShellLocale(rawLC) {
    if (!rawLC) {
      return "";
    }
    const LCs = rawLC.split(":");
    const LC = LCs[0].split(".")[0].split("_")[0].split("-")[0];
    if (LC === "C") {
      return "";
    }
    return LC;
  }
  detect() {
    var _process_env_LC_ALL, _ref, _ref1, _ref2;
    const shellLocale = (_ref2 = (_ref1 = (_ref = (_process_env_LC_ALL = process.env.LC_ALL) !== null && _process_env_LC_ALL !== void 0 ? _process_env_LC_ALL : process.env.LC_MESSAGES) !== null && _ref !== void 0 ? _ref : process.env.LANG) !== null && _ref1 !== void 0 ? _ref1 : process.env.LANGUAGE) !== null && _ref2 !== void 0 ? _ref2 : Intl.DateTimeFormat().resolvedOptions().locale;
    return this.formatShellLocale(shellLocale);
  }
}
function getLocaleLanguage() {
  const detector = new I18CLILanguageDetector();
  return detector.detect();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  I18CLILanguageDetector,
  getLocaleLanguage
});
