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
var sync_exports = {};
__export(sync_exports, {
  createWaterfall: () => createWaterfall,
  getBrook: () => getBrook,
  isWaterfall: () => isWaterfall
});
module.exports = __toCommonJS(sync_exports);
var import_farrow_pipeline = require("../farrow-pipeline");
const WATERFALL_SYMBOL = Symbol.for("MODERN_WATERFALL");
const getBrook = (input) => {
  if (typeof input === "function") {
    return input;
  } else if (input && typeof input.middleware === "function") {
    return input.middleware;
  }
  throw new Error(`${input} is not a Brook or { brook: Brook }`);
};
const createWaterfall = () => {
  const pipeline = (0, import_farrow_pipeline.createPipeline)();
  const use = (...brooks) => {
    pipeline.use(...brooks.map(getBrook).map(mapBrookToMiddleware));
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
    [WATERFALL_SYMBOL]: true
  };
  return waterfall;
};
const isWaterfall = (input) => Boolean(input === null || input === void 0 ? void 0 : input[WATERFALL_SYMBOL]);
const mapBrookToMiddleware = (brook) => (input, next) => next(brook(input));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createWaterfall,
  getBrook,
  isWaterfall
});
