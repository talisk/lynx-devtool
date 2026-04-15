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
var inits_exports = {};
__export(inits_exports, {
  createBuilderModuleScope: () => createBuilderModuleScope,
  initHtmlConfig: () => initHtmlConfig,
  initSourceConfig: () => initSourceConfig
});
module.exports = __toCommonJS(inits_exports);
var import_path = __toESM(require("path"));
var import_utils = require("@modern-js/utils");
function initHtmlConfig(config, appContext) {
  const ICON_EXTENSIONS = [
    "png",
    "jpg",
    "jpeg",
    "svg",
    "ico"
  ];
  config.html.appIcon = createBuilderAppIcon(config, appContext);
  config.html.favicon = createBuilderFavicon(config, appContext);
  return config.html;
  function createBuilderAppIcon(config2, appContext2) {
    const { appIcon } = config2.html;
    const { configDir } = config2.source;
    const getDefaultAppIcon = () => (0, import_utils.findExists)(ICON_EXTENSIONS.map((ext) => import_path.default.resolve(appContext2.appDirectory, configDir || "./config", `icon.${ext}`)));
    return appIcon || getDefaultAppIcon() || void 0;
  }
  function createBuilderFavicon(config2, appContext2) {
    const { configDir } = config2.source;
    const { favicon } = config2.html;
    const getDefaultFavicon = () => (0, import_utils.findExists)(ICON_EXTENSIONS.map((ext) => import_path.default.resolve(appContext2.appDirectory, configDir || "./config", `favicon.${ext}`)));
    return favicon || getDefaultFavicon() || void 0;
  }
}
function initSourceConfig(config, appContext, bundler) {
  config.source.include = createBuilderInclude(config, appContext);
  if (bundler === "webpack") {
    config.source.moduleScopes = createBuilderModuleScope(config);
  }
}
function createBuilderInclude(config, appContext) {
  const { include } = config.source;
  const defaultInclude = [
    appContext.internalDirectory
  ];
  const transformInclude = (include || []).map((include2) => {
    if (typeof include2 === "string") {
      if ((0, import_path.isAbsolute)(include2)) {
        return include2;
      }
      return new RegExp(include2);
    }
    return include2;
  }).concat(defaultInclude);
  return transformInclude;
}
function createBuilderModuleScope(config) {
  const { moduleScopes } = config.source;
  if (moduleScopes) {
    const DEFAULT_SCOPES = [
      "./src",
      "./shared",
      /node_modules/
    ];
    const builderModuleScope = applyScopeOptions(DEFAULT_SCOPES, moduleScopes);
    return builderModuleScope;
  } else {
    return void 0;
  }
  function isPrimitiveScope(items) {
    return items.every((item) => typeof item === "string" || Object.prototype.toString.call(item) === "[object RegExp]");
  }
  function applyScopeOptions(defaults, options) {
    if (Array.isArray(options)) {
      if (isPrimitiveScope(options)) {
        return defaults.concat(options);
      }
      return options.reduce(applyScopeOptions, defaults);
    }
    return options(defaults) || defaults;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createBuilderModuleScope,
  initHtmlConfig,
  initSourceConfig
});
