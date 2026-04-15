import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _to_consumable_array } from "@swc/helpers/_/_to_consumable_array";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import path from "path";
import { fs, getServerConfig } from "@modern-js/utils";
var getPackageConfig = function(appDirectory, packageJsonConfig) {
  var PACKAGE_JSON_CONFIG_NAME = "modernConfig";
  var json = JSON.parse(fs.readFileSync(path.resolve(appDirectory, "./package.json"), "utf8"));
  return json[packageJsonConfig !== null && packageJsonConfig !== void 0 ? packageJsonConfig : PACKAGE_JSON_CONFIG_NAME];
};
var addServerConfigToDeps = function() {
  var _ref = _async_to_generator(function(dependencies, appDirectory, serverConfigFile) {
    var serverConfig;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          return [
            4,
            getServerConfig(appDirectory, serverConfigFile)
          ];
        case 1:
          serverConfig = _state.sent();
          if (serverConfig) {
            dependencies.push(serverConfig);
          }
          return [
            2
          ];
      }
    });
  });
  return function addServerConfigToDeps2(dependencies, appDirectory, serverConfigFile) {
    return _ref.apply(this, arguments);
  };
}();
function generateWatchFiles(appContext, configDir) {
  return _generateWatchFiles.apply(this, arguments);
}
function _generateWatchFiles() {
  _generateWatchFiles = _async_to_generator(function(appContext, configDir) {
    var appDirectory, configFile, configPath, dependencies;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          appDirectory = appContext.appDirectory, configFile = appContext.configFile;
          configPath = path.join(appDirectory, configDir || "");
          dependencies = getPackageConfig(appContext.appDirectory, appContext.packageName) ? [
            path.resolve(appDirectory, "./package.json")
          ] : [];
          return [
            4,
            addServerConfigToDeps(dependencies, appContext.appDirectory, appContext.serverConfigFile)
          ];
        case 1:
          _state.sent();
          return [
            2,
            [
              "".concat(configPath, "/html"),
              configFile || "./config"
            ].concat(_to_consumable_array(dependencies))
          ];
      }
    });
  });
  return _generateWatchFiles.apply(this, arguments);
}
export {
  addServerConfigToDeps,
  generateWatchFiles
};
