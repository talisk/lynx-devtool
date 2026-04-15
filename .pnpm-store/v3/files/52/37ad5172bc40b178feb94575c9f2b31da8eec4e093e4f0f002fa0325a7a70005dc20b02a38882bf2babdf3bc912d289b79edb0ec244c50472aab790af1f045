import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import path from "path";
import { fs, MAIN_ENTRY_NAME, ROUTE_SPEC_FILE } from "@modern-js/utils";
var generateRoutes = function() {
  var _ref = _async_to_generator(function(appContext) {
    var serverRoutes, distDirectory, output;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          serverRoutes = appContext.serverRoutes, distDirectory = appContext.distDirectory;
          output = JSON.stringify({
            routes: serverRoutes
          }, null, 2);
          return [
            4,
            fs.outputFile(path.join(distDirectory, ROUTE_SPEC_FILE), output)
          ];
        case 1:
          _state.sent();
          return [
            2
          ];
      }
    });
  });
  return function generateRoutes2(appContext) {
    return _ref.apply(this, arguments);
  };
}();
var getPathWithoutExt = function(filename) {
  var extname = path.extname(filename);
  return filename.slice(0, -extname.length);
};
var isMainEntry = function(entryName, mainEntryName) {
  return entryName === (mainEntryName || MAIN_ENTRY_NAME);
};
export {
  generateRoutes,
  getPathWithoutExt,
  isMainEntry
};
