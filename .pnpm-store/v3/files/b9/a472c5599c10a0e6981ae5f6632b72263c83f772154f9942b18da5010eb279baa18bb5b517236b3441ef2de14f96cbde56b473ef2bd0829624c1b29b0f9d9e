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
  createAsyncWorkflow: () => createAsyncWorkflow,
  isAsyncWorkflow: () => isAsyncWorkflow
});
module.exports = __toCommonJS(async_exports);
var import_farrow_pipeline = require("../farrow-pipeline");
const ASYNC_WORKFLOW_SYMBOL = Symbol.for("MODERN_ASYNC_WORKFLOW");
const isPromise = (obj) => obj && typeof obj.then === "function";
const isAsyncWorkflow = (input) => Boolean(input === null || input === void 0 ? void 0 : input[ASYNC_WORKFLOW_SYMBOL]);
const createAsyncWorkflow = () => {
  const pipeline = (0, import_farrow_pipeline.createAsyncPipeline)();
  const use = (...input) => {
    pipeline.use(...input.map(mapAsyncWorkerToAsyncMiddleware));
    return workflow;
  };
  const run = (input) => {
    const result = pipeline.run(input, {
      onLast: () => []
    });
    if (isPromise(result)) {
      return result.then((result2) => result2.filter(Boolean));
    }
    return result.filter(Boolean);
  };
  const workflow = {
    ...pipeline,
    use,
    run,
    [ASYNC_WORKFLOW_SYMBOL]: true
  };
  return workflow;
};
const mapAsyncWorkerToAsyncMiddleware = (worker) => (input, next) => Promise.resolve(worker(input)).then((result) => Promise.resolve(next(input)).then((nextResult) => [
  result,
  ...nextResult
]));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createAsyncWorkflow,
  isAsyncWorkflow
});
