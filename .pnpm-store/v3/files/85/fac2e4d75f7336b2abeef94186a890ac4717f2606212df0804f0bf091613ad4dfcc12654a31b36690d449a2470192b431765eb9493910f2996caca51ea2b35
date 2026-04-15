import path from "path";
import { JS_EXTENSIONS, findExists } from "@modern-js/utils";
import { APP_FILE_NAME } from "./constants";
var hasApp = function(dir) {
  return findExists(JS_EXTENSIONS.map(function(ext) {
    return path.resolve(dir, "".concat(APP_FILE_NAME).concat(ext));
  }));
};
var isRuntimeEntry = function(dir) {
  return hasApp(dir);
};
export {
  hasApp,
  isRuntimeEntry
};
