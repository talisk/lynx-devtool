import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import path from "path";
import { fs, JS_EXTENSIONS, findExists, isRouterV5 } from "@modern-js/utils";
import { hasApp } from "../../cli/entry";
import { FILE_SYSTEM_ROUTES_GLOBAL_LAYOUT, NESTED_ROUTES_DIR, PAGES_DIR_NAME } from "./constants";
var hasPages = function(dir) {
  return fs.existsSync(path.join(dir, PAGES_DIR_NAME));
};
var hasNestedRoutes = function(dir) {
  return fs.existsSync(path.join(dir, NESTED_ROUTES_DIR));
};
var isRouteEntry = function(dir) {
  if (hasNestedRoutes(dir)) {
    return path.join(dir, NESTED_ROUTES_DIR);
  }
  if (hasPages(dir)) {
    return path.join(dir, PAGES_DIR_NAME);
  }
  return false;
};
var modifyEntrypoints = function(entrypoints) {
  var config = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return entrypoints.map(function(entrypoint) {
    if (!entrypoint.isAutoMount) {
      return entrypoint;
    }
    if (entrypoint === null || entrypoint === void 0 ? void 0 : entrypoint.isCustomSourceEntry) {
      if (entrypoint.fileSystemRoutes) {
        if (isRouterV5(config)) {
          throw Error("Custom entries with conventional routing not support use react router v5!");
        }
        entrypoint.nestedRoutesEntry = entrypoint.entry;
      }
      return entrypoint;
    }
    var isHasApp = hasApp(entrypoint.absoluteEntryDir);
    if (isHasApp) {
      return entrypoint;
    }
    var isHasPages = hasPages(entrypoint.absoluteEntryDir);
    if (isHasPages) {
      entrypoint.pageRoutesEntry = path.join(entrypoint.absoluteEntryDir, PAGES_DIR_NAME);
      entrypoint.fileSystemRoutes = _object_spread_props(_object_spread({}, entrypoint.fileSystemRoutes), {
        globalApp: findExists(JS_EXTENSIONS.map(function(ext) {
          return path.resolve(entrypoint.absoluteEntryDir, "./".concat(PAGES_DIR_NAME, "/").concat(FILE_SYSTEM_ROUTES_GLOBAL_LAYOUT).concat(ext));
        }))
      });
    }
    var isHasNestedRoutes = hasNestedRoutes(entrypoint.absoluteEntryDir);
    if (isHasNestedRoutes) {
      entrypoint.nestedRoutesEntry = path.join(entrypoint.absoluteEntryDir, NESTED_ROUTES_DIR);
    }
    return entrypoint;
  });
};
export {
  hasNestedRoutes,
  hasPages,
  isRouteEntry,
  modifyEntrypoints
};
