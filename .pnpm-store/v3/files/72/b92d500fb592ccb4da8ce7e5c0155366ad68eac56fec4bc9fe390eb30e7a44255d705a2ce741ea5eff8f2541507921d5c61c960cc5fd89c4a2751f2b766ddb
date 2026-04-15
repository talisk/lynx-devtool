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
var syncParallel_exports = {};
__export(syncParallel_exports, {
  createSyncParallelWorkflow: () => createSyncParallelWorkflow,
  isSyncParallelWorkflow: () => isSyncParallelWorkflow
});
module.exports = __toCommonJS(syncParallel_exports);
var import_farrow_pipeline = require("../farrow-pipeline");
const SYNC_PARALLEL_WORKFLOW_SYMBOL = Symbol.for("SYNC_MODERN_PARALLEL_WORKFLOW");
const isSyncParallelWorkflow = (input) => Boolean(input === null || input === void 0 ? void 0 : input[SYNC_PARALLEL_WORKFLOW_SYMBOL]);
const createSyncParallelWorkflow = () => {
  const pipeline = (0, import_farrow_pipeline.createPipeline)();
  const use = (...input) => {
    pipeline.use(...input.map(mapSyncParallelWorkerToMiddleware));
    return workflow;
  };
  const run = (input) => {
    return pipeline.run(input, {
      onLast: () => []
    }).filter((result) => Boolean(result));
  };
  const workflow = {
    ...pipeline,
    run,
    use,
    [SYNC_PARALLEL_WORKFLOW_SYMBOL]: true
  };
  return workflow;
};
const mapSyncParallelWorkerToMiddleware = (worker) => (input, next) => [
  worker(input),
  ...next(input)
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createSyncParallelWorkflow,
  isSyncParallelWorkflow
});
