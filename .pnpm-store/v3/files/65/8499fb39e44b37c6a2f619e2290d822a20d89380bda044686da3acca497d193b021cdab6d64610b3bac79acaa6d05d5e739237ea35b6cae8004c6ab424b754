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
var isDefaultExportFunction_exports = {};
__export(isDefaultExportFunction_exports, {
  isDefaultExportFunction: () => isDefaultExportFunction
});
module.exports = __toCommonJS(isDefaultExportFunction_exports);
var import_fs = __toESM(require("fs"));
var import_parser = require("@babel/parser");
var import_traverse = __toESM(require("@babel/traverse"));
var t = __toESM(require("@babel/types"));
const isFunction = (node) => t.isFunctionDeclaration(node) || t.isFunctionExpression(node) || t.isArrowFunctionExpression(node);
const isDefaultExportFunction = (file) => {
  if (!file || !import_fs.default.existsSync(file)) {
    return false;
  }
  const ast = (0, import_parser.parse)(import_fs.default.readFileSync(file, "utf8"), {
    sourceType: "unambiguous",
    plugins: [
      "jsx",
      "typescript",
      "classProperties",
      "dynamicImport",
      "exportDefaultFrom",
      "exportNamespaceFrom",
      "decorators-legacy",
      "functionBind",
      "classPrivateMethods",
      [
        "pipelineOperator",
        {
          proposal: "minimal"
        }
      ],
      "optionalChaining",
      "optionalCatchBinding",
      "objectRestSpread",
      "numericSeparator"
    ]
  });
  let isExportFunction = false;
  (0, import_traverse.default)(ast, {
    ExportDefaultDeclaration: (path) => {
      const { declaration } = path.node;
      if (isFunction(declaration)) {
        isExportFunction = true;
      }
    }
  });
  return isExportFunction;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isDefaultExportFunction
});
