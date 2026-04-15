import path from "path";
import { fs, JS_EXTENSIONS, createDebugger, findExists } from "@modern-js/utils";
import { FILE_SYSTEM_ROUTES_GLOBAL_LAYOUT, FILE_SYSTEM_ROUTES_IGNORED_REGEX, FILE_SYSTEM_ROUTES_LAYOUT } from "../../constants";
const debug = createDebugger("get-client-routes");
const findLayout = (dir) => findExists(JS_EXTENSIONS.map((ext) => path.resolve(dir, `${FILE_SYSTEM_ROUTES_LAYOUT}${ext}`)));
const getRouteWeight = (route) => route === "*" ? 999 : route.split(":").length - 1;
const shouldSkip = (file) => {
  if (fs.statSync(file).isDirectory()) {
    return false;
  }
  const ext = path.extname(file);
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
