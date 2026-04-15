import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _type_of } from "@swc/helpers/_/_type_of";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import * as path from "path";
import { SERVICE_WORKER_ENVIRONMENT_NAME, isHtmlDisabled } from "@modern-js/uni-builder";
import { fs, isUseSSRBundle } from "@modern-js/utils";
import { mergeRsbuildConfig } from "@rsbuild/core";
import { getServerCombinedModueFile } from "../../../plugins/analyze/utils";
import { HtmlAsyncChunkPlugin, RouterPlugin } from "../bundlerPlugins";
var builderPluginAdapterSSR = function(options) {
  return {
    name: "builder-plugin-adapter-modern-ssr",
    setup: function setup(api) {
      var normalizedConfig = options.normalizedConfig;
      api.modifyRsbuildConfig(function(config) {
        return mergeRsbuildConfig(config, {
          html: {
            inject: isStreamingSSR(normalizedConfig) ? "body" : void 0
          },
          server: {
            // the http-compression can't handler stream http.
            // so we disable compress when user use stream ssr temporarily.
            compress: isStreamingSSR(normalizedConfig) ? false : void 0
          }
        });
      });
      api.modifyBundlerChain(function() {
        var _ref = _async_to_generator(function(chain, param) {
          var target, isProd, HtmlBundlerPlugin, isServer, environment, builderConfig, normalizedConfig2, isServiceWorker;
          return _ts_generator(this, function(_state) {
            switch (_state.label) {
              case 0:
                target = param.target, isProd = param.isProd, HtmlBundlerPlugin = param.HtmlPlugin, isServer = param.isServer, environment = param.environment;
                builderConfig = environment.config;
                normalizedConfig2 = options.normalizedConfig;
                applyRouterPlugin(chain, "route-plugin", options, HtmlBundlerPlugin);
                isServiceWorker = environment.name === SERVICE_WORKER_ENVIRONMENT_NAME;
                if (target === "node" || isServiceWorker) {
                  applyFilterEntriesBySSRConfig({
                    isProd,
                    chain,
                    appNormalizedConfig: normalizedConfig2
                  });
                }
                if (!isUseSSRBundle(normalizedConfig2))
                  return [
                    3,
                    2
                  ];
                return [
                  4,
                  applySSRLoaderEntry(chain, options, isServer)
                ];
              case 1:
                _state.sent();
                applySSRDataLoader(chain, options);
                _state.label = 2;
              case 2:
                if (!isHtmlDisabled(builderConfig, target)) {
                  applyAsyncChunkHtmlPlugin({
                    chain,
                    modernConfig: options.normalizedConfig,
                    HtmlBundlerPlugin
                  });
                }
                return [
                  2
                ];
            }
          });
        });
        return function(chain, _) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  };
};
var isStreamingSSR = function(userConfig) {
  var isStreaming = function(ssr) {
    return ssr && (typeof ssr === "undefined" ? "undefined" : _type_of(ssr)) === "object" && ssr.mode === "stream";
  };
  var server = userConfig.server;
  if (isStreaming(server.ssr)) {
    return true;
  }
  if ((server === null || server === void 0 ? void 0 : server.ssrByEntries) && _type_of(server.ssrByEntries) === "object") {
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
    try {
      for (var _iterator = Object.keys(server.ssrByEntries)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var name = _step.value;
        if (isStreaming(server.ssrByEntries[name])) {
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
function applyAsyncChunkHtmlPlugin(param) {
  var chain = param.chain, modernConfig = param.modernConfig, HtmlBundlerPlugin = param.HtmlBundlerPlugin;
  if (isStreamingSSR(modernConfig)) {
    chain.plugin("html-async-chunk").use(HtmlAsyncChunkPlugin, [
      HtmlBundlerPlugin
    ]);
  }
}
function applyRouterPlugin(chain, pluginName, options, HtmlBundlerPlugin) {
  var _normalizedConfig_runtime, _normalizedConfig_deploy_worker;
  var appContext = options.appContext, normalizedConfig = options.normalizedConfig;
  var entrypoints = appContext.entrypoints;
  var existNestedRoutes = entrypoints.some(function(entrypoint) {
    return entrypoint.nestedRoutesEntry;
  });
  var routerConfig = normalizedConfig === null || normalizedConfig === void 0 ? void 0 : (_normalizedConfig_runtime = normalizedConfig.runtime) === null || _normalizedConfig_runtime === void 0 ? void 0 : _normalizedConfig_runtime.router;
  var routerManifest = Boolean(routerConfig === null || routerConfig === void 0 ? void 0 : routerConfig.manifest);
  var workerSSR = Boolean((_normalizedConfig_deploy_worker = normalizedConfig.deploy.worker) === null || _normalizedConfig_deploy_worker === void 0 ? void 0 : _normalizedConfig_deploy_worker.ssr);
  var _normalizedConfig_output = normalizedConfig.output, enableInlineRouteManifests = _normalizedConfig_output.enableInlineRouteManifests, disableInlineRouteManifests = _normalizedConfig_output.disableInlineRouteManifests;
  var inlineRouteManifests = disableInlineRouteManifests ? !disableInlineRouteManifests : enableInlineRouteManifests;
  if (existNestedRoutes || routerManifest || workerSSR) {
    var _normalizedConfig_output_distPath, _normalizedConfig_output1, _normalizedConfig_output2, _normalizedConfig_html, _normalizedConfig_security;
    chain.plugin(pluginName).use(RouterPlugin, [
      {
        HtmlBundlerPlugin,
        enableInlineRouteManifests: inlineRouteManifests,
        staticJsDir: (_normalizedConfig_output1 = normalizedConfig.output) === null || _normalizedConfig_output1 === void 0 ? void 0 : (_normalizedConfig_output_distPath = _normalizedConfig_output1.distPath) === null || _normalizedConfig_output_distPath === void 0 ? void 0 : _normalizedConfig_output_distPath.js,
        disableFilenameHash: (_normalizedConfig_output2 = normalizedConfig.output) === null || _normalizedConfig_output2 === void 0 ? void 0 : _normalizedConfig_output2.disableFilenameHash,
        scriptLoading: (_normalizedConfig_html = normalizedConfig.html) === null || _normalizedConfig_html === void 0 ? void 0 : _normalizedConfig_html.scriptLoading,
        nonce: (_normalizedConfig_security = normalizedConfig.security) === null || _normalizedConfig_security === void 0 ? void 0 : _normalizedConfig_security.nonce
      }
    ]);
  }
}
function applyFilterEntriesBySSRConfig(param) {
  var isProd = param.isProd, chain = param.chain, appNormalizedConfig = param.appNormalizedConfig;
  var _outputConfig_ssg;
  var serverConfig = appNormalizedConfig.server, outputConfig = appNormalizedConfig.output;
  var entries = chain.entryPoints.entries();
  if (isProd && ((outputConfig === null || outputConfig === void 0 ? void 0 : outputConfig.ssg) === true || typeof (outputConfig === null || outputConfig === void 0 ? void 0 : (_outputConfig_ssg = outputConfig.ssg) === null || _outputConfig_ssg === void 0 ? void 0 : _outputConfig_ssg[0]) === "function")) {
    return;
  }
  if (typeof entries === "undefined") {
    throw new Error("No entry found, one of src/routes/layout.tsx, src/App.tsx, src/index.tsx is required");
  }
  var entryNames = Object.keys(entries);
  if (isProd && entryNames.length === 1 && (outputConfig === null || outputConfig === void 0 ? void 0 : outputConfig.ssg)) {
    return;
  }
  var ssgEntries = [];
  if (isProd && (outputConfig === null || outputConfig === void 0 ? void 0 : outputConfig.ssg)) {
    var ssg = outputConfig.ssg;
    entryNames.forEach(function(name) {
      if (ssg[name]) {
        ssgEntries.push(name);
      }
    });
  }
  var _ref = serverConfig || {}, ssr = _ref.ssr, ssrByEntries = _ref.ssrByEntries;
  entryNames.forEach(function(name) {
    if (!ssgEntries.includes(name) && !name.includes("server-loaders") && (ssr && (ssrByEntries === null || ssrByEntries === void 0 ? void 0 : ssrByEntries[name]) === false || !ssr && !(ssrByEntries === null || ssrByEntries === void 0 ? void 0 : ssrByEntries[name]))) {
      chain.entryPoints.delete(name);
    }
  });
}
function applySSRLoaderEntry(chain, optinos, isServer) {
  return _applySSRLoaderEntry.apply(this, arguments);
}
function _applySSRLoaderEntry() {
  _applySSRLoaderEntry = _async_to_generator(function(chain, optinos, isServer) {
    var appContext, internalDirectory, entrypoints;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          appContext = optinos.appContext;
          internalDirectory = appContext.internalDirectory;
          entrypoints = appContext.entrypoints;
          return [
            4,
            Promise.all(entrypoints.map(function() {
              var _ref = _async_to_generator(function(entrypoint) {
                var entryName, serverLoadersFile, err;
                return _ts_generator(this, function(_state2) {
                  switch (_state2.label) {
                    case 0:
                      entryName = entrypoint.entryName;
                      serverLoadersFile = getServerCombinedModueFile(internalDirectory, entryName);
                      if (!isServer)
                        return [
                          3,
                          4
                        ];
                      _state2.label = 1;
                    case 1:
                      _state2.trys.push([
                        1,
                        3,
                        ,
                        4
                      ]);
                      return [
                        4,
                        fs.access(serverLoadersFile, fs.constants.F_OK)
                      ];
                    case 2:
                      _state2.sent();
                      chain.entry("".concat(entryName, "-server-loaders")).add(serverLoadersFile);
                      return [
                        3,
                        4
                      ];
                    case 3:
                      err = _state2.sent();
                      return [
                        3,
                        4
                      ];
                    case 4:
                      return [
                        2
                      ];
                  }
                });
              });
              return function(entrypoint) {
                return _ref.apply(this, arguments);
              };
            }()))
          ];
        case 1:
          _state.sent();
          return [
            2
          ];
      }
    });
  });
  return _applySSRLoaderEntry.apply(this, arguments);
}
function applySSRDataLoader(chain, options) {
  var normalizedConfig = options.normalizedConfig, appContext = options.appContext;
  var appDirectory = appContext.appDirectory;
  var _normalizedConfig_source = normalizedConfig.source, _normalizedConfig_source_entriesDir = _normalizedConfig_source.entriesDir, entriesDir = _normalizedConfig_source_entriesDir === void 0 ? "./src" : _normalizedConfig_source_entriesDir;
  var absolutePath = path.resolve(appDirectory, entriesDir).split(path.sep).join("(\\\\|/)");
  var reg = new RegExp("".concat(absolutePath, ".*\\.(loader|data|data.client)\\.[t|j]sx?$"));
  chain.module.rule("ssr-data-loader").test(reg).use("data-loader").loader(require.resolve("@modern-js/plugin-data-loader/loader")).end();
}
export {
  builderPluginAdapterSSR
};
