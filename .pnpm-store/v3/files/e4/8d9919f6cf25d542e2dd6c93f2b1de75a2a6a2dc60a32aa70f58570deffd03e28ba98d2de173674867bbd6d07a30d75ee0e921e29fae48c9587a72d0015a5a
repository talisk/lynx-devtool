import mapPathString from "../mapPath";
function transformImport(nodePath, state) {
  if (state.moduleResolverVisited.has(nodePath)) {
    return;
  }
  state.moduleResolverVisited.add(nodePath);
  mapPathString(nodePath.get("source"), state);
}
export {
  transformImport as default
};
