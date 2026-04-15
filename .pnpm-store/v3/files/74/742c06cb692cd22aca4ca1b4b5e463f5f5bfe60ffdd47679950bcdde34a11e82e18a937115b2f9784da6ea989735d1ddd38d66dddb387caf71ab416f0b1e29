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
var helmet_exports = {};
__export(helmet_exports, {
  createReplaceHelemt: () => createReplaceHelemt,
  helmetReplace: () => helmetReplace
});
module.exports = __toCommonJS(helmet_exports);
var import_os = require("os");
var import_utils = require("./utils");
const RE_HTML_ATTR = /<html[^>]*>/;
const RE_BODY_ATTR = /<body[^>]*>/;
const RE_LAST_IN_HEAD = /<\/head>/;
const RE_TITLE = /<title[^>]*>([\s\S\n\r]*?)<\/title>/;
const TEST_TITLE_CONTENT = RegExp("(?<=<title[^>]*>)([\\s\\S\\n\\r]*?)([.|\\S])([\\s\\S\\n\\r]*?)(?=<\\/title>)");
function createReplaceHelemt(helmetData) {
  return helmetData ? (template) => helmetReplace(template, helmetData) : (tempalte) => tempalte;
}
function helmetReplace(content, helmetData) {
  let result = content;
  const bodyAttributes = helmetData.bodyAttributes.toString();
  if (bodyAttributes) {
    result = (0, import_utils.safeReplace)(result, RE_BODY_ATTR, `<body ${bodyAttributes}>`);
  }
  const htmlAttributes = helmetData.htmlAttributes.toString();
  if (htmlAttributes) {
    result = (0, import_utils.safeReplace)(result, RE_HTML_ATTR, `<html ${htmlAttributes}>`);
  }
  const base = helmetData.base.toString();
  const link = helmetData.link.toString();
  const meta = helmetData.meta.toString();
  const noscript = helmetData.noscript.toString();
  const script = helmetData.script.toString();
  const style = helmetData.style.toString();
  const title = helmetData.title.toString();
  const existTitleTag = RE_TITLE.test(content);
  const shouldReplaceTitle = existTitleTag && TEST_TITLE_CONTENT.test(title.trim());
  if (shouldReplaceTitle) {
    result = (0, import_utils.safeReplace)(result, RE_TITLE, title);
  }
  const helmetStr = [
    base,
    link,
    meta,
    noscript,
    script,
    style,
    !existTitleTag ? title : ""
  ].reduce((pre, cur) => {
    return pre + (cur.length > 0 ? `  ${cur}${import_os.EOL}` : "");
  }, "");
  return (0, import_utils.safeReplace)(result, RE_LAST_IN_HEAD, `${helmetStr}</head>`);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createReplaceHelemt,
  helmetReplace
});
