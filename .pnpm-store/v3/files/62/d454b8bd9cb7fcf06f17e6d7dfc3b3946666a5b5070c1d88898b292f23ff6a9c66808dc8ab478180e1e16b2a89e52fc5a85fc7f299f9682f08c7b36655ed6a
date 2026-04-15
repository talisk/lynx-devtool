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
var fileReader_exports = {};
__export(fileReader_exports, {
  initFileReader: () => initFileReader
});
module.exports = __toCommonJS(fileReader_exports);
var import_fileReader = require("@modern-js/runtime-utils/fileReader");
const initFileReader = () => {
  let isInit = false;
  return async (ctx, next) => {
    var _res_locals;
    if (isInit) {
      return next();
    }
    isInit = true;
    const { res } = ctx.env.node;
    if (!((_res_locals = res.locals) === null || _res_locals === void 0 ? void 0 : _res_locals.webpack)) {
      import_fileReader.fileReader.reset();
      return next();
    }
    const { devMiddleware: webpackDevMid } = res.locals.webpack;
    const { outputFileSystem } = webpackDevMid;
    if (outputFileSystem) {
      import_fileReader.fileReader.reset(outputFileSystem);
    } else {
      import_fileReader.fileReader.reset();
    }
    return next();
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  initFileReader
});
