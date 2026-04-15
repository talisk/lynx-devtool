import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import * as path from "path";
import { fs } from "@modern-js/utils";
var FILE_EXTENSIONS = [
  ".js",
  ".ts",
  ".mjs",
  ".ejs"
];
var validateAbsolutePath = function(filename, message) {
  if (!path.isAbsolute(filename)) {
    throw new Error(message);
  }
};
var validateAbsolutePaths = function(filenames, messageFunc) {
  filenames.forEach(function(filename) {
    return validateAbsolutePath(filename, messageFunc(filename));
  });
};
var compile = function() {
  var _ref = _async_to_generator(function(appDirectory, modernConfig, compileOptions) {
    var _modernConfig_server, sourceDirs, distDir, tsconfigPath, compiler, isTsProject, _tmp, compileByBabel, compileByTs;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          sourceDirs = compileOptions.sourceDirs, distDir = compileOptions.distDir, tsconfigPath = compileOptions.tsconfigPath;
          validateAbsolutePaths(sourceDirs, function(dir) {
            return "source dir ".concat(dir, " is not an absolute path.");
          });
          validateAbsolutePath(distDir, "dist dir ".concat(distDir, " is not an absolute path."));
          compiler = modernConfig === null || modernConfig === void 0 ? void 0 : (_modernConfig_server = modernConfig.server) === null || _modernConfig_server === void 0 ? void 0 : _modernConfig_server.compiler;
          _tmp = tsconfigPath;
          if (!_tmp)
            return [
              3,
              2
            ];
          return [
            4,
            fs.pathExists(tsconfigPath)
          ];
        case 1:
          _tmp = _state.sent();
          _state.label = 2;
        case 2:
          isTsProject = _tmp;
          if (!(!isTsProject || compiler === "babel"))
            return [
              3,
              5
            ];
          return [
            4,
            import("../compilers/babel")
          ];
        case 3:
          compileByBabel = _state.sent().compileByBabel;
          return [
            4,
            compileByBabel(appDirectory, modernConfig, compileOptions)
          ];
        case 4:
          _state.sent();
          return [
            3,
            8
          ];
        case 5:
          return [
            4,
            import("../compilers/typescript")
          ];
        case 6:
          compileByTs = _state.sent().compileByTs;
          return [
            4,
            compileByTs(appDirectory, modernConfig, compileOptions)
          ];
        case 7:
          _state.sent();
          _state.label = 8;
        case 8:
          return [
            2
          ];
      }
    });
  });
  return function compile2(appDirectory, modernConfig, compileOptions) {
    return _ref.apply(this, arguments);
  };
}();
export {
  FILE_EXTENSIONS,
  compile
};
