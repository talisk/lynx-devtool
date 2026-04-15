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
var createToolsConfig_exports = {};
__export(createToolsConfig_exports, {
  createToolsConfig: () => createToolsConfig
});
module.exports = __toCommonJS(createToolsConfig_exports);
function createToolsConfig(config) {
  const { autoprefixer, babel, minifyCss, terser, webpack, webpackChain, tsLoader, styledComponents, sass, postcss, less, htmlPlugin, devServer, tailwindcss, jest, esbuild } = config.tools;
  const { enableTsLoader } = config.output;
  return {
    tsLoader: enableTsLoader ? tsLoader : void 0,
    autoprefixer,
    babel,
    minifyCss,
    terser,
    webpack,
    webpackChain,
    styledComponents,
    sass,
    postcss,
    less,
    htmlPlugin,
    devServer,
    tailwindcss,
    jest,
    esbuild: {
      loader: false,
      minimize: esbuild
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createToolsConfig
});
