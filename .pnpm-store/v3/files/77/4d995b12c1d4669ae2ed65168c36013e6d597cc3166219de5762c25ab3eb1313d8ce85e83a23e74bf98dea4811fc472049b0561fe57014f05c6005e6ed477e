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
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var runtime_exports = {};
__export(runtime_exports, {
  Link: () => import_PrefetchLink.Link,
  NavLink: () => import_PrefetchLink.NavLink,
  createShouldRevalidate: () => import_routeModule.createShouldRevalidate,
  default: () => runtime_default,
  handleRouteModule: () => import_routeModule.handleRouteModule,
  handleRouteModuleError: () => import_routeModule.handleRouteModuleError,
  modifyRoutes: () => import_plugin2.modifyRoutes,
  renderRoutes: () => import_utils.renderRoutes,
  routerPlugin: () => import_plugin.routerPlugin,
  useRouteLoaderData: () => useRouteLoaderData
});
module.exports = __toCommonJS(runtime_exports);
var import_router = require("@modern-js/runtime-utils/router");
var import_plugin = require("./plugin");
__reExport(runtime_exports, require("@modern-js/runtime-utils/router"), module.exports);
var import_utils = require("./utils");
var import_plugin2 = require("./plugin");
__reExport(runtime_exports, require("./withRouter"), module.exports);
var import_PrefetchLink = require("./PrefetchLink");
var import_routeModule = require("./routeModule");
var runtime_default = import_plugin.routerPlugin;
const useRouteLoaderData = (routeId) => {
  const realRouteId = routeId.replace(/\[(.*?)\]/g, "($1)");
  return (0, import_router.useRouteLoaderData)(realRouteId);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Link,
  NavLink,
  createShouldRevalidate,
  handleRouteModule,
  handleRouteModuleError,
  modifyRoutes,
  renderRoutes,
  routerPlugin,
  useRouteLoaderData,
  ...require("@modern-js/runtime-utils/router"),
  ...require("./withRouter")
});
