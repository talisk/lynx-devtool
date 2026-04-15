"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var src_exports = {};
__export(src_exports, {
  HtmlWebpackPlugin: () => import_html_webpack_plugin.default,
  RUNTIME_CHUNK_NAME: () => import_utils.RUNTIME_CHUNK_NAME,
  SERVICE_WORKER_ENVIRONMENT_NAME: () => import_utils.SERVICE_WORKER_ENVIRONMENT_NAME,
  castArray: () => import_utils.castArray,
  createUniBuilder: () => createUniBuilder,
  isHtmlDisabled: () => import_utils.isHtmlDisabled,
  logger: () => import_core.logger
});
module.exports = __toCommonJS(src_exports);
var import_html_webpack_plugin = __toESM(require("html-webpack-plugin"));
var import_rspack = require("./rspack");
var import_webpack = require("./webpack");
var import_core = require("@rsbuild/core");
var import_utils = require("./shared/utils");
async function createUniBuilder(options) {
  return options.bundlerType === "rspack" ? (0, import_rspack.createRspackBuilder)(options) : (0, import_webpack.createWebpackBuilder)(options);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HtmlWebpackPlugin,
  RUNTIME_CHUNK_NAME,
  SERVICE_WORKER_ENVIRONMENT_NAME,
  castArray,
  createUniBuilder,
  isHtmlDisabled,
  logger
});
