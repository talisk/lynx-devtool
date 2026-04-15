import { ROUTE_MODULES } from "@modern-js/utils/universal/constants";
var createShouldRevalidate = function(routeId) {
  return function(arg) {
    var _window_ROUTE_MODULES, _window;
    var routeModule = (_window = window) === null || _window === void 0 ? void 0 : (_window_ROUTE_MODULES = _window[ROUTE_MODULES]) === null || _window_ROUTE_MODULES === void 0 ? void 0 : _window_ROUTE_MODULES[routeId];
    if (routeModule && typeof routeModule.shouldRevalidate === "function") {
      return routeModule.shouldRevalidate(arg);
    }
    return arg.defaultShouldRevalidate;
  };
};
var handleRouteModule = function(routeModule, routeId) {
  if (typeof document !== "undefined") {
    window[ROUTE_MODULES][routeId] = routeModule;
  }
  return routeModule;
};
var handleRouteModuleError = function(error) {
  console.error(error);
  return null;
};
export {
  createShouldRevalidate,
  handleRouteModule,
  handleRouteModuleError
};
