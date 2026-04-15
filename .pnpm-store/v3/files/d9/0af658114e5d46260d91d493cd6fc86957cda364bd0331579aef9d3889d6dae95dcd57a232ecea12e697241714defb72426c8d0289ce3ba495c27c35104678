import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import path from "path";
import { fs, DEFAULT_SERVER_CONFIG, OUTPUT_CONFIG_FILE, lodash as _, compatibleRequire, ensureAbsolutePath, requireExistModule } from "@modern-js/utils";
import { parse } from "flatted";
var requireConfig = function() {
  var _ref = _async_to_generator(function(serverConfigPath) {
    return _ts_generator(this, function(_state) {
      if (fs.pathExistsSync(serverConfigPath)) {
        return [
          2,
          compatibleRequire(serverConfigPath)
        ];
      }
      return [
        2,
        void 0
      ];
    });
  });
  return function requireConfig2(serverConfigPath) {
    return _ref.apply(this, arguments);
  };
}();
function loadServerConfigNew(serverConfigPath) {
  return _loadServerConfigNew.apply(this, arguments);
}
function _loadServerConfigNew() {
  _loadServerConfigNew = _async_to_generator(function(serverConfigPath) {
    var mod;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          return [
            4,
            requireExistModule(serverConfigPath)
          ];
        case 1:
          mod = _state.sent();
          if (mod) {
            return [
              2,
              mod
            ];
          }
          return [
            2,
            void 0
          ];
      }
    });
  });
  return _loadServerConfigNew.apply(this, arguments);
}
function loadServerConfigOld(pwd, configFile) {
  return _loadServerConfigOld.apply(this, arguments);
}
function _loadServerConfigOld() {
  _loadServerConfigOld = _async_to_generator(function(pwd, configFile) {
    var serverConfigPath, serverConfig;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          serverConfigPath = path.join(pwd, "".concat(configFile, ".cjs"));
          return [
            4,
            requireConfig(serverConfigPath)
          ];
        case 1:
          serverConfig = _state.sent();
          return [
            2,
            serverConfig
          ];
      }
    });
  });
  return _loadServerConfigOld.apply(this, arguments);
}
function loadServerRuntimeConfig(pwd) {
  return _loadServerRuntimeConfig.apply(this, arguments);
}
function _loadServerRuntimeConfig() {
  _loadServerRuntimeConfig = _async_to_generator(function(pwd) {
    var oldServerFile, newServerConfigPath, newServerConfig, _tmp, oldServerConfig;
    var _arguments = arguments;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          oldServerFile = _arguments.length > 1 && _arguments[1] !== void 0 ? _arguments[1] : DEFAULT_SERVER_CONFIG, newServerConfigPath = _arguments.length > 2 ? _arguments[2] : void 0;
          _tmp = newServerConfigPath;
          if (!_tmp)
            return [
              3,
              2
            ];
          return [
            4,
            loadServerConfigNew(newServerConfigPath)
          ];
        case 1:
          _tmp = _state.sent();
          _state.label = 2;
        case 2:
          newServerConfig = _tmp;
          if (newServerConfig) {
            return [
              2,
              newServerConfig
            ];
          }
          return [
            4,
            loadServerConfigOld(pwd, oldServerFile)
          ];
        case 3:
          oldServerConfig = _state.sent();
          return [
            2,
            oldServerConfig
          ];
      }
    });
  });
  return _loadServerRuntimeConfig.apply(this, arguments);
}
function loadServerCliConfig(pwd) {
  var defaultConfig = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var _defaultConfig_output_distPath, _defaultConfig_output;
  var cliConfigPath = ensureAbsolutePath(pwd, path.join(((_defaultConfig_output = defaultConfig.output) === null || _defaultConfig_output === void 0 ? void 0 : (_defaultConfig_output_distPath = _defaultConfig_output.distPath) === null || _defaultConfig_output_distPath === void 0 ? void 0 : _defaultConfig_output_distPath.root) || "dist", OUTPUT_CONFIG_FILE));
  var cliConfig = {
    output: {},
    source: {},
    tools: {},
    server: {},
    security: {},
    runtime: {},
    bff: {},
    html: {},
    dev: {}
  };
  try {
    var content = fs.readFileSync(cliConfigPath, "utf-8");
    cliConfig = parse(content);
  } catch (_2) {
  }
  var mergedCliConfig = _.merge(defaultConfig, cliConfig);
  return mergedCliConfig;
}
export {
  loadServerCliConfig,
  loadServerRuntimeConfig
};
