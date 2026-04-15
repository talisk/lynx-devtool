import { createPipeline } from "../farrow-pipeline";
const WORKFLOW_SYMBOL = Symbol.for("MODERN_WORKFLOW");
const createWorkflow = () => {
  const pipeline = createPipeline();
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
export {
  createWorkflow,
  isWorkflow
};
