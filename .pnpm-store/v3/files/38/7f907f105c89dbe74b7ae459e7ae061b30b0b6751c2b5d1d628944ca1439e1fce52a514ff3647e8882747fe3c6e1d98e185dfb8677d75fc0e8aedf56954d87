import { _ as _instanceof } from "@swc/helpers/_/_instanceof";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import { jsx as _jsx } from "react/jsx-runtime";
import { renderNestedRoute } from "@modern-js/runtime-utils/browser";
import { UNSAFE_ErrorResponseImpl as ErrorResponseImpl } from "@modern-js/runtime-utils/remix-router";
import { Route, isRouteErrorResponse } from "@modern-js/runtime-utils/router";
import { DefaultNotFound } from "./DefaultNotFound";
import DeferredDataScripts from "./DeferredDataScripts";
function getRouteComponents(routes, param) {
  var globalApp = param.globalApp, ssrMode = param.ssrMode, props = param.props, reporter = param.reporter;
  var Layout = function(_param) {
    var Component = _param.Component, props2 = _object_without_properties(_param, [
      "Component"
    ]);
    var GlobalLayout = globalApp;
    if (!GlobalLayout) {
      return /* @__PURE__ */ _jsx(Component, _object_spread({}, props2));
    }
    return /* @__PURE__ */ _jsx(GlobalLayout, _object_spread({
      Component
    }, props2));
  };
  var routeElements = [];
  var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
  try {
    for (var _iterator = routes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var route = _step.value;
      if (route.type === "nested") {
        var routeElement = renderNestedRoute(route, {
          DeferredDataComponent: ssrMode === "stream" ? DeferredDataScripts : void 0,
          props,
          reporter
        });
        routeElements.push(routeElement);
      } else {
        var routeElement1 = /* @__PURE__ */ _jsx(Route, {
          path: route.path,
          element: /* @__PURE__ */ _jsx(Layout, {
            Component: route.component
          })
        }, route.path);
        routeElements.push(routeElement1);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
  routeElements.push(/* @__PURE__ */ _jsx(Route, {
    path: "*",
    element: /* @__PURE__ */ _jsx(DefaultNotFound, {})
  }, "*"));
  return routeElements;
}
function renderRoutes(param) {
  var routesConfig = param.routesConfig, props = param.props, ssrMode = param.ssrMode, reporter = param.reporter;
  if (!routesConfig) {
    return null;
  }
  var routes = routesConfig.routes, globalApp = routesConfig.globalApp;
  if (!routes) {
    return null;
  }
  var routeElements = getRouteComponents(routes, {
    globalApp,
    ssrMode,
    props,
    reporter
  });
  return routeElements;
}
function getLocation(serverContext) {
  var _url_replace;
  var _ref = (serverContext === null || serverContext === void 0 ? void 0 : serverContext.request) || {}, pathname = _ref.pathname, url = _ref.url;
  var cleanUrl = url === null || url === void 0 ? void 0 : (_url_replace = url.replace("http://", "")) === null || _url_replace === void 0 ? void 0 : _url_replace.replace("https://", "");
  var index = (cleanUrl || "").indexOf(pathname);
  if (index === -1) {
    return pathname;
  }
  return cleanUrl.substring(index);
}
var urlJoin = function() {
  for (var _len = arguments.length, parts = new Array(_len), _key = 0; _key < _len; _key++) {
    parts[_key] = arguments[_key];
  }
  var separator = "/";
  var replace = new RegExp("".concat(separator, "{1,}"), "g");
  return standardSlash(parts.join(separator).replace(replace, separator));
};
function standardSlash(str) {
  var addr = str;
  if (!addr || typeof addr !== "string") {
    return addr;
  }
  if (addr.startsWith(".")) {
    addr = addr.slice(1);
  }
  if (!addr.startsWith("/")) {
    addr = "/".concat(addr);
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
  var entries = Object.entries(errors);
  var serialized = {};
  var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
  try {
    for (var _iterator = entries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step_value = _sliced_to_array(_step.value, 2), key = _step_value[0], val = _step_value[1];
      if (isRouteErrorResponse(val)) {
        serialized[key] = _object_spread_props(_object_spread({}, val), {
          __type: "RouteErrorResponse"
        });
      } else if (_instanceof(val, Error)) {
        serialized[key] = {
          message: val.message,
          stack: val.stack,
          __type: "Error"
        };
      } else {
        serialized[key] = val;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
  return serialized;
}
function deserializeErrors(errors) {
  if (!errors) {
    return null;
  }
  var entries = Object.entries(errors);
  var serialized = {};
  var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
  try {
    for (var _iterator = entries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step_value = _sliced_to_array(_step.value, 2), key = _step_value[0], val = _step_value[1];
      if (val && val.__type === "RouteErrorResponse") {
        serialized[key] = new ErrorResponseImpl(val.status, val.statusText, val.data, val.internal === true);
      } else if (val && val.__type === "Error") {
        var error = new Error(val.message);
        error.stack = val.stack;
        serialized[key] = error;
      } else {
        serialized[key] = val;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
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
