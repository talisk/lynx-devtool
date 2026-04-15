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
var HtmlAsyncChunkPlugin_exports = {};
__export(HtmlAsyncChunkPlugin_exports, {
  HtmlAsyncChunkPlugin: () => HtmlAsyncChunkPlugin
});
module.exports = __toCommonJS(HtmlAsyncChunkPlugin_exports);
class HtmlAsyncChunkPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap(this.name, (compilation) => {
      const hooks = this.htmlWebpackPlugin.getHooks(compilation);
      hooks.alterAssetTagGroups.tap(this.name, (assets) => {
        const tags = [
          ...assets.headTags,
          ...assets.bodyTags
        ];
        for (const tag of tags) {
          if (tag.tagName === "script") {
            const { attributes } = tag;
            if (attributes && attributes.defer === true) {
              attributes.async = true;
              delete attributes.defer;
            }
          }
        }
        return assets;
      });
    });
  }
  constructor(htmlWebpackPlugin) {
    this.name = "HtmlAsyncChunkPlugin";
    this.htmlWebpackPlugin = htmlWebpackPlugin;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HtmlAsyncChunkPlugin
});
