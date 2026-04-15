var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
import { Buffer as Buffer2 } from "buffer";
import crypto from "crypto";
import * as t from "@babel/types";
import { get } from "@modern-js/utils/lodash";
var require_babel_plugin_ssr_loader_id = __commonJS({
  "src/cli/ssr/babel-plugin-ssr-loader-id.ts"(exports, module) {
    var RUNTIME_PACKAGE_NAMES = [
      "@modern-js/runtime"
    ];
    var FUNCTION_USE_LOADER_NAME = "useLoader";
    function getHash(filepath) {
      var cwd = process.cwd();
      var point = filepath.indexOf(cwd);
      var relativePath = filepath;
      if (point !== -1) {
        relativePath = filepath.substring(point + cwd.length);
      }
      var fileBuf = Buffer2.from(relativePath);
      var fsHash = crypto.createHash("md5");
      var md5 = fsHash.update(fileBuf).digest("hex");
      return md5;
    }
    function getUseLoaderPath(path, calleeName) {
      var node = path.node;
      if (!calleeName || node.callee.name !== calleeName) {
        return false;
      }
      var arg1 = get(node, "arguments.0");
      if (t.isFunction(arg1) || t.isFunctionExpression(arg1) || t.isArrowFunctionExpression(arg1) || t.isIdentifier(arg1) || t.isCallExpression(arg1) || t.isMemberExpression(arg1)) {
        var loaderPath = path.get("arguments.0");
        if (isDuplicateInnerLoader(loaderPath)) {
          return false;
        } else {
          return loaderPath;
        }
      }
      console.warn("useLoader 中 loaderId 生成失败，请检查 useLoader");
      throw path.buildCodeFrameError("\n    please check the usage of ".concat(path.node.name, "\n  "));
    }
    function isDuplicateInnerLoader(path) {
      var node = path.node;
      if (t.isFunctionExpression(node.callee)) {
        if (t.isBlockStatement(node.callee.body)) {
          if (get(node.callee.body, "body.0.declarations.0.id.name") === "innerLoader" && get(node.callee.body, "body.2.argument.name") === "innerLoader") {
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
      var useLoader = null;
      var hash = "";
      var index = 0;
      function genId() {
        return "".concat(hash, "_").concat(index++);
      }
      return {
        name: "babel-plugin-ssr-loader-id",
        pre: function pre() {
          index = 0;
          useLoader = null;
          hash = "";
        },
        visitor: {
          ImportDeclaration: function ImportDeclaration(path, state) {
            if (useLoader) {
              return false;
            }
            if (!RUNTIME_PACKAGE_NAMES.includes(get(path, "node.source.value"))) {
              return false;
            }
            hash = getHash(state.file.opts.filename);
            get(path, "node.specifiers", []).forEach(function(param) {
              var imported = param.imported, local = param.local;
              if (!imported) {
                throw path.buildCodeFrameError("please `import { useLoader } from ".concat(RUNTIME_PACKAGE_NAMES[0], "`"));
              }
              if (!useLoader && imported.name === FUNCTION_USE_LOADER_NAME) {
                useLoader = local.name;
              }
            });
            return false;
          },
          CallExpression: function CallExpression(path) {
            var loaderPath = getUseLoaderPath(path, useLoader);
            if (loaderPath) {
              if (!Array.isArray(loaderPath)) {
                loaderPath = [
                  loaderPath
                ];
              }
              loaderPath.forEach(function(p) {
                p.replaceWith(getSelfRunLoaderExpression(p.node, genId()));
              });
              return false;
            }
            return false;
          }
        }
      };
    };
  }
});
export default require_babel_plugin_ssr_loader_id();
