import fs from "fs";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import * as t from "@babel/types";
var isFunction = function(node) {
  return t.isFunctionDeclaration(node) || t.isFunctionExpression(node) || t.isArrowFunctionExpression(node);
};
var isDefaultExportFunction = function(file) {
  if (!file || !fs.existsSync(file)) {
    return false;
  }
  var ast = parse(fs.readFileSync(file, "utf8"), {
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
  var isExportFunction = false;
  traverse(ast, {
    ExportDefaultDeclaration: function(path) {
      var declaration = path.node.declaration;
      if (isFunction(declaration)) {
        isExportFunction = true;
      }
    }
  });
  return isExportFunction;
};
export {
  isDefaultExportFunction
};
