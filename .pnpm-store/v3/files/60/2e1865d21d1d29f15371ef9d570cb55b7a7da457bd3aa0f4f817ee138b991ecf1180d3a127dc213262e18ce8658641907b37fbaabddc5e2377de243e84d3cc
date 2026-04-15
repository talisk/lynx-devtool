import { _ as _class_call_check } from "@swc/helpers/_/_class_call_check";
var BottomTemplatePlugin = /* @__PURE__ */ function() {
  "use strict";
  function BottomTemplatePlugin2(htmlWebpackPlugin) {
    _class_call_check(this, BottomTemplatePlugin2);
    this.bottomTemplateReg = /<!--<\?-\s*bottomTemplate\s*\?>-->/;
    this.bodyRegExp = /(<\/\s*body\s*>)/i;
    this.htmlWebpackPlugin = htmlWebpackPlugin;
    this.name = "bottom-template";
  }
  var _proto = BottomTemplatePlugin2.prototype;
  _proto.apply = function apply(compiler) {
    var _this = this;
    compiler.hooks.compilation.tap(this.name, function(compilation) {
      _this.htmlWebpackPlugin.getHooks(compilation).beforeEmit.tap(_this.name, function(data) {
        var _data_plugin_options;
        if (!((_data_plugin_options = data.plugin.options) === null || _data_plugin_options === void 0 ? void 0 : _data_plugin_options.__internal__)) {
          return data;
        }
        if (_this.bottomTemplateReg.test(data.html)) {
          data.html = data.html.replace(_this.bottomTemplateReg, "");
          var bottomTemplate = data.plugin.options.bottomTemplate;
          if (bottomTemplate) {
            data.html = data.html.replace(_this.bodyRegExp, function(match) {
              return "\n".concat(bottomTemplate, "\n").concat(match);
            });
          }
        }
        return data;
      });
    });
  };
  return BottomTemplatePlugin2;
}();
export {
  BottomTemplatePlugin
};
