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
var HtmlBottomTemplate_exports = {};
__export(HtmlBottomTemplate_exports, {
  BottomTemplatePlugin: () => BottomTemplatePlugin
});
module.exports = __toCommonJS(HtmlBottomTemplate_exports);
class BottomTemplatePlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap(this.name, (compilation) => {
      this.htmlWebpackPlugin.getHooks(compilation).beforeEmit.tap(this.name, (data) => {
        var _data_plugin_options;
        if (!((_data_plugin_options = data.plugin.options) === null || _data_plugin_options === void 0 ? void 0 : _data_plugin_options.__internal__)) {
          return data;
        }
        if (this.bottomTemplateReg.test(data.html)) {
          data.html = data.html.replace(this.bottomTemplateReg, "");
          const { bottomTemplate } = data.plugin.options;
          if (bottomTemplate) {
            data.html = data.html.replace(this.bodyRegExp, (match) => `
${bottomTemplate}
${match}`);
          }
        }
        return data;
      });
    });
  }
  constructor(htmlWebpackPlugin) {
    this.bottomTemplateReg = /<!--<\?-\s*bottomTemplate\s*\?>-->/;
    this.bodyRegExp = /(<\/\s*body\s*>)/i;
    this.htmlWebpackPlugin = htmlWebpackPlugin;
    this.name = "bottom-template";
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BottomTemplatePlugin
});
