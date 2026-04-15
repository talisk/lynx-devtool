import mapPathString from "../mapPath";
import { isImportCall, matchesPattern } from "../utils";
function transformCall(nodePath, state) {
  if (state.moduleResolverVisited.has(nodePath)) {
    return;
  }
  const calleePath = nodePath.get("callee");
  const isNormalCall = state.normalizedOpts.transformFunctions.some((pattern) => matchesPattern(state.types, calleePath, pattern));
  if (isNormalCall || isImportCall(state.types, nodePath)) {
    state.moduleResolverVisited.add(nodePath);
    mapPathString(nodePath.get("arguments.0"), state);
  }
}
export {
  transformCall as default
};
