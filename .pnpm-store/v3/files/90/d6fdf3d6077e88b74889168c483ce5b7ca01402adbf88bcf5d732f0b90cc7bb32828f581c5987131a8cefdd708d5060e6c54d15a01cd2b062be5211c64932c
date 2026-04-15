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
var common_exports = {};
__export(common_exports, {
  ESCAPED_SHELL_STREAM_END_MARK: () => ESCAPED_SHELL_STREAM_END_MARK,
  JSX_SHELL_STREAM_END_MARK: () => JSX_SHELL_STREAM_END_MARK,
  isBrowser: () => isBrowser
});
module.exports = __toCommonJS(common_exports);
const isBrowser = () => typeof window !== "undefined" && window.name !== "nodejs";
const JSX_SHELL_STREAM_END_MARK = "<!--<?- SHELL_STREAM_END ?>-->";
const ESCAPED_SHELL_STREAM_END_MARK = "&lt;!--&lt;?- SHELL_STREAM_END ?&gt;--&gt;";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ESCAPED_SHELL_STREAM_END_MARK,
  JSX_SHELL_STREAM_END_MARK,
  isBrowser
});
