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
var fallback_exports = {};
__export(fallback_exports, {
  pluginFallback: () => pluginFallback
});
module.exports = __toCommonJS(fallback_exports);
var import_path = require("path");
var import_utils = require("../../shared/utils");
const HTML_REGEX = /\.html$/;
const resourceRuleFallback = (rules = []) => {
  const innerRules = [];
  const outerRules = [];
  for (const rule of rules) {
    if (!rule) {
      continue;
    }
    if (
      // "..." refers to the webpack defaults
      rule === "..." || // this is a special case, put the mjs fullySpecified rule in the outside
      rule.resolve && "fullySpecified" in rule.resolve && !rule.mimetype
    ) {
      outerRules.push(rule);
    } else if (rule.oneOf && !(rule.test || rule.exclude || rule.resource || rule.issuer || rule.mimetype)) {
      rule.oneOf.forEach((item) => {
        if (item) {
          innerRules.push(item);
        }
      });
    } else {
      innerRules.push(rule);
    }
  }
  const fileLoader = {
    exclude: [
      import_utils.JS_REGEX,
      import_utils.TS_REGEX,
      // exclude `html` and `json`, they get processed by webpack internal loaders.
      HTML_REGEX,
      /\.json$/
    ],
    type: "asset/resource"
  };
  return [
    ...outerRules,
    {
      oneOf: [
        ...innerRules,
        fileLoader
      ]
    }
  ];
};
const pluginFallback = () => ({
  name: "uni-builder:fallback",
  setup(api) {
    api.modifyBundlerChain((chain, { environment }) => {
      const rsbuildConfig = environment.config;
      const { distPath, filename } = rsbuildConfig.output;
      const distDir = distPath.media;
      var _filename_media;
      const mediaFilename = (_filename_media = filename.media) !== null && _filename_media !== void 0 ? _filename_media : `[name]${(0, import_utils.getHash)(rsbuildConfig)}[ext]`;
      chain.output.merge({
        assetModuleFilename: (0, import_path.join)(distDir, mediaFilename)
      });
    });
    if (api.context.bundlerType === "webpack") {
      api.modifyWebpackConfig((config) => {
        if (!config.module) {
          return;
        }
        config.module.rules = resourceRuleFallback(config.module.rules);
      });
    } else {
      api.modifyRspackConfig((config) => {
        var _config_module;
        var _config;
        if (!config.module) {
          return;
        }
        (_config = config).module || (_config.module = {});
        config.module.rules = resourceRuleFallback((_config_module = config.module) === null || _config_module === void 0 ? void 0 : _config_module.rules);
      });
    }
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pluginFallback
});
