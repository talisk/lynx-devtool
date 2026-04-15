var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
import path from "path";
import { fs } from "@modern-js/utils";
var require_loadable_bundler_plugin = __commonJS({
  "src/cli/ssr/loadable-bundler-plugin.ts"(exports, module) {
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
        const outputFile = path.resolve(outputFolder || "", this.opts.filename);
        fs.outputFileSync(outputFile, manifest);
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
  }
});
export default require_loadable_bundler_plugin();
