import path from "path";
import { JS_EXTENSIONS, findExists } from "@modern-js/utils";
import { APP_FILE_NAME } from "./constants";
const hasApp = (dir) => findExists(JS_EXTENSIONS.map((ext) => path.resolve(dir, `${APP_FILE_NAME}${ext}`)));
const isRuntimeEntry = (dir) => hasApp(dir);
export {
  hasApp,
  isRuntimeEntry
};
