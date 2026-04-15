import * as os from "os";
import path, { dirname, posix } from "path";
import { createMatchPath } from "@modern-js/utils/tsconfig-paths";
import * as ts from "typescript";
const isRegExpKey = (str) => {
  return str.startsWith("^") || str.endsWith("$");
};
const resolveAliasPath = (baseUrl, filePath) => {
  if (filePath.startsWith(".") || filePath.startsWith("..")) {
    return path.resolve(baseUrl, filePath);
  }
  return filePath;
};
const createAliasMatcher = (baseUrl, alias) => {
  const aliasPairs = Object.keys(alias).reduce((o, key) => {
    if (isRegExpKey(key)) {
      const regexp = new RegExp(key);
      const aliasPath = resolveAliasPath(baseUrl, alias[key]);
      o.push([
        regexp,
        aliasPath
      ]);
    } else {
      const aliasPath = resolveAliasPath(baseUrl, alias[key]);
      o.push([
        key,
        aliasPath
      ]);
    }
    return o;
  }, []);
  const cacheMap = /* @__PURE__ */ new Map();
  return (requestedModule) => {
    if (cacheMap.has(requestedModule)) {
      return cacheMap.get(requestedModule);
    }
    for (const [key, value] of aliasPairs) {
      if (key instanceof RegExp) {
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
  };
};
const isDynamicImport = (tsBinary, node) => {
  return tsBinary.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword;
};
function tsconfigPathsBeforeHookFactory(tsBinary, baseUrl, paths) {
  const tsPaths = {};
  const alias = {};
  Object.keys(paths).forEach((key) => {
    if (Array.isArray(paths[key])) {
      tsPaths[key] = paths[key];
    } else {
      alias[key] = paths[key];
    }
  });
  const matchAliasPath = createAliasMatcher(baseUrl, alias);
  const matchTsPath = createMatchPath(baseUrl, tsPaths, [
    "main"
  ]);
  const matchPath = (requestedModule, readJSONSync, fileExists, extensions) => {
    const result = matchTsPath(requestedModule, readJSONSync, fileExists, extensions);
    if (result) {
      return result;
    }
    return matchAliasPath(requestedModule);
  };
  if (Object.keys(paths).length === 0) {
    return void 0;
  }
  return (ctx) => {
    return (sf) => {
      const visitNode = (node) => {
        if (isDynamicImport(tsBinary, node)) {
          const importPathWithQuotes = node.arguments[0].getText(sf);
          const text = importPathWithQuotes.slice(1, importPathWithQuotes.length - 1);
          const result = getNotAliasedPath(sf, matchPath, text);
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
            const importPathWithQuotes = node === null || node === void 0 ? void 0 : (_node_moduleSpecifier = node.moduleSpecifier) === null || _node_moduleSpecifier === void 0 ? void 0 : _node_moduleSpecifier.getText();
            if (!importPathWithQuotes) {
              return node;
            }
            const text = importPathWithQuotes.substring(1, importPathWithQuotes.length - 1);
            const result = getNotAliasedPath(sf, matchPath, text);
            if (!result) {
              return node;
            }
            const moduleSpecifier = tsBinary.factory.createStringLiteral(result);
            moduleSpecifier.parent = node.moduleSpecifier.parent;
            let newNode;
            if (tsBinary.isImportDeclaration(node)) {
              newNode = tsBinary.factory.updateImportDeclaration(node, node.modifiers, node.importClause, moduleSpecifier, node.assertClause);
            } else {
              newNode = tsBinary.factory.updateExportDeclaration(node, node.modifiers, node.isTypeOnly, node.exportClause, moduleSpecifier, node.assertClause);
            }
            newNode.flags = node.flags;
            return newNode;
          } catch {
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
  let result = matcher(text, void 0, void 0, [
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
        const packagePath = require.resolve(result, {
          paths: [
            process.cwd(),
            ...module.paths
          ]
        });
        if (packagePath) {
          return result;
        }
      } catch {
      }
    }
    try {
      const packagePath = require.resolve(text, {
        paths: [
          process.cwd(),
          ...module.paths
        ]
      });
      if (packagePath) {
        return text;
      }
    } catch {
    }
  }
  const resolvedPath = posix.relative(dirname(sf.fileName), result) || "./";
  return resolvedPath[0] === "." ? resolvedPath : `./${resolvedPath}`;
}
export {
  tsconfigPathsBeforeHookFactory
};
