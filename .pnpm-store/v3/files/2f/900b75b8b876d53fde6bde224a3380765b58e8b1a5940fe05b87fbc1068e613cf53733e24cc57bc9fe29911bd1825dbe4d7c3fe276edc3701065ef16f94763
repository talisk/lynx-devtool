import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import * as path from "path";
import { compiler } from "@modern-js/babel-compiler";
import { fs, getAliasConfig, json5 } from "@modern-js/utils";
import { FILE_EXTENSIONS } from "../../common";
import { applyUserBabelConfig, getBabelConfig } from "./preset";
export * from "@babel/core";
var readTsConfig = function(tsconfigPath) {
  var noExistReturn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
  if (!fs.existsSync(tsconfigPath)) {
    return noExistReturn;
  }
  var content = fs.readFileSync(tsconfigPath, "utf-8");
  return json5.parse(content);
};
var existTsConfigFile = function(tsconfigAbsolutePath) {
  var tsconfig = readTsConfig(tsconfigAbsolutePath);
  return Boolean(tsconfig);
};
var resolveBabelConfig = function(appDirectory, config, option, isEsm) {
  var alias = config.alias, babelConfig = config.babelConfig;
  var aliasConfig = getAliasConfig(alias, _object_spread({
    appDirectory
  }, option));
  var defaultBabelConfig = getBabelConfig({
    appDirectory,
    alias: aliasConfig,
    isEsm
  });
  return applyUserBabelConfig(defaultBabelConfig, babelConfig);
};
var compileByBabel = function() {
  var _ref = _async_to_generator(function(appDirectory, config, compileOptions) {
    var sourceDirs, distDir, tsconfigPath, moduleType, isEsm, results;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          sourceDirs = compileOptions.sourceDirs, distDir = compileOptions.distDir, tsconfigPath = compileOptions.tsconfigPath, moduleType = compileOptions.moduleType;
          isEsm = moduleType === "module";
          return [
            4,
            Promise.all(sourceDirs.map(function() {
              var _ref2 = _async_to_generator(function(sourceDir) {
                var babelConfig, basename, targetDir;
                return _ts_generator(this, function(_state2) {
                  switch (_state2.label) {
                    case 0:
                      babelConfig = resolveBabelConfig(appDirectory, config, {
                        tsconfigPath: tsconfigPath ? tsconfigPath : ""
                      }, isEsm);
                      return [
                        4,
                        fs.pathExists(sourceDir)
                      ];
                    case 1:
                      if (!_state2.sent())
                        return [
                          3,
                          3
                        ];
                      basename = path.basename(sourceDir);
                      targetDir = path.join(distDir, basename);
                      return [
                        4,
                        fs.copy(sourceDir, targetDir, {
                          filter: function(src) {
                            return ![
                              ".ts",
                              ".js"
                            ].includes(path.extname(src)) && src !== tsconfigPath;
                          }
                        })
                      ];
                    case 2:
                      _state2.sent();
                      _state2.label = 3;
                    case 3:
                      return [
                        2,
                        compiler({
                          rootDir: appDirectory,
                          distDir,
                          sourceDir,
                          extensions: FILE_EXTENSIONS
                        }, babelConfig)
                      ];
                  }
                });
              });
              return function(sourceDir) {
                return _ref2.apply(this, arguments);
              };
            }()))
          ];
        case 1:
          results = _state.sent();
          results.forEach(function(result) {
            if (result.code === 1) {
              throw new Error(result.message);
            }
          });
          return [
            2
          ];
      }
    });
  });
  return function compileByBabel2(appDirectory, config, compileOptions) {
    return _ref.apply(this, arguments);
  };
}();
export {
  compileByBabel,
  existTsConfigFile,
  readTsConfig,
  resolveBabelConfig
};
