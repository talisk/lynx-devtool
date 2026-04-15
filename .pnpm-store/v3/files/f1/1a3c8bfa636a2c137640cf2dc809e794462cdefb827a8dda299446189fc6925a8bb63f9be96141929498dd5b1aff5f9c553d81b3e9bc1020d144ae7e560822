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
var ModuleScopePlugin_exports = {};
__export(ModuleScopePlugin_exports, {
  ModuleScopePlugin: () => ModuleScopePlugin
});
module.exports = __toCommonJS(ModuleScopePlugin_exports);
var import_path = require("path");
var import_utils = require("@modern-js/utils");
var import_picocolors = __toESM(require("picocolors"));
class ModuleScopePlugin {
  apply(resolver) {
    const { allowedFiles, allowedDirs, allowedPatterns, relativeAllowedDirs } = this;
    resolver.hooks.file.tapAsync("ModuleScopePlugin", (request, _context, callback) => {
      const { issuer } = request.context;
      if (!issuer || this.cache.get(issuer)) {
        return callback();
      }
      this.cache.set(issuer, true);
      if (
        // If this resolves to a node_module, we don't care what happens next
        request.descriptionFileRoot.indexOf("/node_modules/") !== -1 || request.descriptionFileRoot.indexOf("\\node_modules\\") !== -1 || !request.__innerRequest_request
      ) {
        return callback();
      }
      if (allowedDirs.every((allowedDir) => {
        const result = (0, import_path.relative)(allowedDir, issuer);
        return result.startsWith("../") || result.startsWith("..\\");
      })) {
        return callback();
      }
      const requestFullPath = (0, import_path.resolve)((0, import_path.dirname)(issuer), request.__innerRequest_request);
      if (allowedPatterns.some((allowedPattern) => allowedPattern.test(requestFullPath))) {
        return callback();
      }
      if (allowedFiles.has(requestFullPath)) {
        return callback();
      }
      if (allowedDirs.every((allowedDir) => {
        const requestRelative = (0, import_path.relative)(allowedDir, requestFullPath);
        return requestRelative.startsWith("../") || requestRelative.startsWith("..\\");
      })) {
        let message = `You attempted to import ${import_picocolors.default.bold(request.__innerRequest_request)} which is not allowed. `;
        if (allowedDirs.length) {
          message += `Allowed dirs: ${import_picocolors.default.bold(relativeAllowedDirs.join(","))}. `;
        }
        if (allowedPatterns.length) {
          message += `Allowed patterns: ${import_picocolors.default.bold(allowedPatterns.map((p) => p.toString()).join(","))}. `;
        }
        message += `Please check the source.moduleScopes configuration.`;
        const scopeError = new Error(message);
        Object.defineProperty(scopeError, "ModuleScopePlugin", {
          value: true,
          writable: false,
          enumerable: false
        });
        this.cache.set(issuer, false);
        return callback(scopeError, request);
      } else {
        return callback();
      }
    });
  }
  constructor({ scopes, allowedFiles = [] }) {
    this.scopes = scopes;
    this.allowedFiles = new Set(allowedFiles);
    this.allowedDirs = scopes.filter(import_utils.isString);
    this.allowedPatterns = scopes.filter(import_utils.isRegExp);
    this.relativeAllowedDirs = this.allowedDirs.map((allowedDir) => `${(0, import_path.relative)((0, import_path.dirname)(allowedDir), allowedDir)}/`);
    this.cache = /* @__PURE__ */ new Map();
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ModuleScopePlugin
});
