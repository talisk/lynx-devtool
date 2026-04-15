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
var styledComponent_exports = {};
__export(styledComponent_exports, {
  StyledCollector: () => StyledCollector
});
module.exports = __toCommonJS(styledComponent_exports);
var import_class_private_field_get = require("@swc/helpers/_/_class_private_field_get");
var import_class_private_field_init = require("@swc/helpers/_/_class_private_field_init");
var import_class_private_field_set = require("@swc/helpers/_/_class_private_field_set");
var import_styled_components = require("styled-components");
var _sheet = /* @__PURE__ */ new WeakMap(), _chunkSet = /* @__PURE__ */ new WeakMap();
class StyledCollector {
  collect(comopnent) {
    return (0, import_class_private_field_get._)(this, _sheet).collectStyles(comopnent);
  }
  effect() {
    const css = (0, import_class_private_field_get._)(this, _sheet).getStyleTags();
    (0, import_class_private_field_get._)(this, _chunkSet).cssChunk += css;
  }
  constructor(chunkSet) {
    (0, import_class_private_field_init._)(this, _sheet, {
      writable: true,
      value: void 0
    });
    (0, import_class_private_field_init._)(this, _chunkSet, {
      writable: true,
      value: void 0
    });
    (0, import_class_private_field_set._)(this, _sheet, new import_styled_components.ServerStyleSheet());
    (0, import_class_private_field_set._)(this, _chunkSet, chunkSet);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StyledCollector
});
