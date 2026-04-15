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
var interrupt_exports = {};
__export(interrupt_exports, {
  createAsyncInterruptWorkflow: () => createAsyncInterruptWorkflow,
  isAsyncInterruptWorkflow: () => isAsyncInterruptWorkflow
});
module.exports = __toCommonJS(interrupt_exports);
var import_farrow_pipeline = require("../farrow-pipeline");
const ASYNC_INTERRUPT_WORKFLOW_SYMBOL = Symbol.for("ASYNC_INTERRUPT_WORKFLOW_SYMBOL");
const isAsyncInterruptWorkflow = (input) => Boolean(input === null || input === void 0 ? void 0 : input[ASYNC_INTERRUPT_WORKFLOW_SYMBOL]);
const createAsyncInterruptWorkflow = () => {
  const pipeline = (0, import_farrow_pipeline.createAsyncPipeline)();
  const use = (...input) => {
    pipeline.use(...input.map(mapAsyncWorkerToInterruptMiddleware));
    return workflow;
  };
  const run = async (input) => {
    const result = await pipeline.run(input, {
      onLast: () => []
    });
    return result;
  };
  const workflow = {
    ...pipeline,
    use,
    run,
    [ASYNC_INTERRUPT_WORKFLOW_SYMBOL]: true
  };
  return workflow;
};
const mapAsyncWorkerToInterruptMiddleware = (worker) => async (input, next) => {
  let isInterrupted = false;
  const interrupt = (value) => {
    isInterrupted = true;
    return value;
  };
  const result = await Promise.resolve(worker(input, interrupt));
  if (isInterrupted) {
    return result;
  }
  return Promise.resolve(next(input));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createAsyncInterruptWorkflow,
  isAsyncInterruptWorkflow
});
