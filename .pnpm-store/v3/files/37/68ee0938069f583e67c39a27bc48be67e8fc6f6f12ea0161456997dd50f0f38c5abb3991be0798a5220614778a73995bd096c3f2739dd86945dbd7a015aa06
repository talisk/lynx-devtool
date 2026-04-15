const LOADER_CONTEXT = "loaderContext";
function getLoaderCtx(c) {
  const loaderContext = c.get(LOADER_CONTEXT);
  if (loaderContext) {
    return loaderContext;
  } else {
    const loaderContext2 = /* @__PURE__ */ new Map();
    c.set(LOADER_CONTEXT, loaderContext2);
    return loaderContext2;
  }
}
export {
  getLoaderCtx
};
