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
  TemplateApi: () => TemplateApi
});
module.exports = __toCommonJS(template_exports);
var import_constants = require("../../constants");
class TemplateApi {
  set(content) {
    this.body = content;
  }
  get() {
    return this.body;
  }
  prependHead(fragment) {
    const { head } = import_constants.REPLACE_REG.before;
    this.replaceBody(new RegExp(head), (beforeHead) => `${beforeHead}${fragment}`);
  }
  appendHead(fragment) {
    const { head } = import_constants.REPLACE_REG.after;
    this.replaceBody(head, () => `${fragment}${head}`);
  }
  prependBody(fragment) {
    const { body } = import_constants.REPLACE_REG.before;
    this.replaceBody(new RegExp(body), (beforeBody) => `${beforeBody}${fragment}`);
  }
  appendBody(fragment) {
    const { body } = import_constants.REPLACE_REG.after;
    this.replaceBody(body, () => `${fragment}${body}`);
  }
  replaceBody(searchValue, replaceCb) {
    this.body = this.body.replace(searchValue, replaceCb);
  }
  constructor(body) {
    this.body = body;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TemplateApi
});
