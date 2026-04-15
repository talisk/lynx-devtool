"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: () => handleEffect
});
const isObject = (obj) => {
  return typeof obj === "object" && Object.prototype.toString.call(obj) === "[object Object]";
};
const isNullable = (obj) => {
  return obj === null || typeof obj === "undefined";
};
const objectSet = (obj, paths, value, isImmutable = false) => {
  const result = isImmutable ? {
    ...obj
  } : obj;
  let _paths = paths;
  if (typeof _paths === "string") {
    _paths = _paths.split(".");
  }
  const tailObj = _paths.slice(0, -1).reduce((acc, pathItem) => {
    if (typeof acc[pathItem] === "undefined") {
      acc[pathItem] = /* @__PURE__ */ Object.create(null);
    } else if (isImmutable) {
      acc[pathItem] = {
        ...acc[pathItem]
      };
    }
    return acc[pathItem];
  }, result);
  tailObj[_paths.slice(-1)[0]] = value;
  return result;
};
const objectGet = (obj, paths) => {
  let _paths = paths;
  if (typeof _paths === "string") {
    _paths = _paths.split(".");
  }
  const len = _paths.length;
  let result = obj;
  for (let i = 0; i < len; i++) {
    result = result[_paths[i]];
    if (result == null) {
      return result;
    } else if (i !== len - 1 && !isObject(result)) {
      throw new Error(`get the value on the corresponding path of the ${JSON.stringify(obj)} error`);
    }
  }
  return result;
};
function handleEffect(config = {}) {
  const { ns, result = "result", pending = "pending", error = "error", combineMode = "merge", omitResultNamespace = false } = config;
  const generateStateName = (name) => {
    if (name === false) {
      return null;
    }
    return ns ? `${ns}.${name}` : name;
  };
  const stateNamesMap = {
    result: generateStateName(result),
    pending: generateStateName(pending),
    error: generateStateName(error)
  };
  const getCurrentResult = (state) => {
    if (!stateNamesMap.result) {
      return null;
    }
    const result2 = objectGet(state, stateNamesMap.result);
    return typeof result2 !== "undefined" ? result2 : null;
  };
  const changeResult = (currentResult, newResult) => {
    if (typeof newResult === "undefined") {
      return currentResult;
    }
    switch (combineMode) {
      case "replace":
        return newResult;
      case "merge": {
        if (Array.isArray(newResult)) {
          return Array.isArray(currentResult) ? [
            ...currentResult,
            ...newResult
          ] : isNullable(currentResult) ? [
            ...newResult
          ] : [
            currentResult,
            ...newResult
          ];
        } else if (isObject(newResult)) {
          return {
            ...currentResult,
            ...newResult
          };
        } else {
          return newResult;
        }
      }
      default:
        return newResult;
    }
  };
  const getReducer = (getChange) => {
    return (state, payload) => {
      const resultChange = getChange(state, payload);
      return Object.keys(stateNamesMap).reduce((preState, stateKey) => {
        const result2 = resultChange[stateKey];
        const stateName = stateNamesMap[stateKey];
        if (stateName !== null) {
          if (stateKey === "result" && omitResultNamespace === true) {
            return ns ? {
              ...preState,
              ...{
                [ns]: {
                  ...preState[ns],
                  ...result2
                }
              }
            } : {
              ...preState,
              ...result2
            };
          }
          return objectSet(preState, stateName, result2, true);
        } else {
          return preState;
        }
      }, state);
    };
  };
  const autoReducerMap = {};
  stateNamesMap.pending && (autoReducerMap.pending = getReducer((state) => ({
    pending: true,
    error: null,
    result: getCurrentResult(state)
  })));
  (stateNamesMap.pending || stateNamesMap.result) && (autoReducerMap.fulfilled = getReducer((state, payload) => {
    return {
      pending: false,
      error: null,
      result: changeResult(getCurrentResult(state), payload)
    };
  }));
  (stateNamesMap.pending || stateNamesMap.error) && (autoReducerMap.rejected = getReducer((state, payload = "async action rejected") => {
    return {
      pending: false,
      error: payload,
      result: getCurrentResult(state)
    };
  }));
  return autoReducerMap;
}
