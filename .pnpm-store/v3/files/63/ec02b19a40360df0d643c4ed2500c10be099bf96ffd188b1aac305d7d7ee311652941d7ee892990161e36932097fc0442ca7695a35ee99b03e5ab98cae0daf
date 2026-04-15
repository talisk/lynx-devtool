import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _class_call_check } from "@swc/helpers/_/_class_call_check";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import { _ as _to_consumable_array } from "@swc/helpers/_/_to_consumable_array";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import { createHash } from "crypto";
import { ROUTE_MANIFEST_FILE } from "@modern-js/utils";
import { merge, mergeWith } from "@modern-js/utils/lodash";
import { ROUTE_MANIFEST } from "@modern-js/utils/universal/constants";
var PLUGIN_NAME = "ModernjsRoutePlugin";
var generateContentHash = function(content) {
  return createHash("md5").update(content).digest("hex").slice(0, 8);
};
var RouterPlugin = /* @__PURE__ */ function() {
  "use strict";
  function RouterPlugin2(param) {
    var _param_staticJsDir = param.staticJsDir, staticJsDir = _param_staticJsDir === void 0 ? "static/js" : _param_staticJsDir, HtmlBundlerPlugin = param.HtmlBundlerPlugin, enableInlineRouteManifests = param.enableInlineRouteManifests, _param_disableFilenameHash = param.disableFilenameHash, disableFilenameHash = _param_disableFilenameHash === void 0 ? false : _param_disableFilenameHash, _param_scriptLoading = param.scriptLoading, scriptLoading = _param_scriptLoading === void 0 ? "defer" : _param_scriptLoading, nonce = param.nonce;
    _class_call_check(this, RouterPlugin2);
    this.name = "RouterPlugin";
    this.HtmlBundlerPlugin = HtmlBundlerPlugin;
    this.enableInlineRouteManifests = enableInlineRouteManifests;
    this.staticJsDir = staticJsDir;
    this.disableFilenameHash = disableFilenameHash;
    this.scriptLoading = scriptLoading;
    this.nonce = nonce;
  }
  var _proto = RouterPlugin2.prototype;
  _proto.isTargetNodeOrWebWorker = function isTargetNodeOrWebWorker(target) {
    if (target === "node" || Array.isArray(target) && target.includes("node")) {
      return true;
    }
    if (target === "webworker" || Array.isArray(target) && target.includes("webworker")) {
      return true;
    }
    return false;
  };
  _proto.getEntryChunks = function getEntryChunks(compilation, chunks) {
    var entrypointsArray = Array.from(compilation.entrypoints.entries());
    var entryChunkIds = entrypointsArray.map(function(entrypoint) {
      return entrypoint[0];
    });
    var entryChunks = _to_consumable_array(chunks).filter(function(chunk) {
      var _chunk_names;
      return (_chunk_names = chunk.names) === null || _chunk_names === void 0 ? void 0 : _chunk_names.some(function(name) {
        return entryChunkIds.includes(name);
      });
    });
    return entryChunks;
  };
  _proto.getEntryChunkFiles = function getEntryChunkFiles(entryChunks) {
    return entryChunks.map(function(chunk) {
      return _to_consumable_array(chunk.files || []).find(function(fname) {
        return fname.includes(".js");
      });
    });
  };
  _proto.apply = function apply(compiler) {
    var _this = this;
    var target = compiler.options.target;
    if (this.isTargetNodeOrWebWorker(target)) {
      return;
    }
    var webpack = compiler.webpack;
    var isRspack = "rspackVersion" in webpack;
    var Compilation = webpack.Compilation, sources = webpack.sources;
    var RawSource = sources.RawSource;
    var normalizePath = function(path) {
      if (!path.endsWith("/")) {
        return "".concat(path, "/");
      }
      return path;
    };
    var chunksToHtmlName = /* @__PURE__ */ new Map();
    var ROUTE_MANIFEST_HOLDER = "route-manifest";
    var placeholder = "<!--<?- ".concat(ROUTE_MANIFEST_HOLDER, " ?>-->");
    compiler.hooks.thisCompilation.tap(PLUGIN_NAME, function(compilation) {
      _this.HtmlBundlerPlugin.getHooks(compilation).beforeEmit.tapAsync("RouterManifestPlugin", function(data, callback) {
        var outputName = data.outputName;
        var chunks = data.plugin.options.chunks;
        chunksToHtmlName.set(chunks, outputName);
        data.html = data.html.replace("</script>", "</script>".concat(placeholder));
        callback(null, data);
      });
      var _this1 = _this;
      compilation.hooks.processAssets.tapPromise({
        name: PLUGIN_NAME,
        stage: Compilation.PROCESS_ASSETS_STAGE_REPORT
      }, /* @__PURE__ */ _async_to_generator(function() {
        var _loop, stats, publicPath, _stats_chunks, chunks, namedChunkGroups, routeAssets, prevManifestAsset, prevManifestStr, prevManifest, asyncEntryNames, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step_value, name, chunkGroup, assets, referenceCssAssets, _iteratorNormalCompletion1, _didIteratorError1, _iteratorError1, _iterator1, _step1, asyncEntryName, syncEntryName, syncEntry, asyncEntry, manifest, entryNames, entryChunks, orignalEntryIds, entryChunkFiles, entryChunkFileIds, i;
        return _ts_generator(this, function(_state) {
          _loop = function(i2) {
            var entryName = entryNames[i2];
            var file = entryChunkFiles[i2];
            var chunkNames = entryChunks[i2].names;
            var chunkId = entryChunkFileIds[i2];
            var asset = compilation.assets[file];
            if (!asset || !chunkId) {
              return "continue";
            }
            var relatedAssets = {};
            if (entryChunkFiles.length > 1) {
              Object.keys(routeAssets).forEach(function(routeId) {
                var segments = routeId.split("_");
                var chunkName = segments[0];
                if (chunkNames === null || chunkNames === void 0 ? void 0 : chunkNames.includes(chunkName)) {
                  relatedAssets[routeId] = routeAssets[routeId];
                }
              });
            } else {
              relatedAssets = routeAssets;
            }
            var manifest2 = {
              routeAssets: relatedAssets
            };
            var injectedContent = "\n            ;(function(){\n              window.".concat(ROUTE_MANIFEST, " = ").concat(JSON.stringify(manifest2, function(k, v) {
              if ((k === "assets" || k === "referenceCssAssets") && Array.isArray(v)) {
                return v.map(function(item) {
                  return item.replace(publicPath, "");
                });
              }
              return v;
            }), ";\n            })();\n          ");
            var htmlName = void 0;
            var _iteratorNormalCompletion2 = true, _didIteratorError2 = false, _iteratorError2 = void 0;
            try {
              var _loop2 = function() {
                var _step_value2 = _sliced_to_array(_step2.value, 2), chunks2 = _step_value2[0], name2 = _step_value2[1];
                if (Array.isArray(chunkNames) && Array.isArray(chunks2) && chunkNames.every(function(value, index) {
                  return value === chunks2[index];
                })) {
                  htmlName = name2;
                  return "break";
                }
              };
              for (var _iterator2 = chunksToHtmlName.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var _ret = _loop2();
                if (_ret === "break")
                  break;
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                  _iterator2.return();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }
            var oldHtml = compilation.assets[htmlName];
            var enableInlineRouteManifests = _this1.enableInlineRouteManifests, disableFilenameHash = _this1.disableFilenameHash, staticJsDir = _this1.staticJsDir, scriptLoading = _this1.scriptLoading, nonce = _this1.nonce;
            var nonceAttr = nonce ? 'nonce="'.concat(nonce, '"') : "";
            if (oldHtml) {
              if (enableInlineRouteManifests) {
                compilation.updateAsset(
                  htmlName,
                  new RawSource(oldHtml.source().toString().replace(placeholder, "<script ".concat(nonceAttr, ">").concat(injectedContent, "</script>"))),
                  // FIXME: The arguments third of updatgeAsset is a optional function in webpack.
                  void 0
                );
              } else {
                var scriptPath = "".concat(staticJsDir, "/").concat(ROUTE_MANIFEST_HOLDER, "-").concat(entryName).concat(disableFilenameHash ? ".js" : ".".concat(generateContentHash(injectedContent), ".js"));
                var scriptUrl = "".concat(publicPath).concat(scriptPath);
                var scriptLoadingAttr = scriptLoading === "defer" ? scriptLoading : scriptLoading === "module" ? 'type="module"' : "";
                var script = "<script ".concat(scriptLoadingAttr, " ").concat(nonceAttr, ' src="').concat(scriptUrl, '"></script>');
                compilation.updateAsset(
                  htmlName,
                  new RawSource(oldHtml.source().toString().replace(placeholder, script)),
                  // FIXME: The arguments third of updatgeAsset is a optional function in webpack.
                  void 0
                );
                compilation.emitAsset(scriptPath, new RawSource(injectedContent));
              }
            }
          };
          stats = compilation.getStats().toJson({
            all: false,
            publicPath: true,
            assets: true,
            chunkGroups: true,
            chunks: true,
            ids: true
          });
          publicPath = stats.publicPath, _stats_chunks = stats.chunks, chunks = _stats_chunks === void 0 ? [] : _stats_chunks, namedChunkGroups = stats.namedChunkGroups;
          routeAssets = {};
          if (!namedChunkGroups) {
            return [
              2
            ];
          }
          prevManifestAsset = compilation.getAsset(ROUTE_MANIFEST_FILE);
          prevManifestStr = prevManifestAsset ? prevManifestAsset.source.source().toString() : JSON.stringify({
            routeAssets: {}
          });
          prevManifest = JSON.parse(prevManifestStr);
          asyncEntryNames = [];
          _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
          try {
            for (_iterator = Object.entries(namedChunkGroups)[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              _step_value = _sliced_to_array(_step.value, 2), name = _step_value[0], chunkGroup = _step_value[1];
              if (name.startsWith("async-")) {
                asyncEntryNames.push(name);
              }
              assets = chunkGroup.assets.map(function(asset) {
                var filename = asset.name;
                return publicPath ? normalizePath(publicPath) + filename : filename;
              });
              referenceCssAssets = assets.filter(function(asset) {
                return /\.css$/.test(asset);
              });
              routeAssets[name] = {
                chunkIds: chunkGroup.chunks,
                assets,
                referenceCssAssets
              };
              if (prevManifest.routeAssets[name]) {
                mergeWith(routeAssets[name], prevManifest.routeAssets[name], function(obj, source) {
                  if (Array.isArray(obj)) {
                    return obj.concat(source);
                  }
                  return Object.assign(source, obj);
                });
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
          if (asyncEntryNames.length > 0) {
            _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = void 0;
            try {
              for (_iterator1 = asyncEntryNames[Symbol.iterator](); !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true) {
                asyncEntryName = _step1.value;
                syncEntryName = asyncEntryName.replace("async-", "");
                syncEntry = routeAssets[syncEntryName];
                asyncEntry = routeAssets[asyncEntryName];
                merge(syncEntry, asyncEntry);
              }
            } catch (err) {
              _didIteratorError1 = true;
              _iteratorError1 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                  _iterator1.return();
                }
              } finally {
                if (_didIteratorError1) {
                  throw _iteratorError1;
                }
              }
            }
          }
          manifest = {
            routeAssets
          };
          entryNames = Array.from(compilation.entrypoints.keys());
          entryChunks = [];
          if (isRspack) {
            entryChunks = _this1.getEntryChunks(compilation, chunks);
          } else {
            orignalEntryIds = Object.keys(compilation.options.entry).map(function(entryName) {
              var chunk = compilation.namedChunks.get(entryName);
              if (chunk) {
                return chunk.id;
              }
              return entryName;
            });
            entryChunks = _this1.getEntryChunks(compilation, chunks).filter(function(chunk) {
              return orignalEntryIds.includes(chunk.id);
            });
          }
          entryChunkFiles = _this1.getEntryChunkFiles(entryChunks);
          entryChunkFileIds = entryChunks.map(function(chunk) {
            return chunk.id;
          });
          for (i = 0; i < entryChunkFiles.length; i++)
            _loop(i);
          if (prevManifestAsset) {
            compilation.updateAsset(
              ROUTE_MANIFEST_FILE,
              new RawSource(JSON.stringify(manifest, null, 2)),
              // FIXME: The arguments third of updatgeAsset is a optional function in webpack.
              void 0
            );
          } else {
            compilation.emitAsset(ROUTE_MANIFEST_FILE, new RawSource(JSON.stringify(manifest, null, 2)));
          }
          return [
            2
          ];
        });
      }));
    });
  };
  return RouterPlugin2;
}();
export {
  RouterPlugin
};
