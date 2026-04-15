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
var environmentDefaults_exports = {};
__export(environmentDefaults_exports, {
  pluginEnvironmentDefaults: () => pluginEnvironmentDefaults
});
module.exports = __toCommonJS(environmentDefaults_exports);
var import_node_path = require("node:path");
var import_utils = require("../utils");
const pluginEnvironmentDefaults = (distPath = {}) => ({
  name: "uni-builder:environment-defaults-plugin",
  setup(api) {
    api.modifyRsbuildConfig((config, { mergeRsbuildConfig }) => {
      var _config_environments, _config_environments1;
      const compatConfig = {};
      if ((_config_environments = config.environments) === null || _config_environments === void 0 ? void 0 : _config_environments[import_utils.SERVICE_WORKER_ENVIRONMENT_NAME]) {
        var _compatConfig;
        var _environments;
        (_environments = (_compatConfig = compatConfig).environments) !== null && _environments !== void 0 ? _environments : _compatConfig.environments = {};
        compatConfig.environments[import_utils.SERVICE_WORKER_ENVIRONMENT_NAME] = {
          output: {
            polyfill: "off",
            distPath: {
              root: (0, import_node_path.join)(distPath.root || "dist", distPath.worker || "worker"),
              js: "",
              css: "",
              jsAsync: "",
              cssAsync: ""
            },
            filename: {
              js: "[name].js"
            }
          }
        };
      }
      if ((_config_environments1 = config.environments) === null || _config_environments1 === void 0 ? void 0 : _config_environments1.node) {
        var _compatConfig1;
        var _environments1;
        (_environments1 = (_compatConfig1 = compatConfig).environments) !== null && _environments1 !== void 0 ? _environments1 : _compatConfig1.environments = {};
        compatConfig.environments.node = {
          output: {
            // no need to emit assets for SSR bundles
            emitAssets: false,
            distPath: {
              root: (0, import_node_path.join)(distPath.root || "dist", distPath.server || "bundles"),
              js: "",
              css: "",
              jsAsync: "",
              cssAsync: ""
            }
          }
        };
      }
      return compatConfig.environments ? mergeRsbuildConfig(compatConfig, config) : config;
    });
    api.modifyRsbuildConfig({
      handler: (config) => {
        const environmentNameOrder = [
          "web",
          "node",
          "workerSSR"
        ];
        config.environments = Object.fromEntries(Object.entries(config.environments).sort((a1, a2) => environmentNameOrder.includes(a1[0]) ? environmentNameOrder.indexOf(a1[0]) - environmentNameOrder.indexOf(a2[0]) : 1));
      },
      order: "post"
    });
    api.modifyEnvironmentConfig(async (config, { name }) => {
      var _config_output;
      var _overrideBrowserslist;
      (_overrideBrowserslist = (_config_output = config.output).overrideBrowserslist) !== null && _overrideBrowserslist !== void 0 ? _overrideBrowserslist : _config_output.overrideBrowserslist = await (0, import_utils.getBrowserslistWithDefault)(api.context.rootPath, config, name === import_utils.SERVICE_WORKER_ENVIRONMENT_NAME ? "node" : config.output.target);
    });
    api.modifyBundlerChain(async (chain, { environment }) => {
      const isServiceWorker = environment.name === import_utils.SERVICE_WORKER_ENVIRONMENT_NAME;
      if (isServiceWorker) {
        chain.output.libraryTarget("commonjs2");
      }
    });
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pluginEnvironmentDefaults
});
