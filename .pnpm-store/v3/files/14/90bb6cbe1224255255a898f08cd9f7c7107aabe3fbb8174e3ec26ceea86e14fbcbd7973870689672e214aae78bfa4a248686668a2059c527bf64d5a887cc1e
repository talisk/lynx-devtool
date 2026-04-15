import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import path from "path";
import { warn } from "./log";
import mapToRelative from "./mapToRelative";
import normalizeOptions from "./normalizeOptions";
import { isRelativePath, nodeResolvePath, replaceExtension, toLocalPath, toPosixPath } from "./utils";
function getRelativePath(sourcePath, currentFile, absFileInRoot, opts) {
  var realSourceFileExtension = path.extname(absFileInRoot);
  var sourceFileExtension = path.extname(sourcePath);
  var relativePath = mapToRelative(opts.cwd, currentFile, absFileInRoot);
  if (realSourceFileExtension !== sourceFileExtension) {
    relativePath = replaceExtension(relativePath, opts);
  }
  return toLocalPath(toPosixPath(relativePath));
}
function findPathInRoots(sourcePath, param) {
  var extensions = param.extensions, root = param.root;
  var resolvedSourceFile;
  root.some(function(basedir) {
    resolvedSourceFile = nodeResolvePath("./".concat(sourcePath), basedir, extensions);
    return resolvedSourceFile !== null;
  });
  return resolvedSourceFile;
}
function resolvePathFromRootConfig(sourcePath, currentFile, opts) {
  var absFileInRoot = findPathInRoots(sourcePath, opts);
  if (!absFileInRoot) {
    return null;
  }
  return getRelativePath(sourcePath, currentFile, absFileInRoot, opts);
}
function checkIfPackageExists(modulePath, currentFile, extensions, loglevel) {
  var resolvedPath = nodeResolvePath(modulePath, currentFile, extensions);
  if (resolvedPath === null && loglevel !== "silent") {
    warn('Could not resolve "'.concat(modulePath, '" in file ').concat(currentFile, "."));
  }
}
function resolvePathFromAliasConfig(sourcePath, currentFile, opts) {
  var aliasedSourceFile;
  opts.alias.find(function(param) {
    var _param = _sliced_to_array(param, 2), regExp = _param[0], substitute = _param[1];
    var execResult = regExp.exec(sourcePath);
    if (execResult === null) {
      return false;
    }
    aliasedSourceFile = substitute(execResult);
    return true;
  });
  if (!aliasedSourceFile) {
    return null;
  }
  if (Array.isArray(aliasedSourceFile)) {
    return aliasedSourceFile.map(function(asf) {
      if (isRelativePath(asf)) {
        return toLocalPath(toPosixPath(mapToRelative(opts.cwd, currentFile, asf)));
      }
      return asf;
    }).find(function(src) {
      return nodeResolvePath(src, path.dirname(currentFile), opts.extensions);
    });
  }
  if (isRelativePath(aliasedSourceFile)) {
    return toLocalPath(toPosixPath(mapToRelative(opts.cwd, currentFile, aliasedSourceFile)));
  }
  if (process.env.NODE_ENV !== "production") {
    checkIfPackageExists(aliasedSourceFile, currentFile, opts.extensions, opts.loglevel);
  }
  return aliasedSourceFile;
}
var resolvers = [
  resolvePathFromAliasConfig,
  resolvePathFromRootConfig
];
function resolvePath(sourcePath, currentFile, opts) {
  if (isRelativePath(sourcePath)) {
    return sourcePath;
  }
  var normalizedOpts = normalizeOptions(currentFile, opts);
  var absoluteCurrentFile = path.resolve(currentFile);
  var resolvedPath = null;
  resolvers.some(function(resolver) {
    resolvedPath = resolver(sourcePath, absoluteCurrentFile, normalizedOpts);
    return resolvedPath !== null;
  });
  return resolvedPath;
}
export {
  resolvePath as default
};
