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
var src_exports = {};
__export(src_exports, {
  pluginEsbuild: () => pluginEsbuild
});
module.exports = __toCommonJS(src_exports);
var import_path = __toESM(require("path"));
const JS_REGEX = /\.(?:js|mjs|cjs|jsx)$/;
const TS_REGEX = /\.(?:ts|mts|cts|tsx)$/;
const NODE_MODULES_REGEX = /[\\/]node_modules[\\/]/;
const castArray = (arr) => {
  if (arr === void 0) {
    return [];
  }
  return Array.isArray(arr) ? arr : [
    arr
  ];
};
function applyScriptCondition({ rule, chain, config, context, includes, excludes }) {
  rule.include.add({
    and: [
      context.rootPath,
      {
        not: NODE_MODULES_REGEX
      }
    ]
  });
  rule.include.add(/\.(?:ts|tsx|jsx|mts|cts)$/);
  const target = castArray(chain.get("target"));
  const legacyTarget = [
    "es5",
    "es6",
    "es2015",
    "es2016"
  ];
  if (legacyTarget.some((item) => target.includes(item))) {
    rule.include.add(/[\\/]@rsbuild[\\/]core[\\/]dist[\\/]/);
  }
  for (const condition of [
    ...includes,
    ...config.source.include || []
  ]) {
    rule.include.add(condition);
  }
  for (const condition of [
    ...excludes,
    ...config.source.exclude || []
  ]) {
    rule.exclude.add(condition);
  }
}
function pluginEsbuild(userOptions = {}) {
  return {
    name: "modernjs:esbuild",
    setup(api) {
      api.modifyBundlerChain(async (chain, { CHAIN_ID, isProd, target, environment }) => {
        const rsbuildConfig = environment.config;
        const esbuildLoaderPath = import_path.default.join(__dirname, "../compiled/esbuild-loader/index.js");
        const options = {
          loader: {
            target: "es2015",
            charset: rsbuildConfig.output.charset
          },
          minimize: {
            css: true,
            target: "es2015",
            format: target === "web" ? "iife" : void 0
          },
          ...userOptions
        };
        if (options.loader !== false) {
          chain.module.rule(CHAIN_ID.RULE.JS).uses.delete(CHAIN_ID.USE.BABEL);
          chain.module.rule(CHAIN_ID.RULE.TS).uses.delete(CHAIN_ID.USE.BABEL).delete(CHAIN_ID.USE.TS);
          chain.module.rule(CHAIN_ID.RULE.JS).test(JS_REGEX).use("esbuild").loader(esbuildLoaderPath).options({
            loader: "jsx",
            ...options === null || options === void 0 ? void 0 : options.loader
          });
          const rule = chain.module.rule(CHAIN_ID.RULE.TS);
          rule.test(TS_REGEX).use("esbuild").loader(esbuildLoaderPath).options({
            loader: "tsx",
            ...options === null || options === void 0 ? void 0 : options.loader
          });
          applyScriptCondition({
            chain,
            rule,
            config: rsbuildConfig,
            context: api.context,
            includes: [],
            excludes: []
          });
        }
        if (isProd && options.minimize !== false) {
          const { ESBuildMinifyPlugin } = await Promise.resolve().then(() => __toESM(require("../compiled/esbuild-loader")));
          chain.optimization.minimizers.delete(CHAIN_ID.MINIMIZER.JS).delete(CHAIN_ID.MINIMIZER.CSS);
          chain.optimization.minimizer("js-css").use(ESBuildMinifyPlugin).init(() => {
            var _rsbuildConfig_output;
            return new ESBuildMinifyPlugin({
              // other legalComments such as linked is not supported yet
              // https://github.com/privatenumber/esbuild-loader/issues/263
              legalComments: ((_rsbuildConfig_output = rsbuildConfig.output) === null || _rsbuildConfig_output === void 0 ? void 0 : _rsbuildConfig_output.legalComments) === "none" ? "none" : "inline",
              ...options === null || options === void 0 ? void 0 : options.minimize
            });
          });
        }
      });
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pluginEsbuild
});
