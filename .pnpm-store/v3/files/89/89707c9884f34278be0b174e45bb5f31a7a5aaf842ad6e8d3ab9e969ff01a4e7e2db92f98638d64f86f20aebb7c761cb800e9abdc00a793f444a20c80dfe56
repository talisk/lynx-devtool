import { jsx as _jsx } from "react/jsx-runtime";
import { renderNestedRoute } from "@modern-js/runtime-utils/browser";
import { UNSAFE_ErrorResponseImpl as ErrorResponseImpl } from "@modern-js/runtime-utils/remix-router";
import { Route, isRouteErrorResponse } from "@modern-js/runtime-utils/router";
import { DefaultNotFound } from "./DefaultNotFound";
import DeferredDataScripts from "./DeferredDataScripts";
function getRouteComponents(routes, { globalApp, ssrMode, props, reporter }) {
  const Layout = ({ Component, ...props2 }) => {
    const GlobalLayout = globalApp;
    if (!GlobalLayout) {
      return /* @__PURE__ */ _jsx(Component, {
        ...props2
      });
    }
    return /* @__PURE__ */ _jsx(GlobalLayout, {
      Component,
      ...props2
    });
  };
  const routeElements = [];
  for (const route of routes) {
    if (route.type === "nested") {
      const routeElement = renderNestedRoute(route, {
        DeferredDataComponent: ssrMode === "stream" ? DeferredDataScripts : void 0,
        props,
        reporter
      });
      routeElements.push(routeElement);
    } else {
      const routeElement = /* @__PURE__ */ _jsx(Route, {
        path: route.path,
        element: /* @__PURE__ */ _jsx(Layout, {
          Component: route.component
        })
      }, route.path);
      routeElements.push(routeElement);
    }
  }
  routeElements.push(/* @__PURE__ */ _jsx(Route, {
    path: "*",
    element: /* @__PURE__ */ _jsx(DefaultNotFound, {})
  }, "*"));
  return routeElements;
}
function renderRoutes({ routesConfig, props, ssrMode, reporter }) {
  if (!routesConfig) {
    return null;
  }
  const { routes, globalApp } = routesConfig;
  if (!routes) {
    return null;
  }
  const routeElements = getRouteComponents(routes, {
    globalApp,
    ssrMode,
    props,
    reporter
  });
  return routeElements;
}
function getLocation(serverContext) {
  var _url_replace;
  const { pathname, url } = (serverContext === null || serverContext === void 0 ? void 0 : serverContext.request) || {};
  const cleanUrl = url === null || url === void 0 ? void 0 : (_url_replace = url.replace("http://", "")) === null || _url_replace === void 0 ? void 0 : _url_replace.replace("https://", "");
  const index = (cleanUrl || "").indexOf(pathname);
  if (index === -1) {
    return pathname;
  }
  return cleanUrl.substring(index);
}
const urlJoin = (...parts) => {
  const separator = "/";
  const replace = new RegExp(`${separator}{1,}`, "g");
  return standardSlash(parts.join(separator).replace(replace, separator));
};
function standardSlash(str) {
  let addr = str;
  if (!addr || typeof addr !== "string") {
    return addr;
  }
  if (addr.startsWith(".")) {
    addr = addr.slice(1);
  }
  if (!addr.startsWith("/")) {
    addr = `/${addr}`;
  }
  if (addr.endsWith("/") && addr !== "/") {
    addr = addr.slice(0, addr.length - 1);
  }
  return addr;
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
function deserializeErrors(errors) {
  if (!errors) {
    return null;
  }
  const entries = Object.entries(errors);
  const serialized = {};
  for (const [key, val] of entries) {
    if (val && val.__type === "RouteErrorResponse") {
      serialized[key] = new ErrorResponseImpl(val.status, val.statusText, val.data, val.internal === true);
    } else if (val && val.__type === "Error") {
      const error = new Error(val.message);
      error.stack = val.stack;
      serialized[key] = error;
    } else {
      serialized[key] = val;
    }
  }
  return serialized;
}
export {
  deserializeErrors,
  getLocation,
  getRouteComponents,
  renderRoutes,
  serializeErrors,
  standardSlash,
  urlJoin
};
