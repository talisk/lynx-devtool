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
var counter_exports = {};
__export(counter_exports, {
  createCounter: () => createCounter
});
module.exports = __toCommonJS(counter_exports);
const createCounter = (callback) => {
  const dispatch = (index, input) => {
    const next = (nextInput = input) => dispatch(index + 1, nextInput);
    return callback(index, input, next);
  };
  return {
    start: (input) => dispatch(0, input),
    dispatch
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createCounter
});
