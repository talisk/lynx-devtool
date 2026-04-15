import { createPipeline } from "../farrow-pipeline";
const WATERFALL_SYMBOL = Symbol.for("MODERN_WATERFALL");
const getBrook = (input) => {
  if (typeof input === "function") {
    return input;
  } else if (input && typeof input.middleware === "function") {
    return input.middleware;
  }
  throw new Error(`${input} is not a Brook or { brook: Brook }`);
};
const createWaterfall = () => {
  const pipeline = createPipeline();
  const use = (...brooks) => {
    pipeline.use(...brooks.map(getBrook).map(mapBrookToMiddleware));
    return waterfall;
  };
  const run = (input, options) => pipeline.run(input, {
    ...options,
    onLast: (input2) => input2
  });
  const middleware = (input) => {
    return pipeline.run(input, {
      onLast: (input2) => input2
    });
  };
  const waterfall = {
    ...pipeline,
    use,
    run,
    middleware,
    [WATERFALL_SYMBOL]: true
  };
  return waterfall;
};
const isWaterfall = (input) => Boolean(input === null || input === void 0 ? void 0 : input[WATERFALL_SYMBOL]);
const mapBrookToMiddleware = (brook) => (input, next) => next(brook(input));
export {
  createWaterfall,
  getBrook,
  isWaterfall
};
