"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
function _export(target, all) {
  for (var name in all)
    Object.defineProperty(target, name, {
      enumerable: true,
      get: all[name]
    });
}
_export(exports, {
  areArgumentsShallowlyEqual: () => areArgumentsShallowlyEqual,
  memorize: () => memorize
});
const areArgumentsShallowlyEqual = (prev, next) => {
  if (prev === next) {
    return true;
  }
  if (Array.isArray(prev) && Array.isArray(next)) {
    if (prev.length !== next.length) {
      return false;
    }
    const { length } = prev;
    for (let i = 0; i < length; i++) {
      if (prev[i] !== next[i]) {
        return false;
      }
    }
    return true;
  }
  return false;
};
const defaultMemoize = (func) => {
  let lastArgs = null;
  let lastResult = null;
  return (...args) => {
    if (!areArgumentsShallowlyEqual(lastArgs, args)) {
      lastResult = func(...args);
      lastArgs = args;
    }
    return lastResult;
  };
};
const memorize = (fn) => {
  return defaultMemoize(fn);
};
