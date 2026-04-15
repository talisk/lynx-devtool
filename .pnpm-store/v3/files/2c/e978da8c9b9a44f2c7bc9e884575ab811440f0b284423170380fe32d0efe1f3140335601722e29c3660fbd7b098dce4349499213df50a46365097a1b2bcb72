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
var hydrate_exports = {};
__export(hydrate_exports, {
  hydrateRoot: () => hydrateRoot,
  isReact18: () => isReact18
});
module.exports = __toCommonJS(hydrate_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_component = require("@loadable/component");
var import_url = require("@modern-js/runtime-utils/url");
var import_constants = require("../constants");
var import_wrapper = require("../react/wrapper");
var import_withCallback = require("./withCallback");
const isReact18 = () => process.env.IS_REACT18 === "true";
function hydrateRoot(App, context, ModernRender, ModernHydrate) {
  var _ssrContext_request, _window__SSR_DATA, _window, _window__SSR_DATA1, _window1;
  const hydrateContext = {
    ...context,
    get routes() {
      return context.routes;
    },
    _hydration: true
  };
  const { ssrContext } = hydrateContext;
  const currentPathname = (0, import_url.normalizePathname)(window.location.pathname);
  const initialPathname = (ssrContext === null || ssrContext === void 0 ? void 0 : (_ssrContext_request = ssrContext.request) === null || _ssrContext_request === void 0 ? void 0 : _ssrContext_request.pathname) && (0, import_url.normalizePathname)(ssrContext.request.pathname);
  if (initialPathname && initialPathname !== currentPathname && context.router) {
    const errorMsg = `The initial URL ${initialPathname} and the URL ${currentPathname} to be hydrated do not match, reload.`;
    console.error(errorMsg);
    window.location.reload();
  }
  const callback = () => {
    delete hydrateContext._hydration;
  };
  const renderLevel = ((_window = window) === null || _window === void 0 ? void 0 : (_window__SSR_DATA = _window._SSR_DATA) === null || _window__SSR_DATA === void 0 ? void 0 : _window__SSR_DATA.renderLevel) || import_constants.RenderLevel.CLIENT_RENDER;
  const renderMode = ((_window1 = window) === null || _window1 === void 0 ? void 0 : (_window__SSR_DATA1 = _window1._SSR_DATA) === null || _window__SSR_DATA1 === void 0 ? void 0 : _window__SSR_DATA1.mode) || "string";
  if (isReact18() && renderMode === "stream") {
    return streamSSRHydrate();
  }
  function streamSSRHydrate() {
    if (renderLevel === import_constants.RenderLevel.SERVER_RENDER) {
      const SSRApp = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_withCallback.WithCallback, {
        callback,
        children: App
      });
      return ModernHydrate((0, import_wrapper.wrapRuntimeContextProvider)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SSRApp, {}), hydrateContext));
    } else {
      return ModernRender((0, import_wrapper.wrapRuntimeContextProvider)(App, context));
    }
  }
  return stringSSRHydrate();
  function stringSSRHydrate() {
    if (renderLevel === import_constants.RenderLevel.CLIENT_RENDER || renderLevel === import_constants.RenderLevel.SERVER_PREFETCH) {
      return ModernRender((0, import_wrapper.wrapRuntimeContextProvider)(App, context));
    } else if (renderLevel === import_constants.RenderLevel.SERVER_RENDER) {
      return new Promise((resolve) => {
        if (isReact18()) {
          (0, import_component.loadableReady)(() => {
            const SSRApp = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_withCallback.WithCallback, {
              callback,
              children: App
            });
            ModernHydrate((0, import_wrapper.wrapRuntimeContextProvider)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SSRApp, {}), hydrateContext)).then((root) => {
              resolve(root);
            });
          });
        } else {
          (0, import_component.loadableReady)(() => {
            ModernHydrate((0, import_wrapper.wrapRuntimeContextProvider)(App, hydrateContext), callback).then((root) => {
              resolve(root);
            });
          });
        }
      });
    } else {
      console.warn(`unknow render level: ${renderLevel}, execute render()`);
      return ModernRender((0, import_wrapper.wrapRuntimeContextProvider)(App, context));
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  hydrateRoot,
  isReact18
});
