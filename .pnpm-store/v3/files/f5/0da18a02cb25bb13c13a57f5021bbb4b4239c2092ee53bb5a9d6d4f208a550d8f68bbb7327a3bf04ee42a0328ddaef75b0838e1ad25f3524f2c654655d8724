"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var cli_exports = {};
__export(cli_exports, {
  default: () => cli_default,
  statePlugin: () => statePlugin
});
module.exports = __toCommonJS(cli_exports);
var import_utils = require("@modern-js/utils");
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
        const stateConfig = (_getEntryOptions = (0, import_utils.getEntryOptions)(entryName, isMainEntry, userConfig.runtime, userConfig.runtimeByEntries, packageName)) === null || _getEntryOptions === void 0 ? void 0 : _getEntryOptions.state;
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
        const pluginsExportsUtils = (0, import_utils.createRuntimeExportsUtils)(internalDirectory, "plugins");
        pluginsExportsUtils.addExport(`export { default as state } from '@${metaName}/runtime/model'`);
      }
    };
  }
});
var cli_default = statePlugin;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  statePlugin
});
