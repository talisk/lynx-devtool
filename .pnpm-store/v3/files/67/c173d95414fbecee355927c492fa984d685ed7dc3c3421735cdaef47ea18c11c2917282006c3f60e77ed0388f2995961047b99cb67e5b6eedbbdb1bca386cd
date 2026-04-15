import { createAsyncPipeline } from "../farrow-pipeline";
const ASYNC_WORKFLOW_SYMBOL = Symbol.for("MODERN_ASYNC_WORKFLOW");
const isPromise = (obj) => obj && typeof obj.then === "function";
const isAsyncWorkflow = (input) => Boolean(input === null || input === void 0 ? void 0 : input[ASYNC_WORKFLOW_SYMBOL]);
const createAsyncWorkflow = () => {
  const pipeline = createAsyncPipeline();
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
export {
  createAsyncWorkflow,
  isAsyncWorkflow
};
