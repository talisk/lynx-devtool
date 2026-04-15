import path from "path";
import { toPosixPath } from "./utils";
function mapToRelative(cwd, currentFile, module) {
  var from = path.dirname(currentFile);
  var to = path.normalize(module);
  from = path.resolve(cwd, from);
  to = path.resolve(cwd, to);
  var moduleMapped = path.relative(from, to);
  return toPosixPath(moduleMapped);
}
export {
  mapToRelative as default
};
