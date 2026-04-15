"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var import_path = __toESM(require("path"));
var import_utils = require("@modern-js/utils");
class LoadablePlugin {
  apply(compiler) {
    this.compiler = compiler;
    compiler.options.output.chunkLoadingGlobal = this.opts.chunkLoadingGlobal;
    if (this.opts.outputAsset || this.opts.writeToDisk) {
      compiler.hooks.make.tap(LoadablePlugin.name, (compilation) => {
        compilation.hooks.processAssets.tap({
          name: LoadablePlugin.name,
          stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_REPORT
        }, () => {
          const asset = this.handleEmit(compilation);
          if (asset) {
            compilation.emitAsset(this.opts.filename, asset);
          }
        });
      });
    }
  }
  handleEmit(compilation) {
    const stats = compilation.getStats().toJson({
      all: false,
      assets: true,
      // rspack not support cachedAssets,
      cachedAssets: true,
      chunks: true,
      chunkGroups: true,
      entrypoints: true,
      // rspack not support chunkGroupChildren.
      chunkGroupChildren: true,
      hash: true,
      ids: true,
      outputPath: true,
      publicPath: true
    });
    const output = {
      ...stats,
      generator: "loadable-components",
      chunks: [
        ...stats.chunks || []
      ].map((chunk) => {
        return {
          id: chunk.id,
          files: [
            ...chunk.files || []
          ]
        };
      })
    };
    const result = JSON.stringify(output, null, 2);
    if (this.opts.writeToDisk) {
      this.writeAssetsFile(result);
    }
    if (this.opts.outputAsset) {
      return {
        source() {
          return result;
        },
        size() {
          return result.length;
        }
      };
    }
    return null;
  }
  writeAssetsFile(manifest) {
    var _this_compiler;
    const outputFolder = (_this_compiler = this.compiler) === null || _this_compiler === void 0 ? void 0 : _this_compiler.options.output.path;
    const outputFile = import_path.default.resolve(outputFolder || "", this.opts.filename);
    import_utils.fs.outputFileSync(outputFile, manifest);
  }
  constructor({ filename = "loadable-stats.json", path: path2, writeToDisk, outputAsset = true, chunkLoadingGlobal = "__LOADABLE_LOADED_CHUNKS__" } = {
    filename: "loadable-stats.json",
    outputAsset: true,
    chunkLoadingGlobal: "__LOADABLE_LOADED_CHUNKS__"
  }) {
    this.opts = {
      filename,
      path: path2,
      writeToDisk,
      outputAsset,
      chunkLoadingGlobal
    };
    this.compiler = null;
  }
}
module.exports = LoadablePlugin;
