"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var utils_exports = {};
__export(utils_exports, {
  deserializeErrors: () => deserializeErrors,
  getLocation: () => getLocation,
  getRouteComponents: () => getRouteComponents,
  renderRoutes: () => renderRoutes,
  serializeErrors: () => serializeErrors,
  standardSlash: () => standardSlash,
  urlJoin: () => urlJoin
});
module.exports = __toCommonJS(utils_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_browser = require("@modern-js/runtime-utils/browser");
var import_remix_router = require("@modern-js/runtime-utils/remix-router");
var import_router = require("@modern-js/runtime-utils/router");
var import_DefaultNotFound = require("./DefaultNotFound");
var import_DeferredDataScripts = __toESM(require("./DeferredDataScripts"));
function getRouteComponents(routes, { globalApp, ssrMode, props, reporter }) {
  const Layout = ({ Component, ...props2 }) => {
    const GlobalLayout = globalApp;
    if (!GlobalLayout) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
        ...props2
      });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobalLayout, {
      Component,
      ...props2
    });
  };
  const routeElements = [];
  for (const route of routes) {
    if (route.type === "nested") {
      const routeElement = (0, import_browser.renderNestedRoute)(route, {
        DeferredDataComponent: ssrMode === "stream" ? import_DeferredDataScripts.default : void 0,
        props,
        reporter
      });
      routeElements.push(routeElement);
    } else {
      const routeElement = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_router.Route, {
        path: route.path,
        element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, {
          Component: route.component
        })
      }, route.path);
      routeElements.push(routeElement);
    }
  }
  routeElements.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_router.Route, {
    path: "*",
    element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_DefaultNotFound.DefaultNotFound, {})
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
    if ((0, import_router.isRouteErrorResponse)(val)) {
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
      serialized[key] = new import_remix_router.UNSAFE_ErrorResponseImpl(val.status, val.statusText, val.data, val.internal === true);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  deserializeErrors,
  getLocation,
  getRouteComponents,
  renderRoutes,
  serializeErrors,
  standardSlash,
  urlJoin
});
