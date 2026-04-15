import { _ as _class_call_check } from "@swc/helpers/_/_class_call_check";
import { _ as _to_consumable_array } from "@swc/helpers/_/_to_consumable_array";
var HtmlAsyncChunkPlugin = /* @__PURE__ */ function() {
  "use strict";
  function HtmlAsyncChunkPlugin2(htmlWebpackPlugin) {
    _class_call_check(this, HtmlAsyncChunkPlugin2);
    this.name = "HtmlAsyncChunkPlugin";
    this.htmlWebpackPlugin = htmlWebpackPlugin;
  }
  var _proto = HtmlAsyncChunkPlugin2.prototype;
  _proto.apply = function apply(compiler) {
    var _this = this;
    compiler.hooks.compilation.tap(this.name, function(compilation) {
      var hooks = _this.htmlWebpackPlugin.getHooks(compilation);
      hooks.alterAssetTagGroups.tap(_this.name, function(assets) {
        var tags = _to_consumable_array(assets.headTags).concat(_to_consumable_array(assets.bodyTags));
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
        try {
          for (var _iterator = tags[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var tag = _step.value;
            if (tag.tagName === "script") {
              var attributes = tag.attributes;
              if (attributes && attributes.defer === true) {
                attributes.async = true;
                delete attributes.defer;
              }
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
        return assets;
      });
    });
  };
  return HtmlAsyncChunkPlugin2;
}();
export {
  HtmlAsyncChunkPlugin
};
