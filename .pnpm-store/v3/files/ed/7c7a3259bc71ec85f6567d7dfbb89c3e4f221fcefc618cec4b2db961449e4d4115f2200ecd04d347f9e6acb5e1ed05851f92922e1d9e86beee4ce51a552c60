import { createPipeline } from "../farrow-pipeline";
const SYNC_PARALLEL_WORKFLOW_SYMBOL = Symbol.for("SYNC_MODERN_PARALLEL_WORKFLOW");
const isSyncParallelWorkflow = (input) => Boolean(input === null || input === void 0 ? void 0 : input[SYNC_PARALLEL_WORKFLOW_SYMBOL]);
const createSyncParallelWorkflow = () => {
  const pipeline = createPipeline();
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
export {
  createSyncParallelWorkflow,
  isSyncParallelWorkflow
};
