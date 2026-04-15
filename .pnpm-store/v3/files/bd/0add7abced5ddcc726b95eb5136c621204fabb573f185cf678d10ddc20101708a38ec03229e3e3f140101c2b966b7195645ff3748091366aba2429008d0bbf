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
var tsLoader_exports = {};
__export(tsLoader_exports, {
  pluginTsLoader: () => pluginTsLoader
});
module.exports = __toCommonJS(tsLoader_exports);
var import_web = require("@modern-js/babel-preset/web");
var import_utils = require("@modern-js/utils");
var import_plugin_babel = require("@rsbuild/plugin-babel");
var import_utils2 = require("../../shared/utils");
var import_babel = require("./babel");
const pluginTsLoader = (options, babelOptions) => {
  return {
    name: "uni-builder:ts-loader",
    pre: [
      "uni-builder:babel"
    ],
    setup(api) {
      api.modifyBundlerChain({
        order: "pre",
        handler: async (chain, { isProd, target, CHAIN_ID, environment }) => {
          var _baseBabelConfig_presets;
          const { config } = environment;
          const { rootPath } = api.context;
          const browserslist = await (0, import_utils2.getBrowserslistWithDefault)(rootPath, config, target);
          const baseBabelConfig = (0, import_web.getBabelConfigForWeb)({
            presetEnv: {
              targets: browserslist,
              useBuiltIns: (0, import_utils2.getUseBuiltIns)(config)
            }
          });
          (_baseBabelConfig_presets = baseBabelConfig.presets) === null || _baseBabelConfig_presets === void 0 ? void 0 : _baseBabelConfig_presets.push((0, import_babel.getPresetReact)(api.context.rootPath, isProd));
          const babelUtils = (0, import_plugin_babel.getBabelUtils)(baseBabelConfig);
          const babelLoaderOptions = (0, import_utils.applyOptionsChain)(baseBabelConfig, babelOptions, babelUtils);
          const includes = [];
          const excludes = [];
          const tsLoaderUtils = {
            addIncludes(items) {
              includes.push(...(0, import_utils2.castArray)(items));
            },
            addExcludes(items) {
              excludes.push(...(0, import_utils2.castArray)(items));
            }
          };
          const tsLoaderDefaultOptions = {
            compilerOptions: {
              target: "esnext",
              module: "esnext"
            },
            transpileOnly: true,
            allowTsInNodeModules: true
          };
          const tsLoaderOptions = (0, import_utils.applyOptionsChain)(
            // @ts-expect-error ts-loader has incorrect types for compilerOptions
            tsLoaderDefaultOptions,
            options,
            tsLoaderUtils
          );
          const rule = chain.module.rule(CHAIN_ID.RULE.TS);
          (0, import_utils2.applyScriptCondition)({
            chain,
            rule,
            config,
            context: api.context,
            includes,
            excludes
          });
          chain.module.rule(CHAIN_ID.RULE.JS).test(import_utils2.JS_REGEX);
          rule.test(import_utils2.TS_REGEX).use(CHAIN_ID.USE.BABEL).loader(require.resolve("babel-loader")).options({
            ...babelLoaderOptions,
            // fix repeatedly insert babel plugin in some boundary cases
            plugins: [
              ...babelLoaderOptions.plugins || []
            ],
            presets: [
              ...babelLoaderOptions.presets || []
            ]
          }).end().use(CHAIN_ID.USE.TS).loader(require.resolve("ts-loader")).options(tsLoaderOptions);
        }
      });
    }
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pluginTsLoader
});
