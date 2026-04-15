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
var pluginLockCorejsVersion_exports = {};
__export(pluginLockCorejsVersion_exports, {
  default: () => pluginLockCorejsVersion_default,
  getCoreJsVersion: () => getCoreJsVersion
});
module.exports = __toCommonJS(pluginLockCorejsVersion_exports);
var import_node_fs = require("node:fs");
var import_node_path = __toESM(require("node:path"));
var t = __toESM(require("@babel/types"));
const CORE_JS_PKG_PATH = require.resolve("core-js/package.json");
const REWRITE_TARGETS = {
  "@babel/runtime": import_node_path.default.dirname(require.resolve("@babel/runtime/package.json")),
  "core-js": import_node_path.default.dirname(CORE_JS_PKG_PATH)
};
const matchedKey = (value) => Object.keys(REWRITE_TARGETS).find((name) => value.startsWith(`${name}/`));
const getCoreJsVersion = () => {
  try {
    const { version } = JSON.parse((0, import_node_fs.readFileSync)(CORE_JS_PKG_PATH, "utf-8"));
    const [major, minor] = version.split(".");
    return `${major}.${minor}`;
  } catch (err) {
    return "3";
  }
};
var pluginLockCorejsVersion_default = (_) => {
  return {
    post({ path }) {
      for (const node of path.node.body) {
        if (t.isImportDeclaration(node)) {
          const key = matchedKey(node.source.value);
          if (key) {
            node.source.value = node.source.value.replace(new RegExp(`^${key}\\/`), `${REWRITE_TARGETS[key]}/`);
          }
        } else if (t.isExpressionStatement(node) && t.isCallExpression(node.expression)) {
          const { callee } = node.expression;
          const source = node.expression.arguments[0];
          if (t.isIdentifier(callee) && callee.name === "require") {
            const key = matchedKey(source.value);
            if (key) {
              source.value = source.value.replace(new RegExp(`^${key}\\/`), `${REWRITE_TARGETS[key]}/`);
            }
          }
        }
      }
    }
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getCoreJsVersion
});
