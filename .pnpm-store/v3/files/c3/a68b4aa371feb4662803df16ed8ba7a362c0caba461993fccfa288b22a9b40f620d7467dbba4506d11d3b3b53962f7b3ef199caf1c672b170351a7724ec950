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
var template_exports = {};
__export(template_exports, {
  getTemplates: () => getTemplates
});
module.exports = __toCommonJS(template_exports);
var import_afterTemplate = require("./afterTemplate");
var import_beforeTemplate = require("./beforeTemplate");
const HTML_SEPARATOR = "<!--<?- html ?>-->";
const getTemplates = async (htmlTemplate, options) => {
  const [beforeAppTemplate = "", afterAppHtmlTemplate = ""] = htmlTemplate.split(HTML_SEPARATOR) || [];
  const builtBeforeTemplate = await (0, import_beforeTemplate.buildShellBeforeTemplate)(beforeAppTemplate, options);
  const builtAfterTemplate = await (0, import_afterTemplate.buildShellAfterTemplate)(afterAppHtmlTemplate, options);
  return {
    shellBefore: builtBeforeTemplate,
    shellAfter: builtAfterTemplate
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getTemplates
});
