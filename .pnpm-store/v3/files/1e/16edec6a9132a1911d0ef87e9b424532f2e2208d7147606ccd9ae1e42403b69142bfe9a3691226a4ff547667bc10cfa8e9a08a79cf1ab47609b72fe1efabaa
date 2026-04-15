import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { jsx as _jsx } from "react/jsx-runtime";
import { loadableReady } from "@loadable/component";
import { normalizePathname } from "@modern-js/runtime-utils/url";
import { RenderLevel } from "../constants";
import { wrapRuntimeContextProvider } from "../react/wrapper";
import { WithCallback } from "./withCallback";
var isReact18 = function() {
  return process.env.IS_REACT18 === "true";
};
function hydrateRoot(App, context, ModernRender, ModernHydrate) {
  var _ssrContext_request, _window__SSR_DATA, _window, _window__SSR_DATA1, _window1;
  var hydrateContext = _object_spread_props(_object_spread({}, context), {
    get routes() {
      return context.routes;
    },
    _hydration: true
  });
  var ssrContext = hydrateContext.ssrContext;
  var currentPathname = normalizePathname(window.location.pathname);
  var initialPathname = (ssrContext === null || ssrContext === void 0 ? void 0 : (_ssrContext_request = ssrContext.request) === null || _ssrContext_request === void 0 ? void 0 : _ssrContext_request.pathname) && normalizePathname(ssrContext.request.pathname);
  if (initialPathname && initialPathname !== currentPathname && context.router) {
    var errorMsg = "The initial URL ".concat(initialPathname, " and the URL ").concat(currentPathname, " to be hydrated do not match, reload.");
    console.error(errorMsg);
    window.location.reload();
  }
  var callback = function() {
    delete hydrateContext._hydration;
  };
  var renderLevel = ((_window = window) === null || _window === void 0 ? void 0 : (_window__SSR_DATA = _window._SSR_DATA) === null || _window__SSR_DATA === void 0 ? void 0 : _window__SSR_DATA.renderLevel) || RenderLevel.CLIENT_RENDER;
  var renderMode = ((_window1 = window) === null || _window1 === void 0 ? void 0 : (_window__SSR_DATA1 = _window1._SSR_DATA) === null || _window__SSR_DATA1 === void 0 ? void 0 : _window__SSR_DATA1.mode) || "string";
  if (isReact18() && renderMode === "stream") {
    return streamSSRHydrate();
  }
  function streamSSRHydrate() {
    if (renderLevel === RenderLevel.SERVER_RENDER) {
      var SSRApp = function() {
        return /* @__PURE__ */ _jsx(WithCallback, {
          callback,
          children: App
        });
      };
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
      return new Promise(function(resolve) {
        if (isReact18()) {
          loadableReady(function() {
            var SSRApp = function() {
              return /* @__PURE__ */ _jsx(WithCallback, {
                callback,
                children: App
              });
            };
            ModernHydrate(wrapRuntimeContextProvider(/* @__PURE__ */ _jsx(SSRApp, {}), hydrateContext)).then(function(root) {
              resolve(root);
            });
          });
        } else {
          loadableReady(function() {
            ModernHydrate(wrapRuntimeContextProvider(App, hydrateContext), callback).then(function(root) {
              resolve(root);
            });
          });
        }
      });
    } else {
      console.warn("unknow render level: ".concat(renderLevel, ", execute render()"));
      return ModernRender(wrapRuntimeContextProvider(App, context));
    }
  }
}
export {
  hydrateRoot,
  isReact18
};
