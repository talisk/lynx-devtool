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
var async_exports = {};
__export(async_exports, {
  createAsyncWaterfall: () => createAsyncWaterfall,
  getAsyncBrook: () => getAsyncBrook,
  isAsyncWaterfall: () => isAsyncWaterfall
});
module.exports = __toCommonJS(async_exports);
var import_farrow_pipeline = require("../farrow-pipeline");
const ASYNC_WATERFALL_SYMBOL = Symbol.for("MODERN_ASYNC_WATERFALL");
const getAsyncBrook = (input) => {
  if (typeof input === "function") {
    return input;
  }
  if (input && typeof input.middleware === "function") {
    return input.middleware;
  }
  throw new Error(`${input} is not a AsyncBrook or { brook: AsyncBrook }`);
};
const createAsyncWaterfall = () => {
  const pipeline = (0, import_farrow_pipeline.createAsyncPipeline)();
  const use = (...input) => {
    pipeline.use(...input.map(getAsyncBrook).map(mapAsyncBrookToAsyncMiddleware));
    return waterfall;
  };
  const run = (input, options) => pipeline.run(input, {
    ...options,
    onLast: (input2) => input2
  });
  const middleware = (input) => {
    return pipeline.run(input, {
      onLast: (input2) => input2
    });
  };
  const waterfall = {
    ...pipeline,
    use,
    run,
    middleware,
    [ASYNC_WATERFALL_SYMBOL]: true
  };
  return waterfall;
};
const isAsyncWaterfall = (input) => Boolean(input === null || input === void 0 ? void 0 : input[ASYNC_WATERFALL_SYMBOL]);
const mapAsyncBrookToAsyncMiddleware = (brook) => (input, next) => Promise.resolve(brook(input)).then((result) => next(result));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createAsyncWaterfall,
  getAsyncBrook,
  isAsyncWaterfall
});
