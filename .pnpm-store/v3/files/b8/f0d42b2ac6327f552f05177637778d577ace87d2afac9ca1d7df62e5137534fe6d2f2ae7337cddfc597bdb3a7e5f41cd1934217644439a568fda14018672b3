import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _type_of } from "@swc/helpers/_/_type_of";
import path from "path";
import { LOADABLE_STATS_FILE, isUseSSRBundle } from "@modern-js/utils";
var hasStringSSREntry = function(userConfig) {
  var isStreaming = function(ssr) {
    return ssr && (typeof ssr === "undefined" ? "undefined" : _type_of(ssr)) === "object" && ssr.mode === "stream";
  };
  var server = userConfig.server, output = userConfig.output;
  if (((server === null || server === void 0 ? void 0 : server.ssr) || output.ssg) && !isStreaming(server.ssr)) {
    return true;
  }
  if ((server === null || server === void 0 ? void 0 : server.ssrByEntries) && _type_of(server.ssrByEntries) === "object") {
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
    try {
      for (var _iterator = Object.keys(server.ssrByEntries)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var name = _step.value;
        if (server.ssrByEntries[name] && !isStreaming(server.ssrByEntries[name])) {
          return true;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
  return false;
};
var checkUseStringSSR = function(config) {
  var output = config.output;
  return Boolean(output === null || output === void 0 ? void 0 : output.ssg) || hasStringSSREntry(config);
};
var ssrBuilderPlugin = function(modernAPI) {
  return {
    name: "@modern-js/builder-plugin-ssr",
    setup: function setup(api) {
      api.modifyEnvironmentConfig(function(config, param) {
        var name = param.name, mergeEnvironmentConfig = param.mergeEnvironmentConfig;
        var isServerEnvironment = config.output.target === "node" || name === "workerSSR";
        var userConfig = modernAPI.useResolvedConfigContext();
        var useLoadablePlugin = isUseSSRBundle(userConfig) && !isServerEnvironment && checkUseStringSSR(userConfig);
        return mergeEnvironmentConfig(config, {
          source: {
            define: {
              "process.env.MODERN_TARGET": isServerEnvironment ? JSON.stringify("node") : JSON.stringify("browser")
            }
          },
          tools: {
            bundlerChain: useLoadablePlugin ? function(chain) {
              var LoadableBundlerPlugin = require("./loadable-bundler-plugin.js");
              chain.plugin("loadable").use(LoadableBundlerPlugin, [
                {
                  filename: LOADABLE_STATS_FILE
                }
              ]);
            } : void 0
          }
        });
      });
    }
  };
};
var ssrPlugin = function() {
  return {
    name: "@modern-js/plugin-ssr",
    required: [
      "@modern-js/runtime"
    ],
    setup: function(api) {
      var appContext = api.useAppContext();
      return {
        // for bundle
        config: function config() {
          var _api_useAppContext = api.useAppContext(), _api_useAppContext_bundlerType = _api_useAppContext.bundlerType, bundlerType = _api_useAppContext_bundlerType === void 0 ? "webpack" : _api_useAppContext_bundlerType;
          var babelHandler = function() {
            if (bundlerType === "webpack") {
              return function(config2) {
                var _config_plugins;
                var userConfig = api.useResolvedConfigContext();
                (_config_plugins = config2.plugins) === null || _config_plugins === void 0 ? void 0 : _config_plugins.push(path.join(__dirname, "./babel-plugin-ssr-loader-id"));
                if (isUseSSRBundle(userConfig) && checkUseStringSSR(userConfig)) {
                  var _config_plugins1;
                  (_config_plugins1 = config2.plugins) === null || _config_plugins1 === void 0 ? void 0 : _config_plugins1.push(require.resolve("@loadable/babel-plugin"));
                }
              };
            } else if (bundlerType === "rspack") {
              return function(config2) {
                var userConfig = api.useResolvedConfigContext();
                if (isUseSSRBundle(userConfig) && checkUseStringSSR(userConfig)) {
                  var _config_plugins, _config_plugins1;
                  (_config_plugins = config2.plugins) === null || _config_plugins === void 0 ? void 0 : _config_plugins.push(path.join(__dirname, "./babel-plugin-ssr-loader-id"));
                  (_config_plugins1 = config2.plugins) === null || _config_plugins1 === void 0 ? void 0 : _config_plugins1.push(require.resolve("@loadable/babel-plugin"));
                }
              };
            }
          }();
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
              bundlerChain: function(chain, param) {
                var isServer = param.isServer;
                if (isServer && appContext.moduleType === "module") {
                  chain.output.libraryTarget("module").set("chunkFormat", "module");
                  chain.output.library({
                    type: "module"
                  });
                  chain.experiments(_object_spread_props(_object_spread({}, chain.get("experiments")), {
                    outputModule: true
                  }));
                }
              }
            }
          };
        }
      };
    }
  };
};
var ssr_default = ssrPlugin;
export {
  ssr_default as default,
  ssrPlugin
};
