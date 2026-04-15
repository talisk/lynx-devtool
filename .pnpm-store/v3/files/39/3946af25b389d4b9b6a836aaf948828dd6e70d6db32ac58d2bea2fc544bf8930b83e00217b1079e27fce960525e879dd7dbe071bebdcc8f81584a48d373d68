var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
import { _ as _class_call_check } from "@swc/helpers/_/_class_call_check";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _to_consumable_array } from "@swc/helpers/_/_to_consumable_array";
import path from "path";
import { fs } from "@modern-js/utils";
var require_loadable_bundler_plugin = __commonJS({
  "src/cli/ssr/loadable-bundler-plugin.ts"(exports, module) {
    var LoadablePlugin = /* @__PURE__ */ function() {
      "use strict";
      function LoadablePlugin2() {
        var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
          filename: "loadable-stats.json",
          outputAsset: true,
          chunkLoadingGlobal: "__LOADABLE_LOADED_CHUNKS__"
        }, _ref_filename = _ref.filename, filename = _ref_filename === void 0 ? "loadable-stats.json" : _ref_filename, path2 = _ref.path, writeToDisk = _ref.writeToDisk, _ref_outputAsset = _ref.outputAsset, outputAsset = _ref_outputAsset === void 0 ? true : _ref_outputAsset, _ref_chunkLoadingGlobal = _ref.chunkLoadingGlobal, chunkLoadingGlobal = _ref_chunkLoadingGlobal === void 0 ? "__LOADABLE_LOADED_CHUNKS__" : _ref_chunkLoadingGlobal;
        _class_call_check(this, LoadablePlugin2);
        this.opts = {
          filename,
          path: path2,
          writeToDisk,
          outputAsset,
          chunkLoadingGlobal
        };
        this.compiler = null;
      }
      var _proto = LoadablePlugin2.prototype;
      _proto.apply = function apply(compiler) {
        var _this = this;
        this.compiler = compiler;
        compiler.options.output.chunkLoadingGlobal = this.opts.chunkLoadingGlobal;
        if (this.opts.outputAsset || this.opts.writeToDisk) {
          compiler.hooks.make.tap(LoadablePlugin2.name, function(compilation) {
            compilation.hooks.processAssets.tap({
              name: LoadablePlugin2.name,
              stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_REPORT
            }, function() {
              var asset = _this.handleEmit(compilation);
              if (asset) {
                compilation.emitAsset(_this.opts.filename, asset);
              }
            });
          });
        }
      };
      _proto.handleEmit = function handleEmit(compilation) {
        var stats = compilation.getStats().toJson({
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
        var output = _object_spread_props(_object_spread({}, stats), {
          generator: "loadable-components",
          chunks: _to_consumable_array(stats.chunks || []).map(function(chunk) {
            return {
              id: chunk.id,
              files: _to_consumable_array(chunk.files || [])
            };
          })
        });
        var result = JSON.stringify(output, null, 2);
        if (this.opts.writeToDisk) {
          this.writeAssetsFile(result);
        }
        if (this.opts.outputAsset) {
          return {
            source: function source() {
              return result;
            },
            size: function size() {
              return result.length;
            }
          };
        }
        return null;
      };
      _proto.writeAssetsFile = function writeAssetsFile(manifest) {
        var _this_compiler;
        var outputFolder = (_this_compiler = this.compiler) === null || _this_compiler === void 0 ? void 0 : _this_compiler.options.output.path;
        var outputFile = path.resolve(outputFolder || "", this.opts.filename);
        fs.outputFileSync(outputFile, manifest);
      };
      return LoadablePlugin2;
    }();
    module.exports = LoadablePlugin;
  }
});
export default require_loadable_bundler_plugin();
