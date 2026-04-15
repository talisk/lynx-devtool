"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var import_buffer = require("buffer");
var import_crypto = __toESM(require("crypto"));
var t = __toESM(require("@babel/types"));
var import_lodash = require("@modern-js/utils/lodash");
const RUNTIME_PACKAGE_NAMES = [
  "@modern-js/runtime"
];
const FUNCTION_USE_LOADER_NAME = "useLoader";
function getHash(filepath) {
  const cwd = process.cwd();
  const point = filepath.indexOf(cwd);
  let relativePath = filepath;
  if (point !== -1) {
    relativePath = filepath.substring(point + cwd.length);
  }
  const fileBuf = import_buffer.Buffer.from(relativePath);
  const fsHash = import_crypto.default.createHash("md5");
  const md5 = fsHash.update(fileBuf).digest("hex");
  return md5;
}
function getUseLoaderPath(path, calleeName) {
  const { node } = path;
  if (!calleeName || node.callee.name !== calleeName) {
    return false;
  }
  const arg1 = (0, import_lodash.get)(node, "arguments.0");
  if (t.isFunction(arg1) || t.isFunctionExpression(arg1) || t.isArrowFunctionExpression(arg1) || t.isIdentifier(arg1) || t.isCallExpression(arg1) || t.isMemberExpression(arg1)) {
    const loaderPath = path.get("arguments.0");
    if (isDuplicateInnerLoader(loaderPath)) {
      return false;
    } else {
      return loaderPath;
    }
  }
  console.warn("useLoader 中 loaderId 生成失败，请检查 useLoader");
  throw path.buildCodeFrameError(`
    please check the usage of ${path.node.name}
  `);
}
function isDuplicateInnerLoader(path) {
  const { node } = path;
  if (t.isFunctionExpression(node.callee)) {
    if (t.isBlockStatement(node.callee.body)) {
      if ((0, import_lodash.get)(node.callee.body, "body.0.declarations.0.id.name") === "innerLoader" && (0, import_lodash.get)(node.callee.body, "body.2.argument.name") === "innerLoader") {
        return true;
      }
    }
  }
  return false;
}
function getSelfRunLoaderExpression(loaderExpression, id) {
  return t.callExpression(t.functionExpression(null, [], t.blockStatement([
    t.variableDeclaration("var", [
      t.variableDeclarator(t.identifier("innerLoader"), loaderExpression)
    ]),
    t.expressionStatement(t.assignmentExpression("=", t.memberExpression(t.identifier("innerLoader"), t.identifier("id")), t.stringLiteral(id))),
    t.returnStatement(t.identifier("innerLoader"))
  ])), []);
}
module.exports = function() {
  let useLoader = null;
  let hash = "";
  let index = 0;
  function genId() {
    return `${hash}_${index++}`;
  }
  return {
    name: "babel-plugin-ssr-loader-id",
    pre() {
      index = 0;
      useLoader = null;
      hash = "";
    },
    visitor: {
      ImportDeclaration(path, state) {
        if (useLoader) {
          return false;
        }
        if (!RUNTIME_PACKAGE_NAMES.includes((0, import_lodash.get)(path, "node.source.value"))) {
          return false;
        }
        hash = getHash(state.file.opts.filename);
        (0, import_lodash.get)(path, "node.specifiers", []).forEach(({ imported, local }) => {
          if (!imported) {
            throw path.buildCodeFrameError(`please \`import { useLoader } from ${RUNTIME_PACKAGE_NAMES[0]}\``);
          }
          if (!useLoader && imported.name === FUNCTION_USE_LOADER_NAME) {
            useLoader = local.name;
          }
        });
        return false;
      },
      CallExpression(path) {
        let loaderPath = getUseLoaderPath(path, useLoader);
        if (loaderPath) {
          if (!Array.isArray(loaderPath)) {
            loaderPath = [
              loaderPath
            ];
          }
          loaderPath.forEach((p) => {
            p.replaceWith(getSelfRunLoaderExpression(p.node, genId()));
          });
          return false;
        }
        return false;
      }
    }
  };
};
