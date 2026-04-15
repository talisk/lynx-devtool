import { createRuntimeExportsUtils, getEntryOptions } from "@modern-js/utils";
var PLUGIN_IDENTIFIER = "state";
var statePlugin = function() {
  return {
    name: "@modern-js/plugin-state",
    required: [
      "@modern-js/runtime"
    ],
    setup: function(api) {
      return {
        _internalRuntimePlugins: function _internalRuntimePlugins(param) {
          var entrypoint = param.entrypoint, plugins = param.plugins;
          var _getEntryOptions;
          var entryName = entrypoint.entryName, isMainEntry = entrypoint.isMainEntry;
          var userConfig = api.useResolvedConfigContext();
          var _api_useAppContext = api.useAppContext(), packageName = _api_useAppContext.packageName, metaName = _api_useAppContext.metaName;
          var stateConfig = (_getEntryOptions = getEntryOptions(entryName, isMainEntry, userConfig.runtime, userConfig.runtimeByEntries, packageName)) === null || _getEntryOptions === void 0 ? void 0 : _getEntryOptions.state;
          if (stateConfig) {
            plugins.push({
              name: PLUGIN_IDENTIFIER,
              path: "@".concat(metaName, "/runtime/model"),
              config: typeof stateConfig === "boolean" ? {} : stateConfig
            });
          }
          return {
            entrypoint,
            plugins
          };
        },
        addRuntimeExports: function addRuntimeExports() {
          var _api_useAppContext = api.useAppContext(), internalDirectory = _api_useAppContext.internalDirectory, metaName = _api_useAppContext.metaName;
          var pluginsExportsUtils = createRuntimeExportsUtils(internalDirectory, "plugins");
          pluginsExportsUtils.addExport("export { default as state } from '@".concat(metaName, "/runtime/model'"));
        }
      };
    }
  };
};
var cli_default = statePlugin;
export {
  cli_default as default,
  statePlugin
};
