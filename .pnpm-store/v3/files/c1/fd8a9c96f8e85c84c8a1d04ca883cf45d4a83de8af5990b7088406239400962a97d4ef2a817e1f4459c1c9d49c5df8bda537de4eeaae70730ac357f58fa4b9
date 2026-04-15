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
var createRequestCtx_exports = {};
__export(createRequestCtx_exports, {
  createRequestContext: () => createRequestContext
});
module.exports = __toCommonJS(createRequestCtx_exports);
function createRequestContext(context) {
  const _context = context || /* @__PURE__ */ new Map();
  function get(key) {
    if (typeof key === "string") {
      return _context.get(key);
    } else {
      return _context.get(key.symbol) || key.getDefaultValue();
    }
  }
  function set(key, value) {
    if (typeof key === "string") {
      _context.set(key, value);
    } else {
      _context.set(key.symbol, value);
    }
  }
  return {
    set,
    get
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createRequestContext
});
