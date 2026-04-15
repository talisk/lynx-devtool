import { _ as _class_call_check } from "@swc/helpers/_/_class_call_check";
import { get } from "@modern-js/utils/lodash";
import { getObjKeyMap } from "./utils";
var I18n = /* @__PURE__ */ function() {
  "use strict";
  function I18n2() {
    _class_call_check(this, I18n2);
    this.language = "en";
    this.languageMap = {};
  }
  var _proto = I18n2.prototype;
  _proto.format = function format(msg, vars) {
    return msg.replace(/\{(\w+)\}/g, function(_match, capture) {
      return Object.prototype.hasOwnProperty.call(vars, capture) ? vars[capture] : capture;
    });
  };
  _proto.getMessage = function getMessage(lang, key, vars, fallbackText) {
    var languages = Object.keys(this.languageMap);
    var resultLang = languages.find(function(l) {
      return l === lang;
    });
    if (!resultLang && languages.length === 0) {
      return fallbackText || key;
    }
    var model = this.languageMap[resultLang || "en"];
    if (!model) {
      return fallbackText || key;
    }
    var message = get(model, key);
    var value = message || fallbackText || key;
    if (typeof value === "string") {
      return this.format(value, vars || {});
    }
    throw new Error("key is not a string");
  };
  _proto.init = function init(language, languageMap) {
    this.language = language || "en";
    if (languageMap) {
      this.languageMap = languageMap;
    }
    return getObjKeyMap(this.languageMap[this.language]);
  };
  _proto.changeLanguage = function changeLanguage(config) {
    this.language = config.locale || "en";
  };
  _proto.t = function t(key, vars, fallbackText) {
    return this.getMessage(this.language, key, vars, fallbackText);
  };
  _proto.lang = function lang(lang) {
    var _this = this;
    return {
      t: function(key, vars, fallbackText) {
        return _this.getMessage(lang, key, vars, fallbackText);
      }
    };
  };
  return I18n2;
}();
export {
  I18n
};
