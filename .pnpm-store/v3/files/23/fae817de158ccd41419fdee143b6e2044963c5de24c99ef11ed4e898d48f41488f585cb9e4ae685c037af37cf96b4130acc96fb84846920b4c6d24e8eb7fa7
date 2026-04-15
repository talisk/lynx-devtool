import { createAsyncPipeline } from "../farrow-pipeline";
const ASYNC_INTERRUPT_WORKFLOW_SYMBOL = Symbol.for("ASYNC_INTERRUPT_WORKFLOW_SYMBOL");
const isAsyncInterruptWorkflow = (input) => Boolean(input === null || input === void 0 ? void 0 : input[ASYNC_INTERRUPT_WORKFLOW_SYMBOL]);
const createAsyncInterruptWorkflow = () => {
  const pipeline = createAsyncPipeline();
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
export {
  createAsyncInterruptWorkflow,
  isAsyncInterruptWorkflow
};
