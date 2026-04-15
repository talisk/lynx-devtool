"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var tracer_exports = {};
__export(tracer_exports, {
  SSRErrors: () => SSRErrors,
  SSRTimings: () => SSRTimings,
  createOnError: () => createOnError,
  createOnTiming: () => createOnTiming
});
module.exports = __toCommonJS(tracer_exports);
var SSRTimings;
(function(SSRTimings2) {
  SSRTimings2["PRERENDER"] = "ssr-prerender";
  SSRTimings2["RENDER_HTML"] = "ssr-render-html";
  SSRTimings2["RENDER_SHELL"] = "ssr-render-shell";
  SSRTimings2["USE_LOADER"] = "use-loader";
})(SSRTimings || (SSRTimings = {}));
var SSRErrors;
(function(SSRErrors2) {
  SSRErrors2["PRERENDER"] = "App Prerender";
  SSRErrors2["USE_LOADER"] = "App run useLoader";
  SSRErrors2["RENDER_HTML"] = "App Render To HTML";
  SSRErrors2["RENDER_STREAM"] = "An error occurs during streaming SSR";
  SSRErrors2["RENDER_SHELL"] = "An error occurs during streaming render shell";
})(SSRErrors || (SSRErrors = {}));
function createOnError(onError) {
  return (key, e) => {
    const error = e instanceof Error ? e : new Error("Unexpected Server Error");
    error.name = key;
    onError === null || onError === void 0 ? void 0 : onError(e);
  };
}
function createOnTiming(onTiming) {
  return (key, cost) => {
    onTiming === null || onTiming === void 0 ? void 0 : onTiming(key, cost);
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SSRErrors,
  SSRTimings,
  createOnError,
  createOnTiming
});
