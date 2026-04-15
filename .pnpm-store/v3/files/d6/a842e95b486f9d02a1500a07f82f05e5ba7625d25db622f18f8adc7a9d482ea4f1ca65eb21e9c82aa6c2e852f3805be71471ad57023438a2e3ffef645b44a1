import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import * as path from "path";
import { bundle } from "@modern-js/node-bundle-require";
import { fs, CONFIG_FILE_EXTENSIONS, OUTPUT_CONFIG_FILE, ensureAbsolutePath, getServerConfig } from "@modern-js/utils";
import { stringify } from "flatted";
var defineServerConfig = function(config) {
  return config;
};
var buildServerConfig = function() {
  var _ref = _async_to_generator(function(param) {
    var appDirectory, distDirectory, configFile, options, watch, configFilePath, getOutputFile, configHelperFilePath, helperCode;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          appDirectory = param.appDirectory, distDirectory = param.distDirectory, configFile = param.configFile, options = param.options, watch = param.watch;
          return [
            4,
            getServerConfig(appDirectory, configFile)
          ];
        case 1:
          configFilePath = _state.sent();
          getOutputFile = function() {
            var _ref2 = _async_to_generator(function(filepath) {
              return _ts_generator(this, function(_state2) {
                return [
                  2,
                  path.resolve(distDirectory, "".concat(filepath.replace(new RegExp(CONFIG_FILE_EXTENSIONS.join("|")), ""), ".cjs"))
                ];
              });
            });
            return function getOutputFile2(filepath) {
              return _ref2.apply(this, arguments);
            };
          }();
          if (!configFilePath)
            return [
              3,
              5
            ];
          configHelperFilePath = path.normalize(path.join(distDirectory, "./config-helper.js"));
          helperCode = "\n      export const defineConfig = (config) => config;\n    ";
          return [
            4,
            fs.ensureDir(distDirectory)
          ];
        case 2:
          _state.sent();
          return [
            4,
            fs.writeFile(configHelperFilePath, helperCode)
          ];
        case 3:
          _state.sent();
          return [
            4,
            bundle(configFilePath, _object_spread_props(_object_spread({}, options), {
              watch,
              getOutputFile,
              esbuildPlugins: [
                {
                  name: "native-build-config",
                  setup: function setup(ctx) {
                    ctx.onResolve({
                      filter: /app-tools\/server/
                    }, function() {
                      return {
                        path: configHelperFilePath
                      };
                    });
                  }
                }
              ]
            }))
          ];
        case 4:
          _state.sent();
          _state.label = 5;
        case 5:
          return [
            2
          ];
      }
    });
  });
  return function buildServerConfig2(_) {
    return _ref.apply(this, arguments);
  };
}();
var emitResolvedConfig = function() {
  var _ref = _async_to_generator(function(appDirectory, resolvedConfig) {
    var _resolvedConfig_output_distPath, outputPath, output;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          outputPath = ensureAbsolutePath(appDirectory, path.join(((_resolvedConfig_output_distPath = resolvedConfig.output.distPath) === null || _resolvedConfig_output_distPath === void 0 ? void 0 : _resolvedConfig_output_distPath.root) || "./dist", OUTPUT_CONFIG_FILE));
          output = stringify(resolvedConfig);
          return [
            4,
            fs.writeFile(outputPath, output, {
              encoding: "utf-8"
            })
          ];
        case 1:
          _state.sent();
          return [
            2
          ];
      }
    });
  });
  return function emitResolvedConfig2(appDirectory, resolvedConfig) {
    return _ref.apply(this, arguments);
  };
}();
export {
  buildServerConfig,
  defineServerConfig,
  emitResolvedConfig
};
