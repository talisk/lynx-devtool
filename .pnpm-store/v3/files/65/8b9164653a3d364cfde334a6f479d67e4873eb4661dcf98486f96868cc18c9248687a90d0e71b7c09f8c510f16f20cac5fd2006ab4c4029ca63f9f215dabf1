import defaultResolvePath from "./resolvePath";
function mapPathString(nodePath, state) {
  if (!state.types.isStringLiteral(nodePath)) {
    return;
  }
  var sourcePath = nodePath.node.value;
  var currentFile = state.file.opts.filename;
  var resolvePath = state.normalizedOpts.customResolvePath || defaultResolvePath;
  var modulePath = resolvePath(sourcePath, currentFile, state.opts);
  if (modulePath) {
    if (nodePath.node.pathResolved) {
      return;
    }
    nodePath.replaceWith(state.types.stringLiteral(modulePath));
    nodePath.node.pathResolved = true;
  }
}
export {
  mapPathString as default
};
