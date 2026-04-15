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
export {
  SSRErrors,
  SSRTimings,
  createOnError,
  createOnTiming
};
