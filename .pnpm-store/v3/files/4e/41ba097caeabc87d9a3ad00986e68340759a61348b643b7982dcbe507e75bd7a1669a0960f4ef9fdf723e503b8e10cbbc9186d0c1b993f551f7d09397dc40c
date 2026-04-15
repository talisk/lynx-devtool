import * as path from "path";
import { fs, JS_EXTENSIONS, normalizeToPosixPath } from "@modern-js/utils";
import { NESTED_ROUTE } from "../constants";
import { getPathWithoutExt, hasAction, replaceWithAlias } from "./utils";
const conventionNames = Object.values(NESTED_ROUTE);
const replaceDynamicPath = (routePath) => {
  return routePath.replace(/\[(.*?)\]/g, ":$1");
};
const getRouteId = (componentPath, routesDir, entryName, isMainEntry) => {
  const relativePath = normalizeToPosixPath(path.relative(routesDir, componentPath));
  const pathWithoutExt = getPathWithoutExt(relativePath);
  let id = ``;
  if (isMainEntry) {
    id = pathWithoutExt;
  } else {
    id = `${entryName}_${pathWithoutExt}`;
  }
  return id.replace(/\[(.*?)\]/g, "($1)");
};
const createIndexRoute = (routeInfo, rootDir, filename, entryName, isMainEntry) => {
  return createRoute({
    ...routeInfo,
    index: true,
    children: void 0
  }, rootDir, filename, entryName, isMainEntry);
};
const createRoute = (routeInfo, rootDir, filename, entryName, isMainEntry) => {
  const id = getRouteId(filename, rootDir, entryName, isMainEntry);
  return {
    ...routeInfo,
    id,
    type: "nested"
  };
};
const optimizeRoute = (routeTree) => {
  if (!routeTree.children || routeTree.children.length === 0) {
    return [
      routeTree
    ];
  }
  const { children } = routeTree;
  if (!routeTree._component && !routeTree.error && !routeTree.loading && !routeTree.config && !routeTree.clientData) {
    const newRoutes = children.map((child) => {
      const routePath = `${routeTree.path ? routeTree.path : ""}${child.path ? `/${child.path}` : ""}`;
      const newRoute = {
        ...child,
        path: routePath.replace(/\/\//g, "/")
      };
      if (routePath.length > 0) {
        delete newRoute.index;
      } else {
        delete newRoute.path;
      }
      return newRoute;
    });
    return Array.from(new Set(newRoutes)).flatMap(optimizeRoute);
  } else {
    const optimizedChildren = routeTree.children.flatMap(optimizeRoute);
    return [
      {
        ...routeTree,
        children: optimizedChildren
      }
    ];
  }
};
const walk = async (dirname, rootDir, alias, entryName, isMainEntry, oldVersion) => {
  var _finalRoute_children;
  if (!await fs.pathExists(dirname)) {
    return null;
  }
  const isDirectory = (await fs.stat(dirname)).isDirectory();
  if (!isDirectory) {
    return null;
  }
  const relativeDir = path.relative(rootDir, dirname);
  const pathSegments = relativeDir.split(path.sep);
  const lastSegment = pathSegments[pathSegments.length - 1];
  const isRoot = lastSegment === "";
  const isPathlessLayout = lastSegment.startsWith("__");
  const isWithoutLayoutPath = lastSegment.includes(".");
  let routePath = isRoot || isPathlessLayout ? "/" : `${lastSegment}`;
  if (isWithoutLayoutPath) {
    routePath = lastSegment.split(".").join("/");
  }
  routePath = replaceDynamicPath(routePath);
  const route = {
    path: routePath === null || routePath === void 0 ? void 0 : routePath.replace(/\$$/, "?"),
    children: [],
    isRoot
  };
  let pageLoaderFile = "";
  let pageRoute = null;
  let pageConfigFile = "";
  let pageClientData = "";
  let pageData = "";
  let pageAction = "";
  let splatLoaderFile = "";
  let splatRoute = null;
  let splatConfigFile = "";
  let splatClientData = "";
  let splatData = "";
  let splatAction = "";
  const items = await fs.readdir(dirname);
  for (const item of items) {
    const itemPath = path.join(dirname, item);
    const itemPathWithAlias = getPathWithoutExt(replaceWithAlias(alias.basename, itemPath, alias.name));
    const extname = path.extname(item);
    const itemWithoutExt = item.slice(0, -extname.length);
    const isDirectory2 = (await fs.stat(itemPath)).isDirectory();
    if (isDirectory2) {
      const childRoute = await walk(itemPath, rootDir, alias, entryName, isMainEntry, oldVersion);
      if (childRoute && !Array.isArray(childRoute)) {
        var _route_children;
        (_route_children = route.children) === null || _route_children === void 0 ? void 0 : _route_children.push(childRoute);
      }
    }
    if (extname && (!JS_EXTENSIONS.includes(extname) || !conventionNames.includes(itemWithoutExt))) {
      continue;
    }
    if (itemWithoutExt === NESTED_ROUTE.LAYOUT_LOADER_FILE) {
      if (!route.loader) {
        route.loader = itemPathWithAlias;
      }
    }
    if (itemWithoutExt === NESTED_ROUTE.LAYOUT_CLIENT_LOADER) {
      route.clientData = itemPathWithAlias;
    }
    if (itemWithoutExt === NESTED_ROUTE.LAYOUT_DATA_FILE) {
      route.data = itemPathWithAlias;
      if (await hasAction(itemPath)) {
        route.action = itemPathWithAlias;
      }
    }
    if (itemWithoutExt === NESTED_ROUTE.LAYOUT_CONFIG_FILE) {
      if (!route.config) {
        route.config = itemPathWithAlias;
      }
    }
    if (itemWithoutExt === NESTED_ROUTE.LAYOUT_FILE) {
      route._component = itemPathWithAlias;
    }
    if (itemWithoutExt === NESTED_ROUTE.PAGE_LOADER_FILE) {
      pageLoaderFile = itemPathWithAlias;
    }
    if (itemWithoutExt === NESTED_ROUTE.PAGE_CLIENT_LOADER) {
      pageClientData = itemPathWithAlias;
    }
    if (itemWithoutExt === NESTED_ROUTE.PAGE_DATA_FILE) {
      pageData = itemPathWithAlias;
      if (await hasAction(itemPath)) {
        pageAction = itemPathWithAlias;
      }
    }
    if (itemWithoutExt === NESTED_ROUTE.PAGE_CONFIG_FILE) {
      pageConfigFile = itemPathWithAlias;
    }
    if (itemWithoutExt === NESTED_ROUTE.PAGE_FILE) {
      var _route_children1;
      pageRoute = createIndexRoute({
        _component: itemPathWithAlias
      }, rootDir, itemPath, entryName, isMainEntry);
      if (pageLoaderFile) {
        pageRoute.loader = pageLoaderFile;
      }
      if (pageConfigFile) {
        pageRoute.config = pageConfigFile;
      }
      if (pageData) {
        pageRoute.data = pageData;
      }
      if (pageClientData) {
        pageRoute.clientData = pageClientData;
      }
      if (pageAction) {
        pageRoute.action = pageAction;
      }
      (_route_children1 = route.children) === null || _route_children1 === void 0 ? void 0 : _route_children1.unshift(pageRoute);
    }
    if (itemWithoutExt === NESTED_ROUTE.SPLATE_LOADER_FILE) {
      splatLoaderFile = itemPathWithAlias;
    }
    if (itemWithoutExt === NESTED_ROUTE.SPLATE_CLIENT_DATA) {
      splatClientData = itemPathWithAlias;
    }
    if (itemWithoutExt === NESTED_ROUTE.SPLATE_CONFIG_FILE) {
      if (!route.config) {
        splatConfigFile = replaceWithAlias(alias.basename, itemPath, alias.name);
      }
    }
    if (itemWithoutExt === NESTED_ROUTE.SPLATE_DATA_FILE) {
      splatData = itemPathWithAlias;
      if (await hasAction(itemPath)) {
        splatAction = itemPathWithAlias;
      }
    }
    if (itemWithoutExt === NESTED_ROUTE.SPLATE_FILE) {
      var _route_children2;
      splatRoute = createRoute({
        _component: itemPathWithAlias,
        path: "*"
      }, rootDir, itemPath, entryName, isMainEntry);
      if (splatLoaderFile) {
        splatRoute.loader = splatLoaderFile;
      }
      if (splatClientData) {
        splatRoute.clientData = splatClientData;
      }
      if (splatData) {
        splatRoute.data = splatData;
      }
      if (splatConfigFile) {
        splatRoute.config = splatConfigFile;
      }
      if (splatAction) {
        splatRoute.action = splatAction;
      }
      (_route_children2 = route.children) === null || _route_children2 === void 0 ? void 0 : _route_children2.push(splatRoute);
    }
    if (itemWithoutExt === NESTED_ROUTE.LOADING_FILE) {
      route.loading = itemPathWithAlias;
    }
    if (itemWithoutExt === NESTED_ROUTE.ERROR_FILE) {
      route.error = itemPathWithAlias;
    }
  }
  let finalRoute = createRoute(route, rootDir, path.join(dirname, `${NESTED_ROUTE.LAYOUT_FILE}.ts`), entryName, isMainEntry);
  if (isPathlessLayout) {
    delete finalRoute.path;
  }
  const childRoutes = finalRoute.children = (_finalRoute_children = finalRoute.children) === null || _finalRoute_children === void 0 ? void 0 : _finalRoute_children.filter((childRoute) => childRoute);
  if (childRoutes && childRoutes.length === 0 && !finalRoute.index && !finalRoute._component) {
    return null;
  }
  if (childRoutes && childRoutes.length === 1 && !finalRoute._component) {
    const childRoute = childRoutes[0];
    if (childRoute.path === "*") {
      const path2 = `${finalRoute.path || ""}/${childRoute.path || ""}`;
      finalRoute = {
        ...childRoute,
        path: path2
      };
    }
  }
  if (isRoot && !finalRoute._component) {
    throw new Error("The root layout component is required, make sure the routes/layout.tsx file exists.");
  }
  if (isRoot && !oldVersion) {
    const optimizedRoutes = optimizeRoute(finalRoute);
    return optimizedRoutes;
  }
  return finalRoute;
};
export {
  getRouteId,
  optimizeRoute,
  walk
};
