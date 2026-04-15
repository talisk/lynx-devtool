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
var Style_exports = {};
__export(Style_exports, {
  Style: () => Style
});
module.exports = __toCommonJS(Style_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_constants = require("./constants");
function Style(props) {
  const { content, children } = props;
  const contentStr = children || content;
  const styleContent = encodeURIComponent(`${contentStr}`);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
    children: [
      `${import_constants.DOCUMENT_STYLE_PLACEHOLDER_START}`,
      `${styleContent}`,
      `${import_constants.DOCUMENT_STYLE_PLACEHOLDER_END}`
    ]
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Style
});
