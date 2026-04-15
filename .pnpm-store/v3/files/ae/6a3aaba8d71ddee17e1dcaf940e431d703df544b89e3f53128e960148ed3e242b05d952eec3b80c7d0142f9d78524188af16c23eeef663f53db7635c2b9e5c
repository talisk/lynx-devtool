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
var utils_exports = {};
__export(utils_exports, {
  JS_REGEX: () => JS_REGEX,
  NODE_MODULES_REGEX: () => NODE_MODULES_REGEX,
  RUNTIME_CHUNK_NAME: () => RUNTIME_CHUNK_NAME,
  SCRIPT_REGEX: () => SCRIPT_REGEX,
  SERVICE_WORKER_ENVIRONMENT_NAME: () => SERVICE_WORKER_ENVIRONMENT_NAME,
  TS_REGEX: () => TS_REGEX,
  applyScriptCondition: () => applyScriptCondition,
  castArray: () => castArray,
  getBrowserslistWithDefault: () => getBrowserslistWithDefault,
  getHash: () => getHash,
  getUseBuiltIns: () => getUseBuiltIns,
  isHtmlDisabled: () => isHtmlDisabled,
  isServerEnvironment: () => isServerEnvironment
});
module.exports = __toCommonJS(utils_exports);
var import_browserslist = __toESM(require("browserslist"));
const RUNTIME_CHUNK_NAME = "builder-runtime";
const SERVICE_WORKER_ENVIRONMENT_NAME = "workerSSR";
const JS_REGEX = /\.(?:js|mjs|cjs|jsx)$/;
const TS_REGEX = /\.(?:ts|mts|cts|tsx)$/;
const SCRIPT_REGEX = /\.(?:js|jsx|mjs|cjs|ts|tsx|mts|cts)$/;
const NODE_MODULES_REGEX = /[\\/]node_modules[\\/]/;
function isServerEnvironment(target, environment) {
  return target === "node" || environment === SERVICE_WORKER_ENVIRONMENT_NAME;
}
const castArray = (arr) => {
  if (arr === void 0) {
    return [];
  }
  return Array.isArray(arr) ? arr : [
    arr
  ];
};
const browsersListCache = /* @__PURE__ */ new Map();
async function getBrowserslist(path) {
  const env = process.env.NODE_ENV;
  const cacheKey = `${path}${env}`;
  if (browsersListCache.has(cacheKey)) {
    return browsersListCache.get(cacheKey);
  }
  const result = import_browserslist.default.loadConfig({
    path,
    env
  });
  if (result) {
    browsersListCache.set(cacheKey, result);
    return result;
  }
  return null;
}
const getUseBuiltIns = (config) => {
  const { polyfill } = config.output;
  if (polyfill === "off") {
    return false;
  }
  return polyfill;
};
function applyScriptCondition({ rule, chain, config, context, includes, excludes }) {
  rule.include.add({
    and: [
      context.rootPath,
      {
        not: NODE_MODULES_REGEX
      }
    ]
  });
  rule.include.add(/\.(?:ts|tsx|jsx|mts|cts)$/);
  const target = castArray(chain.get("target"));
  const legacyTarget = [
    "es5",
    "es6",
    "es2015",
    "es2016"
  ];
  if (legacyTarget.some((item) => target.includes(item))) {
    rule.include.add(/[\\/]@rsbuild[\\/]core[\\/]dist[\\/]/);
  }
  for (const condition of [
    ...includes,
    ...config.source.include || []
  ]) {
    rule.include.add(condition);
  }
  for (const condition of [
    ...excludes,
    ...config.source.exclude || []
  ]) {
    rule.exclude.add(condition);
  }
}
const isHtmlDisabled = (config, target) => {
  const { htmlPlugin } = config.tools;
  return htmlPlugin === false || Array.isArray(htmlPlugin) && htmlPlugin.includes(false) || target !== "web";
};
const getHash = (config) => {
  const { filenameHash } = config.output;
  if (typeof filenameHash === "string") {
    return filenameHash ? `.[${filenameHash}]` : "";
  }
  return filenameHash ? ".[contenthash:8]" : "";
};
const DEFAULT_WEB_BROWSERSLIST = [
  "> 0.01%",
  "not dead",
  "not op_mini all"
];
const DEFAULT_BROWSERSLIST = {
  web: DEFAULT_WEB_BROWSERSLIST,
  node: [
    "node >= 14"
  ],
  "web-worker": DEFAULT_WEB_BROWSERSLIST
};
async function getBrowserslistWithDefault(path, config, target) {
  const { overrideBrowserslist: overrides } = (config === null || config === void 0 ? void 0 : config.output) || {};
  if (target === "web" || target === "web-worker") {
    if (overrides) {
      return overrides;
    }
    const browserslistrc = await getBrowserslist(path);
    if (browserslistrc) {
      return browserslistrc;
    }
  }
  return DEFAULT_BROWSERSLIST[target];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  JS_REGEX,
  NODE_MODULES_REGEX,
  RUNTIME_CHUNK_NAME,
  SCRIPT_REGEX,
  SERVICE_WORKER_ENVIRONMENT_NAME,
  TS_REGEX,
  applyScriptCondition,
  castArray,
  getBrowserslistWithDefault,
  getHash,
  getUseBuiltIns,
  isHtmlDisabled,
  isServerEnvironment
});
