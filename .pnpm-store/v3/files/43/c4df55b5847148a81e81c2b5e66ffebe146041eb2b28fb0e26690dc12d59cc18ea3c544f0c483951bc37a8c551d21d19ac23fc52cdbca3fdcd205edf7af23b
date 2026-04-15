import { createAsyncPipeline } from "../farrow-pipeline";
const ASYNC_WATERFALL_SYMBOL = Symbol.for("MODERN_ASYNC_WATERFALL");
const getAsyncBrook = (input) => {
  if (typeof input === "function") {
    return input;
  }
  if (input && typeof input.middleware === "function") {
    return input.middleware;
  }
  throw new Error(`${input} is not a AsyncBrook or { brook: AsyncBrook }`);
};
const createAsyncWaterfall = () => {
  const pipeline = createAsyncPipeline();
  const use = (...input) => {
    pipeline.use(...input.map(getAsyncBrook).map(mapAsyncBrookToAsyncMiddleware));
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
    [ASYNC_WATERFALL_SYMBOL]: true
  };
  return waterfall;
};
const isAsyncWaterfall = (input) => Boolean(input === null || input === void 0 ? void 0 : input[ASYNC_WATERFALL_SYMBOL]);
const mapAsyncBrookToAsyncMiddleware = (brook) => (input, next) => Promise.resolve(brook(input)).then((result) => next(result));
export {
  createAsyncWaterfall,
  getAsyncBrook,
  isAsyncWaterfall
};
