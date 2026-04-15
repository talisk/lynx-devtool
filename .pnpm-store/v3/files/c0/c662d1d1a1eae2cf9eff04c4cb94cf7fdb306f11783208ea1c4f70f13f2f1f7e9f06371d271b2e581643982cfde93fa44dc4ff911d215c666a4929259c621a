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
var splitChunk_exports = {};
__export(splitChunk_exports, {
  pluginSplitChunks: () => pluginSplitChunks
});
module.exports = __toCommonJS(splitChunk_exports);
var import_utils = require("@modern-js/utils");
const DEP_MATCH_TEMPLATE = /[\\/]node_modules[\\/](<SOURCES>)[\\/]/.source;
const createDependenciesRegExp = (...dependencies) => {
  const sources = dependencies.map((d) => typeof d === "string" ? d : d.source);
  const expr = DEP_MATCH_TEMPLATE.replace("<SOURCES>", sources.join("|"));
  return new RegExp(expr);
};
function createCacheGroups(group) {
  const experienceCacheGroup = {};
  for (const [name, pkgs] of Object.entries(group)) {
    const key = `lib-${name}`;
    experienceCacheGroup[key] = {
      test: createDependenciesRegExp(...pkgs),
      priority: 0,
      name: key,
      reuseExistingChunk: true
    };
  }
  return experienceCacheGroup;
}
const pluginSplitChunks = () => ({
  name: "uni-builder:split-chunks",
  setup(api) {
    api.modifyBundlerChain((chain, { environment }) => {
      const { config } = environment;
      const { chunkSplit } = config.performance || {};
      if ((chunkSplit === null || chunkSplit === void 0 ? void 0 : chunkSplit.strategy) !== "split-by-experience") {
        return;
      }
      const currentConfig = chain.optimization.splitChunks.values();
      if (!(0, import_utils.isPlainObject)(currentConfig)) {
        return;
      }
      const groups = {};
      const { rootPath } = api.context;
      if ((0, import_utils.isPackageInstalled)("antd", rootPath)) {
        groups.antd = [
          "antd"
        ];
      }
      if ((0, import_utils.isPackageInstalled)("@arco-design/web-react", rootPath)) {
        groups.arco = [
          /@?arco-design/
        ];
      }
      if ((0, import_utils.isPackageInstalled)("@douyinfe/semi-ui", rootPath)) {
        groups.semi = [
          /@(ies|douyinfe)[\\/]semi-.*/
        ];
      }
      if (!Object.keys(groups).length) {
        return;
      }
      chain.optimization.splitChunks({
        ...currentConfig,
        // rspack chunks type mismatch with webpack
        cacheGroups: {
          ...createCacheGroups(groups),
          ...currentConfig.cacheGroups
        }
      });
    });
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pluginSplitChunks
});
