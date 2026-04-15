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
var compilerErrorResult_exports = {};
__export(compilerErrorResult_exports, {
  CompilerErrorResult: () => CompilerErrorResult
});
module.exports = __toCommonJS(compilerErrorResult_exports);
class CompilerErrorResult {
  init(initErrorResult) {
    this._messageDetails = (initErrorResult === null || initErrorResult === void 0 ? void 0 : initErrorResult.messageDetails) || [];
  }
  update(messageDetails) {
    for (const messageDetail of messageDetails) {
      const addError = !this._messageDetails.some((detail) => {
        if (detail.filename === messageDetail.filename) {
          detail.content = messageDetail.content;
          return true;
        }
        return false;
      });
      if (addError) {
        this._messageDetails.push(messageDetail);
      }
    }
  }
  removeByFileName(filename) {
    this._messageDetails = this._messageDetails.filter((detail) => detail.filename !== filename);
  }
  get value() {
    var _this__messageDetails;
    return {
      code: 1,
      message: `Compilation failure ${(_this__messageDetails = this._messageDetails) === null || _this__messageDetails === void 0 ? void 0 : _this__messageDetails.length} files with Babel.`,
      messageDetails: this._messageDetails
    };
  }
  checkExistError() {
    return this._messageDetails.length > 0;
  }
  constructor(initErrorResult) {
    this.init(initErrorResult);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CompilerErrorResult
});
