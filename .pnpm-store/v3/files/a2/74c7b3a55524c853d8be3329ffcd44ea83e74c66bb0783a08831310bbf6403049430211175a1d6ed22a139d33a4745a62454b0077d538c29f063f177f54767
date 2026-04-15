import { createPipeline } from "../farrow-pipeline";
const PARALLEL_WORKFLOW_SYMBOL = Symbol.for("MODERN_PARALLEL_WORKFLOW");
const isParallelWorkflow = (input) => Boolean(input === null || input === void 0 ? void 0 : input[PARALLEL_WORKFLOW_SYMBOL]);
const createParallelWorkflow = () => {
  const pipeline = createPipeline();
  const use = (...input) => {
    pipeline.use(...input.map(mapParallelWorkerToAsyncMiddleware));
    return workflow;
  };
  const run = (input) => Promise.all(pipeline.run(input, {
    onLast: () => []
  })).then((result) => result.filter(Boolean));
  const workflow = {
    ...pipeline,
    run,
    use,
    [PARALLEL_WORKFLOW_SYMBOL]: true
  };
  return workflow;
};
const mapParallelWorkerToAsyncMiddleware = (worker) => (input, next) => [
  worker(input),
  ...next(input)
];
export {
  createParallelWorkflow,
  isParallelWorkflow
};
