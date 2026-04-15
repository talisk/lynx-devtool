import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import { compatibleRequire, tryResolve } from "@modern-js/utils";
function resolveServerPlugin(plugin, appDirectory) {
  return _resolveServerPlugin.apply(this, arguments);
}
function _resolveServerPlugin() {
  _resolveServerPlugin = _async_to_generator(function(plugin, appDirectory) {
    var name, options, pluginPath, module, pluginInstance;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          name = plugin.name, options = plugin.options;
          pluginPath = tryResolve(name, appDirectory);
          return [
            4,
            compatibleRequire(pluginPath)
          ];
        case 1:
          module = _state.sent();
          pluginInstance = module(options);
          return [
            2,
            pluginInstance
          ];
      }
    });
  });
  return _resolveServerPlugin.apply(this, arguments);
}
function loadServerPlugins(serverPlugins, appDirectory) {
  return _loadServerPlugins.apply(this, arguments);
}
function _loadServerPlugins() {
  _loadServerPlugins = _async_to_generator(function(serverPlugins, appDirectory) {
    var instances;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          return [
            4,
            Promise.all(serverPlugins.map(function(plugin) {
              return resolveServerPlugin(plugin, appDirectory);
            }))
          ];
        case 1:
          instances = _state.sent();
          return [
            2,
            instances
          ];
      }
    });
  });
  return _loadServerPlugins.apply(this, arguments);
}
export {
  loadServerPlugins
};
