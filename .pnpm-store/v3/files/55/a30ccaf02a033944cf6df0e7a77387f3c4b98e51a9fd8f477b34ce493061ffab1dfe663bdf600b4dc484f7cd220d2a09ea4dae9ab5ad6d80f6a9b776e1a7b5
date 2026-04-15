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
var createCopyPattern_exports = {};
__export(createCopyPattern_exports, {
  createPublicPattern: () => createPublicPattern,
  createUploadPattern: () => createUploadPattern
});
module.exports = __toCommonJS(createCopyPattern_exports);
var import_utils = require("@modern-js/utils");
var import_shared = require("../shared");
const minifiedJsRexExp = /\.min\.js/;
const info = (file) => ({
  // If the file name ends with `.min.js`, we assume it's a compressed file.
  // So we don't want copy-webpack-plugin to minify it.
  // ref: https://github.com/webpack-contrib/copy-webpack-plugin#info
  minimized: minifiedJsRexExp.test(file.sourceFilename)
});
function createPublicPattern(appContext, config, chain) {
  const { publicDir } = (0, import_shared.createCopyInfo)(appContext, config);
  return {
    info,
    from: "**/*",
    to: "public",
    context: publicDir,
    noErrorOnMissing: true,
    transform: (content, absoluteFrom) => {
      if (!/\.html?$/.test(absoluteFrom)) {
        return content;
      }
      return content.toString("utf8").replace(/<%=\s*assetPrefix\s*%>/g, (0, import_utils.removeTailSlash)(chain.output.get("publicPath")));
    }
  };
}
function createUploadPattern(appContext, config) {
  const { uploadDir } = (0, import_shared.createCopyInfo)(appContext, config);
  return {
    // rspack copy info structure is inconsistent with webpack, it only used in webpack mode
    // @ts-expect-error
    info,
    from: "**/*",
    to: "upload",
    context: uploadDir,
    noErrorOnMissing: true
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createPublicPattern,
  createUploadPattern
});
