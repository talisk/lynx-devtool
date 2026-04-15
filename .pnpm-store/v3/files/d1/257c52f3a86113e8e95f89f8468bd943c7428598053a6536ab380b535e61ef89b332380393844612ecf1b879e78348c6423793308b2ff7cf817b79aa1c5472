import { ROUTE_MANIFEST } from "@modern-js/utils/universal/constants";
import { createContext } from "react";
import { createLoaderManager } from "../loader/loaderManager";
const RuntimeReactContext = createContext({});
const ServerRouterContext = createContext({});
const getInitialContext = (runner, isBrowser = true, routeManifest) => ({
  loaderManager: createLoaderManager({}),
  runner,
  isBrowser,
  routeManifest: routeManifest || typeof window !== "undefined" && window[ROUTE_MANIFEST]
});
export {
  RuntimeReactContext,
  ServerRouterContext,
  getInitialContext
};
