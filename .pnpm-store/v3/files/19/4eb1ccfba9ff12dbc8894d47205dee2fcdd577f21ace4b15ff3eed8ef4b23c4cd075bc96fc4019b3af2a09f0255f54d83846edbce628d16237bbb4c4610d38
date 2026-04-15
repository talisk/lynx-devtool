import path from "path";
import { fs, JS_EXTENSIONS, findExists, isRouterV5 } from "@modern-js/utils";
import { hasApp } from "../../cli/entry";
import { FILE_SYSTEM_ROUTES_GLOBAL_LAYOUT, NESTED_ROUTES_DIR, PAGES_DIR_NAME } from "./constants";
const hasPages = (dir) => fs.existsSync(path.join(dir, PAGES_DIR_NAME));
const hasNestedRoutes = (dir) => fs.existsSync(path.join(dir, NESTED_ROUTES_DIR));
const isRouteEntry = (dir) => {
  if (hasNestedRoutes(dir)) {
    return path.join(dir, NESTED_ROUTES_DIR);
  }
  if (hasPages(dir)) {
    return path.join(dir, PAGES_DIR_NAME);
  }
  return false;
};
const modifyEntrypoints = (entrypoints, config = {}) => {
  return entrypoints.map((entrypoint) => {
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
    const isHasApp = hasApp(entrypoint.absoluteEntryDir);
    if (isHasApp) {
      return entrypoint;
    }
    const isHasPages = hasPages(entrypoint.absoluteEntryDir);
    if (isHasPages) {
      entrypoint.pageRoutesEntry = path.join(entrypoint.absoluteEntryDir, PAGES_DIR_NAME);
      entrypoint.fileSystemRoutes = {
        ...entrypoint.fileSystemRoutes,
        globalApp: findExists(JS_EXTENSIONS.map((ext) => path.resolve(entrypoint.absoluteEntryDir, `./${PAGES_DIR_NAME}/${FILE_SYSTEM_ROUTES_GLOBAL_LAYOUT}${ext}`)))
      };
    }
    const isHasNestedRoutes = hasNestedRoutes(entrypoint.absoluteEntryDir);
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
