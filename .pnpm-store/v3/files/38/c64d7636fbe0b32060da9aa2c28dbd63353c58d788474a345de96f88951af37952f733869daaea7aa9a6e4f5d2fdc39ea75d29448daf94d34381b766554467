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
export {
  BottomTemplatePlugin
};
