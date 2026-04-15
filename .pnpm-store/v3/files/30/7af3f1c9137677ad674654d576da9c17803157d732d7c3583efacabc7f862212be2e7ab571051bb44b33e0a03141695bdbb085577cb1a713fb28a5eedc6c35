import { jsx as _jsx } from "react/jsx-runtime";
import { loadableReady } from "@loadable/component";
import { normalizePathname } from "@modern-js/runtime-utils/url";
import { RenderLevel } from "../constants";
import { wrapRuntimeContextProvider } from "../react/wrapper";
import { WithCallback } from "./withCallback";
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
  const currentPathname = normalizePathname(window.location.pathname);
  const initialPathname = (ssrContext === null || ssrContext === void 0 ? void 0 : (_ssrContext_request = ssrContext.request) === null || _ssrContext_request === void 0 ? void 0 : _ssrContext_request.pathname) && normalizePathname(ssrContext.request.pathname);
  if (initialPathname && initialPathname !== currentPathname && context.router) {
    const errorMsg = `The initial URL ${initialPathname} and the URL ${currentPathname} to be hydrated do not match, reload.`;
    console.error(errorMsg);
    window.location.reload();
  }
  const callback = () => {
    delete hydrateContext._hydration;
  };
  const renderLevel = ((_window = window) === null || _window === void 0 ? void 0 : (_window__SSR_DATA = _window._SSR_DATA) === null || _window__SSR_DATA === void 0 ? void 0 : _window__SSR_DATA.renderLevel) || RenderLevel.CLIENT_RENDER;
  const renderMode = ((_window1 = window) === null || _window1 === void 0 ? void 0 : (_window__SSR_DATA1 = _window1._SSR_DATA) === null || _window__SSR_DATA1 === void 0 ? void 0 : _window__SSR_DATA1.mode) || "string";
  if (isReact18() && renderMode === "stream") {
    return streamSSRHydrate();
  }
  function streamSSRHydrate() {
    if (renderLevel === RenderLevel.SERVER_RENDER) {
      const SSRApp = () => /* @__PURE__ */ _jsx(WithCallback, {
        callback,
        children: App
      });
      return ModernHydrate(wrapRuntimeContextProvider(/* @__PURE__ */ _jsx(SSRApp, {}), hydrateContext));
    } else {
      return ModernRender(wrapRuntimeContextProvider(App, context));
    }
  }
  return stringSSRHydrate();
  function stringSSRHydrate() {
    if (renderLevel === RenderLevel.CLIENT_RENDER || renderLevel === RenderLevel.SERVER_PREFETCH) {
      return ModernRender(wrapRuntimeContextProvider(App, context));
    } else if (renderLevel === RenderLevel.SERVER_RENDER) {
      return new Promise((resolve) => {
        if (isReact18()) {
          loadableReady(() => {
            const SSRApp = () => /* @__PURE__ */ _jsx(WithCallback, {
              callback,
              children: App
            });
            ModernHydrate(wrapRuntimeContextProvider(/* @__PURE__ */ _jsx(SSRApp, {}), hydrateContext)).then((root) => {
              resolve(root);
            });
          });
        } else {
          loadableReady(() => {
            ModernHydrate(wrapRuntimeContextProvider(App, hydrateContext), callback).then((root) => {
              resolve(root);
            });
          });
        }
      });
    } else {
      console.warn(`unknow render level: ${renderLevel}, execute render()`);
      return ModernRender(wrapRuntimeContextProvider(App, context));
    }
  }
}
export {
  hydrateRoot,
  isReact18
};
