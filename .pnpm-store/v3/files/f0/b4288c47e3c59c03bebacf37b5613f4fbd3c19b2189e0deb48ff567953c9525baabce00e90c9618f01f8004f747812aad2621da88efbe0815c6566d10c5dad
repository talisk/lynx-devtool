import { createHash } from "crypto";
import { ROUTE_MANIFEST_FILE } from "@modern-js/utils";
import { merge, mergeWith } from "@modern-js/utils/lodash";
import { ROUTE_MANIFEST } from "@modern-js/utils/universal/constants";
const PLUGIN_NAME = "ModernjsRoutePlugin";
const generateContentHash = (content) => {
  return createHash("md5").update(content).digest("hex").slice(0, 8);
};
class RouterPlugin {
  isTargetNodeOrWebWorker(target) {
    if (target === "node" || Array.isArray(target) && target.includes("node")) {
      return true;
    }
    if (target === "webworker" || Array.isArray(target) && target.includes("webworker")) {
      return true;
    }
    return false;
  }
  getEntryChunks(compilation, chunks) {
    const entrypointsArray = Array.from(compilation.entrypoints.entries());
    const entryChunkIds = entrypointsArray.map((entrypoint) => entrypoint[0]);
    const entryChunks = [
      ...chunks
    ].filter((chunk) => {
      var _chunk_names;
      return (_chunk_names = chunk.names) === null || _chunk_names === void 0 ? void 0 : _chunk_names.some((name) => entryChunkIds.includes(name));
    });
    return entryChunks;
  }
  getEntryChunkFiles(entryChunks) {
    return entryChunks.map((chunk) => [
      ...chunk.files || []
    ].find((fname) => fname.includes(".js")));
  }
  apply(compiler) {
    const { target } = compiler.options;
    if (this.isTargetNodeOrWebWorker(target)) {
      return;
    }
    const { webpack } = compiler;
    const isRspack = "rspackVersion" in webpack;
    const { Compilation, sources } = webpack;
    const { RawSource } = sources;
    const normalizePath = (path) => {
      if (!path.endsWith("/")) {
        return `${path}/`;
      }
      return path;
    };
    const chunksToHtmlName = /* @__PURE__ */ new Map();
    const ROUTE_MANIFEST_HOLDER = `route-manifest`;
    const placeholder = `<!--<?- ${ROUTE_MANIFEST_HOLDER} ?>-->`;
    compiler.hooks.thisCompilation.tap(PLUGIN_NAME, (compilation) => {
      this.HtmlBundlerPlugin.getHooks(compilation).beforeEmit.tapAsync("RouterManifestPlugin", (data, callback) => {
        const { outputName } = data;
        const { chunks } = data.plugin.options;
        chunksToHtmlName.set(chunks, outputName);
        data.html = data.html.replace("</script>", `</script>${placeholder}`);
        callback(null, data);
      });
      compilation.hooks.processAssets.tapPromise({
        name: PLUGIN_NAME,
        stage: Compilation.PROCESS_ASSETS_STAGE_REPORT
      }, async () => {
        const stats = compilation.getStats().toJson({
          all: false,
          publicPath: true,
          assets: true,
          chunkGroups: true,
          chunks: true,
          ids: true
        });
        const { publicPath, chunks = [], namedChunkGroups } = stats;
        const routeAssets = {};
        if (!namedChunkGroups) {
          return;
        }
        const prevManifestAsset = compilation.getAsset(ROUTE_MANIFEST_FILE);
        const prevManifestStr = prevManifestAsset ? prevManifestAsset.source.source().toString() : JSON.stringify({
          routeAssets: {}
        });
        const prevManifest = JSON.parse(prevManifestStr);
        const asyncEntryNames = [];
        for (const [name, chunkGroup] of Object.entries(namedChunkGroups)) {
          if (name.startsWith("async-")) {
            asyncEntryNames.push(name);
          }
          const assets = chunkGroup.assets.map((asset) => {
            const filename = asset.name;
            return publicPath ? normalizePath(publicPath) + filename : filename;
          });
          const referenceCssAssets = assets.filter((asset) => /\.css$/.test(asset));
          routeAssets[name] = {
            chunkIds: chunkGroup.chunks,
            assets,
            referenceCssAssets
          };
          if (prevManifest.routeAssets[name]) {
            mergeWith(routeAssets[name], prevManifest.routeAssets[name], (obj, source) => {
              if (Array.isArray(obj)) {
                return obj.concat(source);
              }
              return Object.assign(source, obj);
            });
          }
        }
        if (asyncEntryNames.length > 0) {
          for (const asyncEntryName of asyncEntryNames) {
            const syncEntryName = asyncEntryName.replace("async-", "");
            const syncEntry = routeAssets[syncEntryName];
            const asyncEntry = routeAssets[asyncEntryName];
            merge(syncEntry, asyncEntry);
          }
        }
        const manifest = {
          routeAssets
        };
        const entryNames = Array.from(compilation.entrypoints.keys());
        let entryChunks = [];
        if (isRspack) {
          entryChunks = this.getEntryChunks(compilation, chunks);
        } else {
          const orignalEntryIds = Object.keys(compilation.options.entry).map((entryName) => {
            const chunk = compilation.namedChunks.get(entryName);
            if (chunk) {
              return chunk.id;
            }
            return entryName;
          });
          entryChunks = this.getEntryChunks(compilation, chunks).filter((chunk) => orignalEntryIds.includes(chunk.id));
        }
        const entryChunkFiles = this.getEntryChunkFiles(entryChunks);
        const entryChunkFileIds = entryChunks.map((chunk) => chunk.id);
        for (let i = 0; i < entryChunkFiles.length; i++) {
          const entryName = entryNames[i];
          const file = entryChunkFiles[i];
          const chunkNames = entryChunks[i].names;
          const chunkId = entryChunkFileIds[i];
          const asset = compilation.assets[file];
          if (!asset || !chunkId) {
            continue;
          }
          let relatedAssets = {};
          if (entryChunkFiles.length > 1) {
            Object.keys(routeAssets).forEach((routeId) => {
              const segments = routeId.split("_");
              const chunkName = segments[0];
              if (chunkNames === null || chunkNames === void 0 ? void 0 : chunkNames.includes(chunkName)) {
                relatedAssets[routeId] = routeAssets[routeId];
              }
            });
          } else {
            relatedAssets = routeAssets;
          }
          const manifest2 = {
            routeAssets: relatedAssets
          };
          const injectedContent = `
            ;(function(){
              window.${ROUTE_MANIFEST} = ${JSON.stringify(manifest2, (k, v) => {
            if ((k === "assets" || k === "referenceCssAssets") && Array.isArray(v)) {
              return v.map((item) => {
                return item.replace(publicPath, "");
              });
            }
            return v;
          })};
            })();
          `;
          let htmlName;
          for (const [chunks2, name] of chunksToHtmlName.entries()) {
            if (Array.isArray(chunkNames) && Array.isArray(chunks2) && chunkNames.every((value, index) => value === chunks2[index])) {
              htmlName = name;
              break;
            }
          }
          const oldHtml = compilation.assets[htmlName];
          const { enableInlineRouteManifests, disableFilenameHash, staticJsDir, scriptLoading, nonce } = this;
          const nonceAttr = nonce ? `nonce="${nonce}"` : "";
          if (oldHtml) {
            if (enableInlineRouteManifests) {
              compilation.updateAsset(
                htmlName,
                new RawSource(oldHtml.source().toString().replace(placeholder, `<script ${nonceAttr}>${injectedContent}</script>`)),
                // FIXME: The arguments third of updatgeAsset is a optional function in webpack.
                void 0
              );
            } else {
              const scriptPath = `${staticJsDir}/${ROUTE_MANIFEST_HOLDER}-${entryName}${disableFilenameHash ? ".js" : `.${generateContentHash(injectedContent)}.js`}`;
              const scriptUrl = `${publicPath}${scriptPath}`;
              const scriptLoadingAttr = scriptLoading === "defer" ? scriptLoading : scriptLoading === "module" ? `type="module"` : "";
              const script = `<script ${scriptLoadingAttr} ${nonceAttr} src="${scriptUrl}"></script>`;
              compilation.updateAsset(
                htmlName,
                new RawSource(oldHtml.source().toString().replace(placeholder, script)),
                // FIXME: The arguments third of updatgeAsset is a optional function in webpack.
                void 0
              );
              compilation.emitAsset(scriptPath, new RawSource(injectedContent));
            }
          }
        }
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
      });
    });
  }
  constructor({ staticJsDir = "static/js", HtmlBundlerPlugin, enableInlineRouteManifests, disableFilenameHash = false, scriptLoading = "defer", nonce }) {
    this.name = "RouterPlugin";
    this.HtmlBundlerPlugin = HtmlBundlerPlugin;
    this.enableInlineRouteManifests = enableInlineRouteManifests;
    this.staticJsDir = staticJsDir;
    this.disableFilenameHash = disableFilenameHash;
    this.scriptLoading = scriptLoading;
    this.nonce = nonce;
  }
}
export {
  RouterPlugin
};
