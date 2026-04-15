import { _ as _class_private_field_get } from "@swc/helpers/_/_class_private_field_get";
import { _ as _class_private_field_init } from "@swc/helpers/_/_class_private_field_init";
import { _ as _class_private_field_set } from "@swc/helpers/_/_class_private_field_set";
import { ServerStyleSheet } from "styled-components";
var _sheet = /* @__PURE__ */ new WeakMap(), _chunkSet = /* @__PURE__ */ new WeakMap();
class StyledCollector {
  collect(comopnent) {
    return _class_private_field_get(this, _sheet).collectStyles(comopnent);
  }
  effect() {
    const css = _class_private_field_get(this, _sheet).getStyleTags();
    _class_private_field_get(this, _chunkSet).cssChunk += css;
  }
  constructor(chunkSet) {
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
}
export {
  StyledCollector
};
