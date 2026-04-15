"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: () => _default
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _store = require("@modern-js-reduck/store");
const _utils = require("./utils");
const _primitive = /* @__PURE__ */ _interop_require_wildcard._(require("./primitive"));
const _array = /* @__PURE__ */ _interop_require_wildcard._(require("./array"));
const _object = require("./object");
const _default = (0, _store.createPlugin)(() => ({
  prepareModelDesc(modelDesc) {
    const initialState = modelDesc.state;
    const type = _store.utils.getStateType(initialState);
    if (type === "primitive") {
      return (0, _utils.mergeActions)(modelDesc, _primitive);
    }
    if (type === "array") {
      return (0, _utils.mergeActions)(modelDesc, _array);
    }
    if (type === "object") {
      return (0, _utils.mergeActions)(modelDesc, (0, _object.createObjectActions)(modelDesc.state));
    }
    return modelDesc;
  }
}));
