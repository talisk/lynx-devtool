import { getBabelConfigForNode } from "@modern-js/babel-preset/node";
import { aliasPlugin } from "./alias";
const getBabelConfig = (libPresetOption) => {
  var _config_presets, _config_plugins;
  const { isEsm } = libPresetOption;
  const config = getBabelConfigForNode({
    presetEnv: {
      loose: true,
      modules: isEsm ? false : "commonjs",
      targets: [
        "node >= 14"
      ]
    },
    pluginDecorators: {
      version: "legacy"
    }
  });
  (_config_presets = config.presets) === null || _config_presets === void 0 ? void 0 : _config_presets.push([
    require.resolve("@babel/preset-react"),
    {
      runtime: "automatic"
    }
  ]);
  if (libPresetOption.alias) {
    var _config_plugins1;
    (_config_plugins1 = config.plugins) === null || _config_plugins1 === void 0 ? void 0 : _config_plugins1.push(aliasPlugin(libPresetOption.alias));
  }
  (_config_plugins = config.plugins) === null || _config_plugins === void 0 ? void 0 : _config_plugins.push(require.resolve("babel-plugin-transform-typescript-metadata"));
  return config;
};
export * from "./types";
import { applyUserBabelConfig } from "@modern-js/utils";
export {
  applyUserBabelConfig,
  getBabelConfig
};
