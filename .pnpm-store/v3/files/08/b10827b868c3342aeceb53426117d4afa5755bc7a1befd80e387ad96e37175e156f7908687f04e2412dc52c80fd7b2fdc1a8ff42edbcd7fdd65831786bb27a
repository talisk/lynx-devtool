import { get } from "@modern-js/utils/lodash";
import { getObjKeyMap } from "./utils";
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
    const message = get(model, key);
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
    return getObjKeyMap(this.languageMap[this.language]);
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
export {
  I18n
};
