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
var moduleScopes_exports = {};
__export(moduleScopes_exports, {
  applyScopeChain: () => applyScopeChain,
  isPrimitiveScope: () => isPrimitiveScope,
  pluginModuleScopes: () => pluginModuleScopes
});
module.exports = __toCommonJS(moduleScopes_exports);
var import_path = __toESM(require("path"));
const ensureAbsolutePath = (base, filePath) => import_path.default.isAbsolute(filePath) ? filePath : import_path.default.resolve(base, filePath);
const isPrimitiveScope = (items) => items.every((item) => typeof item === "string" || Object.prototype.toString.call(item) === "[object RegExp]");
const applyScopeChain = (defaults, options) => {
  if (Array.isArray(options)) {
    if (isPrimitiveScope(options)) {
      return defaults.concat(options);
    }
    return options.reduce(applyScopeChain, defaults);
  }
  return options(defaults) || defaults;
};
const pluginModuleScopes = (moduleScopes) => ({
  name: "uni-builder:module-scopes",
  setup(api) {
    api.modifyBundlerChain(async (chain) => {
      if (!moduleScopes) {
        return;
      }
      const { ModuleScopePlugin } = await Promise.resolve().then(() => __toESM(require("../ModuleScopePlugin")));
      const scopes = applyScopeChain([], moduleScopes);
      const rootPackageJson = import_path.default.resolve(api.context.rootPath, "./package.json");
      const formattedScopes = scopes.map((scope) => {
        if (typeof scope === "string") {
          return ensureAbsolutePath(api.context.rootPath, scope);
        }
        return scope;
      });
      chain.resolve.plugin("module-scope").use(ModuleScopePlugin, [
        {
          scopes: formattedScopes,
          allowedFiles: [
            rootPackageJson
          ]
        }
      ]);
    });
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  applyScopeChain,
  isPrimitiveScope,
  pluginModuleScopes
});
