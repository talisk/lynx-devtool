"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var ssr_exports = {};
__export(ssr_exports, {
  default: () => ssr_default,
  ssrPlugin: () => ssrPlugin
});
module.exports = __toCommonJS(ssr_exports);
var import_path = __toESM(require("path"));
var import_utils = require("@modern-js/utils");
const hasStringSSREntry = (userConfig) => {
  const isStreaming = (ssr) => ssr && typeof ssr === "object" && ssr.mode === "stream";
  const { server, output } = userConfig;
  if (((server === null || server === void 0 ? void 0 : server.ssr) || output.ssg) && !isStreaming(server.ssr)) {
    return true;
  }
  if ((server === null || server === void 0 ? void 0 : server.ssrByEntries) && typeof server.ssrByEntries === "object") {
    for (const name of Object.keys(server.ssrByEntries)) {
      if (server.ssrByEntries[name] && !isStreaming(server.ssrByEntries[name])) {
        return true;
      }
    }
  }
  return false;
};
const checkUseStringSSR = (config) => {
  const { output } = config;
  return Boolean(output === null || output === void 0 ? void 0 : output.ssg) || hasStringSSREntry(config);
};
const ssrBuilderPlugin = (modernAPI) => ({
  name: "@modern-js/builder-plugin-ssr",
  setup(api) {
    api.modifyEnvironmentConfig((config, { name, mergeEnvironmentConfig }) => {
      const isServerEnvironment = config.output.target === "node" || name === "workerSSR";
      const userConfig = modernAPI.useResolvedConfigContext();
      const useLoadablePlugin = (0, import_utils.isUseSSRBundle)(userConfig) && !isServerEnvironment && checkUseStringSSR(userConfig);
      return mergeEnvironmentConfig(config, {
        source: {
          define: {
            "process.env.MODERN_TARGET": isServerEnvironment ? JSON.stringify("node") : JSON.stringify("browser")
          }
        },
        tools: {
          bundlerChain: useLoadablePlugin ? (chain) => {
            const LoadableBundlerPlugin = require("./loadable-bundler-plugin.js");
            chain.plugin("loadable").use(LoadableBundlerPlugin, [
              {
                filename: import_utils.LOADABLE_STATS_FILE
              }
            ]);
          } : void 0
        }
      });
    });
  }
});
const ssrPlugin = () => ({
  name: "@modern-js/plugin-ssr",
  required: [
    "@modern-js/runtime"
  ],
  setup: (api) => {
    const appContext = api.useAppContext();
    return {
      // for bundle
      config() {
        const { bundlerType = "webpack" } = api.useAppContext();
        const babelHandler = (() => {
          if (bundlerType === "webpack") {
            return (config) => {
              var _config_plugins;
              const userConfig = api.useResolvedConfigContext();
              (_config_plugins = config.plugins) === null || _config_plugins === void 0 ? void 0 : _config_plugins.push(import_path.default.join(__dirname, "./babel-plugin-ssr-loader-id"));
              if ((0, import_utils.isUseSSRBundle)(userConfig) && checkUseStringSSR(userConfig)) {
                var _config_plugins1;
                (_config_plugins1 = config.plugins) === null || _config_plugins1 === void 0 ? void 0 : _config_plugins1.push(require.resolve("@loadable/babel-plugin"));
              }
            };
          } else if (bundlerType === "rspack") {
            return (config) => {
              const userConfig = api.useResolvedConfigContext();
              if ((0, import_utils.isUseSSRBundle)(userConfig) && checkUseStringSSR(userConfig)) {
                var _config_plugins, _config_plugins1;
                (_config_plugins = config.plugins) === null || _config_plugins === void 0 ? void 0 : _config_plugins.push(import_path.default.join(__dirname, "./babel-plugin-ssr-loader-id"));
                (_config_plugins1 = config.plugins) === null || _config_plugins1 === void 0 ? void 0 : _config_plugins1.push(require.resolve("@loadable/babel-plugin"));
              }
            };
          }
        })();
        return {
          builderPlugins: [
            ssrBuilderPlugin(api)
          ],
          source: {
            alias: {
              // ensure that all packages use the same storage in @modern-js/runtime-utils/node
              "@modern-js/runtime-utils/node$": require.resolve("@modern-js/runtime-utils/node")
            }
          },
          tools: {
            babel: babelHandler,
            bundlerChain: (chain, { isServer }) => {
              if (isServer && appContext.moduleType === "module") {
                chain.output.libraryTarget("module").set("chunkFormat", "module");
                chain.output.library({
                  type: "module"
                });
                chain.experiments({
                  ...chain.get("experiments"),
                  outputModule: true
                });
              }
            }
          }
        };
      }
    };
  }
});
var ssr_default = ssrPlugin;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ssrPlugin
});
