import { isRouteErrorResponse } from "@modern-js/runtime-utils/remix-router";
function attributesToString(attributes) {
  return Object.entries(attributes).reduce((str, [key, value]) => {
    return value === void 0 ? str : `${str} ${key}="${value}"`;
  }, "");
}
function safeReplace(source, searchValue, replaceValue) {
  return source.replace(searchValue, () => replaceValue);
}
function checkIsNode() {
  var _process_release;
  return typeof process !== "undefined" && ((_process_release = process.release) === null || _process_release === void 0 ? void 0 : _process_release.name) === "node";
}
function serializeErrors(errors) {
  if (!errors) {
    return null;
  }
  const entries = Object.entries(errors);
  const serialized = {};
  for (const [key, val] of entries) {
    if (isRouteErrorResponse(val)) {
      serialized[key] = {
        ...val,
        __type: "RouteErrorResponse"
      };
    } else if (val instanceof Error) {
      serialized[key] = {
        message: val.message,
        stack: val.stack,
        __type: "Error"
      };
    } else {
      serialized[key] = val;
    }
  }
  return serialized;
}
function getSSRConfigByEntry(entryName, ssr, ssrByEntries) {
  if (ssrByEntries === null || ssrByEntries === void 0 ? void 0 : ssrByEntries[entryName]) {
    return ssrByEntries[entryName];
  }
  return ssr || true;
}
function getSSRMode(ssrConfig) {
  if (typeof ssrConfig === "boolean") {
    return ssrConfig ? "string" : false;
  }
  return (ssrConfig === null || ssrConfig === void 0 ? void 0 : ssrConfig.mode) === "stream" ? "stream" : "string";
}
export {
  attributesToString,
  checkIsNode,
  getSSRConfigByEntry,
  getSSRMode,
  safeReplace,
  serializeErrors
};
