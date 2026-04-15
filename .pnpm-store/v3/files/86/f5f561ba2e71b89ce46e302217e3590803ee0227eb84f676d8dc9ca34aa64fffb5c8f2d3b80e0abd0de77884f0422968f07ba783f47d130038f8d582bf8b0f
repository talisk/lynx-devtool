import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import path from "path";
import { fs } from "@modern-js/utils";
import { FILE_SYSTEM_ROUTES_COMPONENTS_DIR, FILE_SYSTEM_ROUTES_DYNAMIC_REGEXP, FILE_SYSTEM_ROUTES_INDEX, FILE_SYSTEM_ROUTES_LAYOUT } from "../../constants";
import { makeLegalIdentifier } from "../makeLegalIdentifier";
import { replaceWithAlias } from "../utils";
import { debug, findLayout, getRouteWeight, shouldSkip } from "./utils";
var compName = function(srcDirectory, filePath) {
  var legalCompName = makeLegalIdentifier(path.relative(srcDirectory, filePath));
  return "Comp_".concat(legalCompName);
};
var layoutNameAbbr = function(filePath) {
  var prefix = "L_";
  var dirName = path.dirname(filePath).split("/").pop() || "";
  return "".concat(prefix).concat(makeLegalIdentifier(dirName));
};
var parents = [];
var recursiveReadDirLegacy = function(param) {
  var dir = param.dir, routes = param.routes, _param_basePath = param.basePath, basePath = _param_basePath === void 0 ? "/" : _param_basePath, srcDirectory = param.srcDirectory, srcAlias = param.srcAlias;
  var hasDynamicRoute = false;
  var resetParent = false;
  var parent = parents[parents.length - 1];
  var layout = findLayout(dir);
  if (layout) {
    if (basePath === "/") {
      throw new Error("should use _app instead of _layout in ".concat(dir));
    } else {
      var alias = replaceWithAlias(srcDirectory, layout, srcAlias);
      var componentName = compName(srcDirectory, layout);
      var route = {
        path: "".concat(basePath.substring(0, basePath.length - 1)),
        exact: false,
        routes: [],
        _component: alias,
        component: componentName,
        parent
      };
      parent = route;
      resetParent = true;
      routes.push(route);
      parents.push(route);
      routes = route.routes;
    }
  }
  var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
  try {
    for (var _iterator = fs.readdirSync(dir)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var relative = _step.value;
      var filePath = path.join(dir, relative);
      if (!shouldSkip(filePath)) {
        var filename = path.basename(filePath, path.extname(filePath));
        var alias1 = replaceWithAlias(srcDirectory, filePath, srcAlias);
        var componentName1 = compName(srcDirectory, filePath);
        var dynamicRouteMatched = FILE_SYSTEM_ROUTES_DYNAMIC_REGEXP.exec(filename);
        if (dynamicRouteMatched) {
          if (hasDynamicRoute) {
            throw new Error("Can't set two dynamic route in one directory: ".concat(dir));
          } else {
            hasDynamicRoute = true;
          }
        }
        var route1 = {
          path: "".concat(basePath).concat(dynamicRouteMatched ? ":".concat(dynamicRouteMatched[1].replace(/\$$/, "?")).concat(dynamicRouteMatched[2]) : filename),
          _component: alias1,
          component: componentName1,
          exact: true,
          parent
        };
        if (fs.statSync(filePath).isDirectory()) {
          recursiveReadDirLegacy({
            dir: filePath,
            routes,
            basePath: "".concat(route1.path, "/"),
            srcDirectory,
            srcAlias
          });
          continue;
        }
        if (filename === FILE_SYSTEM_ROUTES_LAYOUT) {
          continue;
        }
        if (filename === FILE_SYSTEM_ROUTES_INDEX) {
          route1.path = basePath === "/" ? basePath : "".concat(basePath.substring(0, basePath.length - 1));
        }
        if (filename === "404" && basePath === "/") {
          route1.path = "*";
          route1.exact = false;
        }
        routes.push(route1);
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
  if (resetParent) {
    parents.pop();
  }
};
var normalizeNestedRoutes = function(nested, internalComponentsDir, internalDirectory, internalDirAlias) {
  var flat = function(routes) {
    return routes.reduce(function(memo, route) {
      return memo.concat(Array.isArray(route.routes) ? flat(route.routes) : [
        route
      ]);
    }, []);
  };
  var generate = function(route) {
    var codes = [];
    var lastComponent = route.component;
    var imports = [
      "import React from 'react';",
      "import ".concat(lastComponent, " from '").concat(route._component, "'")
    ];
    while (route = route.parent) {
      var layoutComponent = route.component;
      var layoutComponentAbbr = layoutNameAbbr(route._component);
      imports.push("import ".concat(layoutComponent, " from '").concat(route._component, "';"));
      var currentComponent = "".concat(layoutComponentAbbr, "_").concat(lastComponent);
      codes.push("const ".concat(currentComponent, " = props => <").concat(layoutComponent, " Component={").concat(lastComponent, "} {...props} />;"));
      lastComponent = currentComponent;
    }
    var file = path.resolve(internalComponentsDir, "".concat(lastComponent, ".jsx"));
    fs.outputFileSync(file, "".concat(imports.join("\n"), "\n").concat(codes.join("\n"), "\nexport default ").concat(lastComponent));
    return {
      component: lastComponent,
      _component: replaceWithAlias(internalDirectory, file, internalDirAlias)
    };
  };
  var normalized = flat(nested).map(function(route) {
    return route.parent ? _object_spread_props(_object_spread({}, route, generate(route)), {
      parent: void 0
    }) : _object_spread_props(_object_spread({}, route), {
      parent: void 0
    });
  });
  return normalized;
};
var getClientRoutes = function(param) {
  var entrypoint = param.entrypoint, srcDirectory = param.srcDirectory, srcAlias = param.srcAlias, internalDirectory = param.internalDirectory, internalDirAlias = param.internalDirAlias;
  var entry = entrypoint.entry, entryName = entrypoint.entryName;
  if (!fs.existsSync(entry)) {
    throw new Error("generate file system routes error, ".concat(entry, " directory not found."));
  }
  if (!(fs.existsSync(entry) && fs.statSync(entry).isDirectory())) {
    throw new Error("generate file system routes error, ".concat(entry, " should be directory."));
  }
  var routes = [];
  recursiveReadDirLegacy({
    dir: entry,
    routes,
    basePath: "/",
    srcDirectory,
    srcAlias
  });
  var internalComponentsDir = path.resolve(internalDirectory, "".concat(entryName, "/").concat(FILE_SYSTEM_ROUTES_COMPONENTS_DIR));
  fs.emptyDirSync(internalComponentsDir);
  routes = normalizeNestedRoutes(routes, internalComponentsDir, internalDirectory, internalDirAlias);
  parents.length = 0;
  routes.sort(function(a, b) {
    var delta = getRouteWeight(a.path) - getRouteWeight(b.path);
    if (delta === 0) {
      return a.path.length - b.path.length;
    }
    return delta;
  });
  debug("fileSystem routes: %o", routes);
  return routes;
};
export {
  getClientRoutes
};
