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
var minimize_exports = {};
__export(minimize_exports, {
  pluginMinimize: () => pluginMinimize
});
module.exports = __toCommonJS(minimize_exports);
var import_utils = require("@modern-js/utils");
function applyRemoveConsole(options, config) {
  const { removeConsole } = config.performance;
  const compressOptions = typeof options.terserOptions.compress === "boolean" ? {} : options.terserOptions.compress || {};
  if (removeConsole === true) {
    options.terserOptions.compress = {
      ...compressOptions,
      drop_console: true
    };
  } else if (Array.isArray(removeConsole)) {
    const pureFuncs = removeConsole.map((method) => `console.${method}`);
    options.terserOptions.compress = {
      ...compressOptions,
      pure_funcs: pureFuncs
    };
  }
  return options;
}
async function applyJSMinimizer(chain, config, CHAIN_ID, userTerserConfig) {
  const { default: TerserPlugin } = await Promise.resolve().then(() => __toESM(require("terser-webpack-plugin")));
  const DEFAULT_OPTIONS = {
    terserOptions: {
      mangle: {
        safari10: true
      },
      format: {
        ascii_only: config.output.charset === "ascii"
      }
    }
  };
  applyRemoveConsole(DEFAULT_OPTIONS, config);
  switch (config.output.legalComments) {
    case "inline":
      DEFAULT_OPTIONS.extractComments = false;
      break;
    case "linked":
      DEFAULT_OPTIONS.extractComments = true;
      break;
    case "none":
      DEFAULT_OPTIONS.terserOptions.format.comments = false;
      DEFAULT_OPTIONS.extractComments = false;
      break;
    default:
      break;
  }
  const mergedOptions = (0, import_utils.applyOptionsChain)(DEFAULT_OPTIONS, userTerserConfig);
  chain.optimization.minimizer(CHAIN_ID.MINIMIZER.JS).use(TerserPlugin, [
    // Due to terser-webpack-plugin has changed the type of class, which using a generic type in
    // constructor, leading auto inference of parameters of plugin constructor is not possible, using any instead
    mergedOptions
  ]).end();
}
const pluginMinimize = (userTerserConfig) => ({
  name: "uni-builder:minimize",
  setup(api) {
    api.modifyBundlerChain(async (chain, { isProd, CHAIN_ID, environment }) => {
      const { config } = environment;
      const { minify } = config.output;
      if (minify === false || !isProd) {
        return;
      }
      if (minify === true || (minify === null || minify === void 0 ? void 0 : minify.js) !== false) {
        await applyJSMinimizer(chain, config, CHAIN_ID, userTerserConfig);
      }
    });
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pluginMinimize
});
