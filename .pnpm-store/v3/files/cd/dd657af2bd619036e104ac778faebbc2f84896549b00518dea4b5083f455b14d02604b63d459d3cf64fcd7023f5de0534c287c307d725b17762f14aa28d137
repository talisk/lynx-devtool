import { ROUTE_MANIFEST } from "@modern-js/utils/universal/constants";
import { createContext } from "react";
import { createLoaderManager } from "../loader/loaderManager";
var RuntimeReactContext = createContext({});
var ServerRouterContext = createContext({});
var getInitialContext = function(runner) {
  var isBrowser = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true, routeManifest = arguments.length > 2 ? arguments[2] : void 0;
  return {
    loaderManager: createLoaderManager({}),
    runner,
    isBrowser,
    routeManifest: routeManifest || typeof window !== "undefined" && window[ROUTE_MANIFEST]
  };
};
export {
  RuntimeReactContext,
  ServerRouterContext,
  getInitialContext
};
