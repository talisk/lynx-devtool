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
var compatLegacyPlugin_exports = {};
__export(compatLegacyPlugin_exports, {
  compatLegacyPlugin: () => compatLegacyPlugin
});
module.exports = __toCommonJS(compatLegacyPlugin_exports);
var import_path = require("path");
var import_core = require("@rsbuild/core");
function addDeprecatedWarning(pluginName, name, newName) {
  import_core.logger.warn(`Plugin(${pluginName})'s api '${name}' is deprecated${newName ? `, please use '${newName}' instead.` : "."}`);
}
function compatLegacyPlugin(plugin, extraInfo) {
  return {
    ...plugin,
    setup: (api) => {
      const builderContext = new Proxy(api.context, {
        get(target, prop) {
          switch (prop) {
            case "target":
              throw new Error(`Plugin(${plugin.name})'s api 'target' is deprecated, please use 'environment.config.output.target' instead.`);
            case "srcPath":
              addDeprecatedWarning(plugin.name, "context.srcPath");
              return (0, import_path.join)(extraInfo.cwd, "src");
            case "framework":
              addDeprecatedWarning(plugin.name, "context.framework");
              return "";
            case "entry":
              throw new Error(`Plugin(${plugin.name})'s api 'entry' is deprecated, please use 'environment.entry' instead.`);
            default: {
              if (prop in target) {
                return target[prop];
              } else {
                return void 0;
              }
            }
          }
        },
        set(_target, prop) {
          import_core.logger.error(`Context is readonly, you can not assign to the "context.${prop}" prop.`);
          return true;
        }
      });
      const legacyAPI = {
        ...api,
        context: builderContext,
        getBuilderConfig: () => {
          addDeprecatedWarning(plugin.name, "getBuilderConfig", "getRsbuildConfig");
          return api.getRsbuildConfig();
        },
        modifyBuilderConfig: (fn) => {
          api.modifyRsbuildConfig((config, { mergeRsbuildConfig }) => {
            addDeprecatedWarning(plugin.name, "modifyBuilderConfig", "modifyRsbuildConfig");
            return fn(config, {
              mergeBuilderConfig: mergeRsbuildConfig
            });
          });
        }
      };
      return plugin.setup(legacyAPI);
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  compatLegacyPlugin
});
