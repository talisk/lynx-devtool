import { useRouteLoaderData as useRouteData } from "@modern-js/runtime-utils/router";
import { routerPlugin } from "./plugin";
export * from "@modern-js/runtime-utils/router";
import { renderRoutes } from "./utils";
var runtime_default = routerPlugin;
import { modifyRoutes } from "./plugin";
export * from "./withRouter";
import { Link, NavLink } from "./PrefetchLink";
var useRouteLoaderData = function(routeId) {
  var realRouteId = routeId.replace(/\[(.*?)\]/g, "($1)");
  return useRouteData(realRouteId);
};
import { createShouldRevalidate, handleRouteModule, handleRouteModuleError } from "./routeModule";
export {
  Link,
  NavLink,
  createShouldRevalidate,
  runtime_default as default,
  handleRouteModule,
  handleRouteModuleError,
  modifyRoutes,
  renderRoutes,
  routerPlugin,
  useRouteLoaderData
};
