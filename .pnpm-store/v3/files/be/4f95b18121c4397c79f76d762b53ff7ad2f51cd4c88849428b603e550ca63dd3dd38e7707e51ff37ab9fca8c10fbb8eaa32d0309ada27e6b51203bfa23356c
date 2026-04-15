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
  createWorkflow: () => createWorkflow,
  isWorkflow: () => isWorkflow
});
module.exports = __toCommonJS(sync_exports);
var import_farrow_pipeline = require("../farrow-pipeline");
const WORKFLOW_SYMBOL = Symbol.for("MODERN_WORKFLOW");
const createWorkflow = () => {
  const pipeline = (0, import_farrow_pipeline.createPipeline)();
  const use = (...input) => {
    pipeline.use(...input.map(mapWorkerToMiddleware));
    return workflow;
  };
  const run = (input) => {
    const result = pipeline.run(input, {
      onLast: () => []
    });
    return result.filter(Boolean);
  };
  const workflow = {
    ...pipeline,
    use,
    run,
    [WORKFLOW_SYMBOL]: true
  };
  return workflow;
};
const isWorkflow = (input) => Boolean(input === null || input === void 0 ? void 0 : input[WORKFLOW_SYMBOL]);
const mapWorkerToMiddleware = (worker) => (input, next) => [
  worker(input),
  ...next(input)
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createWorkflow,
  isWorkflow
});
