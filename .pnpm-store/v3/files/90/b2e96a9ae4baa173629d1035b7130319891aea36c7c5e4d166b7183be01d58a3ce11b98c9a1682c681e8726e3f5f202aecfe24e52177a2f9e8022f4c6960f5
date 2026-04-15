import path from "path";
import resolve from "resolve";
function nodeResolvePath(modulePath, basedir, extensions) {
  try {
    return resolve.sync(modulePath, {
      basedir,
      extensions
    });
  } catch (e) {
    return null;
  }
}
function isRelativePath(nodePath) {
  return nodePath.match(/^\.?\.\//);
}
function toPosixPath(modulePath) {
  return modulePath.replace(/\\/g, "/");
}
function toLocalPath(modulePath) {
  var localPath = modulePath.replace(/\/index$/, "");
  if (!isRelativePath(localPath)) {
    localPath = "./".concat(localPath);
  }
  return localPath;
}
function stripExtension(modulePath, stripExtensions) {
  var name = path.basename(modulePath);
  stripExtensions.some(function(extension) {
    if (name.endsWith(extension)) {
      name = name.slice(0, name.length - extension.length);
      return true;
    }
    return false;
  });
  return name;
}
function replaceExtension(modulePath, opts) {
  var filename = stripExtension(modulePath, opts.stripExtensions);
  return path.join(path.dirname(modulePath), filename);
}
function matchesPattern(types, calleePath, pattern) {
  var node = calleePath.node;
  if (types.isMemberExpression(node)) {
    return calleePath.matchesPattern(pattern);
  }
  if (!types.isIdentifier(node) || pattern.includes(".")) {
    return false;
  }
  var name = pattern.split(".")[0];
  return node.name === name;
}
function isImportCall(types, calleePath) {
  return types.isImport(calleePath.node.callee);
}
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
export {
  escapeRegExp,
  isImportCall,
  isRelativePath,
  matchesPattern,
  nodeResolvePath,
  replaceExtension,
  stripExtension,
  toLocalPath,
  toPosixPath
};
