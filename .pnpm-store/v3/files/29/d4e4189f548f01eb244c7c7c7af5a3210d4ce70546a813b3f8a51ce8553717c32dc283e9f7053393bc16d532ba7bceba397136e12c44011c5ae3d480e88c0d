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
var farrow_pipeline_exports = {};
__export(farrow_pipeline_exports, {
  createAsyncPipeline: () => createAsyncPipeline,
  createContext: () => import_context.createContext,
  createPipeline: () => createPipeline,
  isPipeline: () => isPipeline
});
module.exports = __toCommonJS(farrow_pipeline_exports);
var import_context = require("./context");
var import_counter = require("./counter");
const isPipeline = (input) => Boolean(input === null || input === void 0 ? void 0 : input[PipelineSymbol]);
const PipelineSymbol = Symbol.for("MODERN_PIPELINE");
const getMiddleware = (input) => {
  if (typeof input === "function") {
    return input;
  } else if (input && typeof input.middleware === "function") {
    return input.middleware;
  }
  throw new Error(`${input} is not a Middleware`);
};
const createPipeline = () => {
  const middlewares = [];
  const use = (...inputs) => {
    middlewares.push(...inputs.map(getMiddleware));
    return pipeline;
  };
  const createCurrentCounter = (onLast) => {
    return (0, import_counter.createCounter)((index, input, next) => {
      if (index >= middlewares.length) {
        if (onLast) {
          return onLast(input);
        }
        throw new Error(`Expect returning a value, but all middlewares just calling next()`);
      }
      return middlewares[index](input, next);
    });
  };
  const currentCounter = createCurrentCounter();
  const getCounter = (options) => {
    if (!options) {
      return currentCounter;
    }
    return createCurrentCounter(options === null || options === void 0 ? void 0 : options.onLast);
  };
  const run = (input, options) => getCounter(options).start(input);
  const middleware = (input, next) => run(input, {
    onLast: next
  });
  const pipeline = {
    [PipelineSymbol]: true,
    use,
    run,
    middleware
  };
  return pipeline;
};
const createAsyncPipeline = () => {
  const pipeline = createPipeline();
  return {
    ...pipeline
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createAsyncPipeline,
  createContext,
  createPipeline,
  isPipeline
});
