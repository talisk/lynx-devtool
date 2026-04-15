import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import * as path from "path";
import { fs, JS_EXTENSIONS, normalizeToPosixPath } from "@modern-js/utils";
import { NESTED_ROUTE } from "../constants";
import { getPathWithoutExt, hasAction, replaceWithAlias } from "./utils";
var conventionNames = Object.values(NESTED_ROUTE);
var replaceDynamicPath = function(routePath) {
  return routePath.replace(/\[(.*?)\]/g, ":$1");
};
var getRouteId = function(componentPath, routesDir, entryName, isMainEntry) {
  var relativePath = normalizeToPosixPath(path.relative(routesDir, componentPath));
  var pathWithoutExt = getPathWithoutExt(relativePath);
  var id = "";
  if (isMainEntry) {
    id = pathWithoutExt;
  } else {
    id = "".concat(entryName, "_").concat(pathWithoutExt);
  }
  return id.replace(/\[(.*?)\]/g, "($1)");
};
var createIndexRoute = function(routeInfo, rootDir, filename, entryName, isMainEntry) {
  return createRoute(_object_spread_props(_object_spread({}, routeInfo), {
    index: true,
    children: void 0
  }), rootDir, filename, entryName, isMainEntry);
};
var createRoute = function(routeInfo, rootDir, filename, entryName, isMainEntry) {
  var id = getRouteId(filename, rootDir, entryName, isMainEntry);
  return _object_spread_props(_object_spread({}, routeInfo), {
    id,
    type: "nested"
  });
};
var optimizeRoute = function(routeTree) {
  if (!routeTree.children || routeTree.children.length === 0) {
    return [
      routeTree
    ];
  }
  var children = routeTree.children;
  if (!routeTree._component && !routeTree.error && !routeTree.loading && !routeTree.config && !routeTree.clientData) {
    var newRoutes = children.map(function(child) {
      var routePath = "".concat(routeTree.path ? routeTree.path : "").concat(child.path ? "/".concat(child.path) : "");
      var newRoute = _object_spread_props(_object_spread({}, child), {
        path: routePath.replace(/\/\//g, "/")
      });
      if (routePath.length > 0) {
        delete newRoute.index;
      } else {
        delete newRoute.path;
      }
      return newRoute;
    });
    return Array.from(new Set(newRoutes)).flatMap(optimizeRoute);
  } else {
    var optimizedChildren = routeTree.children.flatMap(optimizeRoute);
    return [
      _object_spread_props(_object_spread({}, routeTree), {
        children: optimizedChildren
      })
    ];
  }
};
var walk = function() {
  var _ref = _async_to_generator(function(dirname, rootDir, alias, entryName, isMainEntry, oldVersion) {
    var _finalRoute_children, isDirectory, relativeDir, pathSegments, lastSegment, isRoot, isPathlessLayout, isWithoutLayoutPath, routePath, route, pageLoaderFile, pageRoute, pageConfigFile, pageClientData, pageData, pageAction, splatLoaderFile, splatRoute, splatConfigFile, splatClientData, splatData, splatAction, items, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, itemPath, itemPathWithAlias, extname, itemWithoutExt, isDirectory1, childRoute, _route_children, _route_children1, _route_children2, err, finalRoute, childRoutes, childRoute1, _$path, optimizedRoutes;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          return [
            4,
            fs.pathExists(dirname)
          ];
        case 1:
          if (!_state.sent()) {
            return [
              2,
              null
            ];
          }
          return [
            4,
            fs.stat(dirname)
          ];
        case 2:
          isDirectory = _state.sent().isDirectory();
          if (!isDirectory) {
            return [
              2,
              null
            ];
          }
          relativeDir = path.relative(rootDir, dirname);
          pathSegments = relativeDir.split(path.sep);
          lastSegment = pathSegments[pathSegments.length - 1];
          isRoot = lastSegment === "";
          isPathlessLayout = lastSegment.startsWith("__");
          isWithoutLayoutPath = lastSegment.includes(".");
          routePath = isRoot || isPathlessLayout ? "/" : "".concat(lastSegment);
          if (isWithoutLayoutPath) {
            routePath = lastSegment.split(".").join("/");
          }
          routePath = replaceDynamicPath(routePath);
          route = {
            path: routePath === null || routePath === void 0 ? void 0 : routePath.replace(/\$$/, "?"),
            children: [],
            isRoot
          };
          pageLoaderFile = "";
          pageRoute = null;
          pageConfigFile = "";
          pageClientData = "";
          pageData = "";
          pageAction = "";
          splatLoaderFile = "";
          splatRoute = null;
          splatConfigFile = "";
          splatClientData = "";
          splatData = "";
          splatAction = "";
          return [
            4,
            fs.readdir(dirname)
          ];
        case 3:
          items = _state.sent();
          _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
          _state.label = 4;
        case 4:
          _state.trys.push([
            4,
            17,
            18,
            19
          ]);
          _iterator = items[Symbol.iterator]();
          _state.label = 5;
        case 5:
          if (!!(_iteratorNormalCompletion = (_step = _iterator.next()).done))
            return [
              3,
              16
            ];
          item = _step.value;
          itemPath = path.join(dirname, item);
          itemPathWithAlias = getPathWithoutExt(replaceWithAlias(alias.basename, itemPath, alias.name));
          extname = path.extname(item);
          itemWithoutExt = item.slice(0, -extname.length);
          return [
            4,
            fs.stat(itemPath)
          ];
        case 6:
          isDirectory1 = _state.sent().isDirectory();
          if (!isDirectory1)
            return [
              3,
              8
            ];
          return [
            4,
            walk(itemPath, rootDir, alias, entryName, isMainEntry, oldVersion)
          ];
        case 7:
          childRoute = _state.sent();
          if (childRoute && !Array.isArray(childRoute)) {
            ;
            (_route_children = route.children) === null || _route_children === void 0 ? void 0 : _route_children.push(childRoute);
          }
          _state.label = 8;
        case 8:
          if (extname && (!JS_EXTENSIONS.includes(extname) || !conventionNames.includes(itemWithoutExt))) {
            return [
              3,
              15
            ];
          }
          if (itemWithoutExt === NESTED_ROUTE.LAYOUT_LOADER_FILE) {
            if (!route.loader) {
              route.loader = itemPathWithAlias;
            }
          }
          if (itemWithoutExt === NESTED_ROUTE.LAYOUT_CLIENT_LOADER) {
            route.clientData = itemPathWithAlias;
          }
          if (!(itemWithoutExt === NESTED_ROUTE.LAYOUT_DATA_FILE))
            return [
              3,
              10
            ];
          route.data = itemPathWithAlias;
          return [
            4,
            hasAction(itemPath)
          ];
        case 9:
          if (_state.sent()) {
            route.action = itemPathWithAlias;
          }
          _state.label = 10;
        case 10:
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
          if (!(itemWithoutExt === NESTED_ROUTE.PAGE_DATA_FILE))
            return [
              3,
              12
            ];
          pageData = itemPathWithAlias;
          return [
            4,
            hasAction(itemPath)
          ];
        case 11:
          if (_state.sent()) {
            pageAction = itemPathWithAlias;
          }
          _state.label = 12;
        case 12:
          if (itemWithoutExt === NESTED_ROUTE.PAGE_CONFIG_FILE) {
            pageConfigFile = itemPathWithAlias;
          }
          if (itemWithoutExt === NESTED_ROUTE.PAGE_FILE) {
            ;
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
          if (!(itemWithoutExt === NESTED_ROUTE.SPLATE_DATA_FILE))
            return [
              3,
              14
            ];
          splatData = itemPathWithAlias;
          return [
            4,
            hasAction(itemPath)
          ];
        case 13:
          if (_state.sent()) {
            splatAction = itemPathWithAlias;
          }
          _state.label = 14;
        case 14:
          if (itemWithoutExt === NESTED_ROUTE.SPLATE_FILE) {
            ;
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
          _state.label = 15;
        case 15:
          _iteratorNormalCompletion = true;
          return [
            3,
            5
          ];
        case 16:
          return [
            3,
            19
          ];
        case 17:
          err = _state.sent();
          _didIteratorError = true;
          _iteratorError = err;
          return [
            3,
            19
          ];
        case 18:
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
          return [
            7
          ];
        case 19:
          finalRoute = createRoute(route, rootDir, path.join(dirname, "".concat(NESTED_ROUTE.LAYOUT_FILE, ".ts")), entryName, isMainEntry);
          if (isPathlessLayout) {
            delete finalRoute.path;
          }
          childRoutes = finalRoute.children = (_finalRoute_children = finalRoute.children) === null || _finalRoute_children === void 0 ? void 0 : _finalRoute_children.filter(function(childRoute2) {
            return childRoute2;
          });
          if (childRoutes && childRoutes.length === 0 && !finalRoute.index && !finalRoute._component) {
            return [
              2,
              null
            ];
          }
          if (childRoutes && childRoutes.length === 1 && !finalRoute._component) {
            childRoute1 = childRoutes[0];
            if (childRoute1.path === "*") {
              _$path = "".concat(finalRoute.path || "", "/").concat(childRoute1.path || "");
              finalRoute = _object_spread_props(_object_spread({}, childRoute1), {
                path: _$path
              });
            }
          }
          if (isRoot && !finalRoute._component) {
            throw new Error("The root layout component is required, make sure the routes/layout.tsx file exists.");
          }
          if (isRoot && !oldVersion) {
            optimizedRoutes = optimizeRoute(finalRoute);
            return [
              2,
              optimizedRoutes
            ];
          }
          return [
            2,
            finalRoute
          ];
      }
    });
  });
  return function walk2(dirname, rootDir, alias, entryName, isMainEntry, oldVersion) {
    return _ref.apply(this, arguments);
  };
}();
export {
  getRouteId,
  optimizeRoute,
  walk
};
