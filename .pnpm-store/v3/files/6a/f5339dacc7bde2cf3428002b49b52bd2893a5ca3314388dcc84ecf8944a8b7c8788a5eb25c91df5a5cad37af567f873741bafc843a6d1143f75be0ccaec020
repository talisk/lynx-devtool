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
var routeModule_exports = {};
__export(routeModule_exports, {
  createShouldRevalidate: () => createShouldRevalidate,
  handleRouteModule: () => handleRouteModule,
  handleRouteModuleError: () => handleRouteModuleError
});
module.exports = __toCommonJS(routeModule_exports);
var import_constants = require("@modern-js/utils/universal/constants");
const createShouldRevalidate = (routeId) => {
  return (arg) => {
    var _window_ROUTE_MODULES, _window;
    const routeModule = (_window = window) === null || _window === void 0 ? void 0 : (_window_ROUTE_MODULES = _window[import_constants.ROUTE_MODULES]) === null || _window_ROUTE_MODULES === void 0 ? void 0 : _window_ROUTE_MODULES[routeId];
    if (routeModule && typeof routeModule.shouldRevalidate === "function") {
      return routeModule.shouldRevalidate(arg);
    }
    return arg.defaultShouldRevalidate;
  };
};
const handleRouteModule = (routeModule, routeId) => {
  if (typeof document !== "undefined") {
    window[import_constants.ROUTE_MODULES][routeId] = routeModule;
  }
  return routeModule;
};
const handleRouteModuleError = (error) => {
  console.error(error);
  return null;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createShouldRevalidate,
  handleRouteModule,
  handleRouteModuleError
});
