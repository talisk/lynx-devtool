import { _ as _define_property } from "@swc/helpers/_/_define_property";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import path from "path";
import { getUserAlias } from "@modern-js/utils";
import { createMatchPath } from "@modern-js/utils/tsconfig-paths";
var resolvePath = require("@modern-js/babel-plugin-module-resolver").resolvePath;
var defaultPaths = {
  "@": [
    "./src"
  ]
};
var aliasPlugin = function(alias) {
  var absoluteBaseUrl = alias.absoluteBaseUrl, isTsPath = alias.isTsPath, _alias_isTsProject = alias.isTsProject, isTsProject = _alias_isTsProject === void 0 ? false : _alias_isTsProject;
  var mergedPaths = isTsPath ? alias.paths || {} : _object_spread({}, defaultPaths, alias.paths || {});
  var tsPaths = {};
  if (isTsProject) {
    tsPaths = getUserAlias(mergedPaths);
  }
  tsPaths = Object.keys(tsPaths).reduce(function(o, key) {
    if (typeof tsPaths[key] === "string") {
      return _object_spread_props(_object_spread({}, o), _define_property({}, "".concat(key), [
        tsPaths[key]
      ]));
    }
    return _object_spread_props(_object_spread({}, o), _define_property({}, "".concat(key), tsPaths[key]));
  }, {});
  var resolvePathFn = function(sourcePath, currentFile, opts) {
    if (sourcePath === "." || sourcePath === "./") {
      return sourcePath;
    }
    var matchPath = createMatchPath(absoluteBaseUrl, tsPaths, [
      "index"
    ]);
    var result = matchPath(sourcePath, void 0, void 0, [
      ".js",
      ".jsx",
      ".ts",
      ".tsx"
    ]);
    if (result) {
      var relativePath = path.relative(path.dirname(currentFile), path.dirname(result));
      var fileName = path.basename(result);
      var filePath = path.normalize("".concat(relativePath.length === 0 ? "." : relativePath, "/").concat(fileName)).replace(/\\/, "/");
      return filePath.startsWith(".") ? filePath : "./".concat(filePath);
    }
    return resolvePath(sourcePath, currentFile, opts);
  };
  var typescriptExts = [
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".es",
    ".es6",
    ".mjs"
  ];
  return [
    require.resolve("@modern-js/babel-plugin-module-resolver"),
    {
      root: absoluteBaseUrl,
      alias: mergedPaths,
      resolvePath: isTsPath ? resolvePathFn : void 0,
      extensions: isTsProject ? typescriptExts : void 0
    }
  ];
};
export {
  aliasPlugin
};
