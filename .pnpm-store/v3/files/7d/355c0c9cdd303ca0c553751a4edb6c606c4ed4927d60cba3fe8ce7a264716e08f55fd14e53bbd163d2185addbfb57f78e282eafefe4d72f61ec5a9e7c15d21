import path from "path";
import { fs, JS_EXTENSIONS, createDebugger, findExists } from "@modern-js/utils";
import { FILE_SYSTEM_ROUTES_GLOBAL_LAYOUT, FILE_SYSTEM_ROUTES_IGNORED_REGEX, FILE_SYSTEM_ROUTES_LAYOUT } from "../../constants";
var debug = createDebugger("get-client-routes");
var findLayout = function(dir) {
  return findExists(JS_EXTENSIONS.map(function(ext) {
    return path.resolve(dir, "".concat(FILE_SYSTEM_ROUTES_LAYOUT).concat(ext));
  }));
};
var getRouteWeight = function(route) {
  return route === "*" ? 999 : route.split(":").length - 1;
};
var shouldSkip = function(file) {
  if (fs.statSync(file).isDirectory()) {
    return false;
  }
  var ext = path.extname(file);
  if (FILE_SYSTEM_ROUTES_IGNORED_REGEX.test(file) || !JS_EXTENSIONS.includes(ext) || FILE_SYSTEM_ROUTES_GLOBAL_LAYOUT === path.basename(file, ext)) {
    return true;
  }
  return false;
};
export {
  debug,
  findLayout,
  getRouteWeight,
  shouldSkip
};
