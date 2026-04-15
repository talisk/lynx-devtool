import { _ as _instanceof } from "@swc/helpers/_/_instanceof";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import { _ as _to_consumable_array } from "@swc/helpers/_/_to_consumable_array";
import * as os from "os";
import path, { dirname, posix } from "path";
import { createMatchPath } from "@modern-js/utils/tsconfig-paths";
import * as ts from "typescript";
var isRegExpKey = function(str) {
  return str.startsWith("^") || str.endsWith("$");
};
var resolveAliasPath = function(baseUrl, filePath) {
  if (filePath.startsWith(".") || filePath.startsWith("..")) {
    return path.resolve(baseUrl, filePath);
  }
  return filePath;
};
var createAliasMatcher = function(baseUrl, alias) {
  var aliasPairs = Object.keys(alias).reduce(function(o, key) {
    if (isRegExpKey(key)) {
      var regexp = new RegExp(key);
      var aliasPath = resolveAliasPath(baseUrl, alias[key]);
      o.push([
        regexp,
        aliasPath
      ]);
    } else {
      var aliasPath1 = resolveAliasPath(baseUrl, alias[key]);
      o.push([
        key,
        aliasPath1
      ]);
    }
    return o;
  }, []);
  var cacheMap = /* @__PURE__ */ new Map();
  return function(requestedModule) {
    if (cacheMap.has(requestedModule)) {
      return cacheMap.get(requestedModule);
    }
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
    try {
      for (var _iterator = aliasPairs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step_value = _sliced_to_array(_step.value, 2), key = _step_value[0], value = _step_value[1];
        if (_instanceof(key, RegExp)) {
          if (key.test(requestedModule)) {
            cacheMap.set(requestedModule, value);
            return value;
          }
        }
        if (requestedModule === key) {
          cacheMap.set(requestedModule, value);
          return value;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  };
};
var isDynamicImport = function(tsBinary, node) {
  return tsBinary.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword;
};
function tsconfigPathsBeforeHookFactory(tsBinary, baseUrl, paths) {
  var tsPaths = {};
  var alias = {};
  Object.keys(paths).forEach(function(key) {
    if (Array.isArray(paths[key])) {
      tsPaths[key] = paths[key];
    } else {
      alias[key] = paths[key];
    }
  });
  var matchAliasPath = createAliasMatcher(baseUrl, alias);
  var matchTsPath = createMatchPath(baseUrl, tsPaths, [
    "main"
  ]);
  var matchPath = function(requestedModule, readJSONSync, fileExists, extensions) {
    var result = matchTsPath(requestedModule, readJSONSync, fileExists, extensions);
    if (result) {
      return result;
    }
    return matchAliasPath(requestedModule);
  };
  if (Object.keys(paths).length === 0) {
    return void 0;
  }
  return function(ctx) {
    return function(sf) {
      var visitNode = function(node) {
        if (isDynamicImport(tsBinary, node)) {
          var importPathWithQuotes = node.arguments[0].getText(sf);
          var text = importPathWithQuotes.slice(1, importPathWithQuotes.length - 1);
          var result = getNotAliasedPath(sf, matchPath, text);
          if (!result) {
            return node;
          }
          return tsBinary.factory.updateCallExpression(node, node.expression, node.typeArguments, tsBinary.factory.createNodeArray([
            tsBinary.factory.createStringLiteral(result)
          ]));
        }
        if (tsBinary.isImportDeclaration(node) || tsBinary.isExportDeclaration(node) && node.moduleSpecifier) {
          try {
            var _node_moduleSpecifier;
            var importPathWithQuotes1 = node === null || node === void 0 ? void 0 : (_node_moduleSpecifier = node.moduleSpecifier) === null || _node_moduleSpecifier === void 0 ? void 0 : _node_moduleSpecifier.getText();
            if (!importPathWithQuotes1) {
              return node;
            }
            var text1 = importPathWithQuotes1.substring(1, importPathWithQuotes1.length - 1);
            var result1 = getNotAliasedPath(sf, matchPath, text1);
            if (!result1) {
              return node;
            }
            var moduleSpecifier = tsBinary.factory.createStringLiteral(result1);
            moduleSpecifier.parent = node.moduleSpecifier.parent;
            var newNode;
            if (tsBinary.isImportDeclaration(node)) {
              newNode = tsBinary.factory.updateImportDeclaration(node, node.modifiers, node.importClause, moduleSpecifier, node.assertClause);
            } else {
              newNode = tsBinary.factory.updateExportDeclaration(node, node.modifiers, node.isTypeOnly, node.exportClause, moduleSpecifier, node.assertClause);
            }
            newNode.flags = node.flags;
            return newNode;
          } catch (e) {
            return node;
          }
        }
        return tsBinary.visitEachChild(node, visitNode, ctx);
      };
      return tsBinary.visitNode(sf, visitNode);
    };
  };
}
function getNotAliasedPath(sf, matcher, text) {
  var result = matcher(text, void 0, void 0, [
    ".ts",
    ".tsx",
    ".js",
    ".jsx"
  ]);
  if (!result) {
    return;
  }
  if (os.platform() === "win32") {
    result = result.replace(/\\/g, "/");
  }
  if (!path.isAbsolute(result)) {
    if (!result.startsWith(".") && !result.startsWith("..")) {
      try {
        var packagePath = require.resolve(result, {
          paths: [
            process.cwd()
          ].concat(_to_consumable_array(module.paths))
        });
        if (packagePath) {
          return result;
        }
      } catch (e) {
      }
    }
    try {
      var packagePath1 = require.resolve(text, {
        paths: [
          process.cwd()
        ].concat(_to_consumable_array(module.paths))
      });
      if (packagePath1) {
        return text;
      }
    } catch (e) {
    }
  }
  var resolvedPath = posix.relative(dirname(sf.fileName), result) || "./";
  return resolvedPath[0] === "." ? resolvedPath : "./".concat(resolvedPath);
}
export {
  tsconfigPathsBeforeHookFactory
};
