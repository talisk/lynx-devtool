import { _ as _class_call_check } from "@swc/helpers/_/_class_call_check";
var I18CLILanguageDetector = /* @__PURE__ */ function() {
  "use strict";
  function I18CLILanguageDetector2() {
    _class_call_check(this, I18CLILanguageDetector2);
  }
  var _proto = I18CLILanguageDetector2.prototype;
  _proto.formatShellLocale = function formatShellLocale(rawLC) {
    if (!rawLC) {
      return "";
    }
    var LCs = rawLC.split(":");
    var LC = LCs[0].split(".")[0].split("_")[0].split("-")[0];
    if (LC === "C") {
      return "";
    }
    return LC;
  };
  _proto.detect = function detect() {
    var _process_env_LC_ALL, _ref, _ref1, _ref2;
    var shellLocale = (_ref2 = (_ref1 = (_ref = (_process_env_LC_ALL = process.env.LC_ALL) !== null && _process_env_LC_ALL !== void 0 ? _process_env_LC_ALL : process.env.LC_MESSAGES) !== null && _ref !== void 0 ? _ref : process.env.LANG) !== null && _ref1 !== void 0 ? _ref1 : process.env.LANGUAGE) !== null && _ref2 !== void 0 ? _ref2 : Intl.DateTimeFormat().resolvedOptions().locale;
    return this.formatShellLocale(shellLocale);
  };
  return I18CLILanguageDetector2;
}();
function getLocaleLanguage() {
  var detector = new I18CLILanguageDetector();
  return detector.detect();
}
export {
  I18CLILanguageDetector,
  getLocaleLanguage
};
