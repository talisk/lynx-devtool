import { createRuntimeExportsUtils, getEntryOptions } from "@modern-js/utils";
const PLUGIN_IDENTIFIER = "state";
const statePlugin = () => ({
  name: "@modern-js/plugin-state",
  required: [
    "@modern-js/runtime"
  ],
  setup: (api) => {
    return {
      _internalRuntimePlugins({ entrypoint, plugins }) {
        var _getEntryOptions;
        const { entryName, isMainEntry } = entrypoint;
        const userConfig = api.useResolvedConfigContext();
        const { packageName, metaName } = api.useAppContext();
        const stateConfig = (_getEntryOptions = getEntryOptions(entryName, isMainEntry, userConfig.runtime, userConfig.runtimeByEntries, packageName)) === null || _getEntryOptions === void 0 ? void 0 : _getEntryOptions.state;
        if (stateConfig) {
          plugins.push({
            name: PLUGIN_IDENTIFIER,
            path: `@${metaName}/runtime/model`,
            config: typeof stateConfig === "boolean" ? {} : stateConfig
          });
        }
        return {
          entrypoint,
          plugins
        };
      },
      addRuntimeExports() {
        const { internalDirectory, metaName } = api.useAppContext();
        const pluginsExportsUtils = createRuntimeExportsUtils(internalDirectory, "plugins");
        pluginsExportsUtils.addExport(`export { default as state } from '@${metaName}/runtime/model'`);
      }
    };
  }
});
var cli_default = statePlugin;
export {
  cli_default as default,
  statePlugin
};
