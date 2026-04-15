import { _ as _class_call_check } from "@swc/helpers/_/_class_call_check";
import { _ as _class_private_field_get } from "@swc/helpers/_/_class_private_field_get";
import { _ as _class_private_field_init } from "@swc/helpers/_/_class_private_field_init";
import { _ as _class_private_field_set } from "@swc/helpers/_/_class_private_field_set";
import { ServerStyleSheet } from "styled-components";
var _sheet = /* @__PURE__ */ new WeakMap(), _chunkSet = /* @__PURE__ */ new WeakMap();
var StyledCollector = /* @__PURE__ */ function() {
  "use strict";
  function StyledCollector2(chunkSet) {
    _class_call_check(this, StyledCollector2);
    _class_private_field_init(this, _sheet, {
      writable: true,
      value: void 0
    });
    _class_private_field_init(this, _chunkSet, {
      writable: true,
      value: void 0
    });
    _class_private_field_set(this, _sheet, new ServerStyleSheet());
    _class_private_field_set(this, _chunkSet, chunkSet);
  }
  var _proto = StyledCollector2.prototype;
  _proto.collect = function collect(comopnent) {
    return _class_private_field_get(this, _sheet).collectStyles(comopnent);
  };
  _proto.effect = function effect() {
    var css = _class_private_field_get(this, _sheet).getStyleTags();
    _class_private_field_get(this, _chunkSet).cssChunk += css;
  };
  return StyledCollector2;
}();
export {
  StyledCollector
};
