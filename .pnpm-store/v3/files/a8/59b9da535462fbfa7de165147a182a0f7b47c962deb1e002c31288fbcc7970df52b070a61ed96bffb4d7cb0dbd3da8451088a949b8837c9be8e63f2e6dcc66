import { createContext } from "./context";
import { createCounter } from "./counter";
const isPipeline = (input) => Boolean(input === null || input === void 0 ? void 0 : input[PipelineSymbol]);
const PipelineSymbol = Symbol.for("MODERN_PIPELINE");
const getMiddleware = (input) => {
  if (typeof input === "function") {
    return input;
  } else if (input && typeof input.middleware === "function") {
    return input.middleware;
  }
  throw new Error(`${input} is not a Middleware`);
};
const createPipeline = () => {
  const middlewares = [];
  const use = (...inputs) => {
    middlewares.push(...inputs.map(getMiddleware));
    return pipeline;
  };
  const createCurrentCounter = (onLast) => {
    return createCounter((index, input, next) => {
      if (index >= middlewares.length) {
        if (onLast) {
          return onLast(input);
        }
        throw new Error(`Expect returning a value, but all middlewares just calling next()`);
      }
      return middlewares[index](input, next);
    });
  };
  const currentCounter = createCurrentCounter();
  const getCounter = (options) => {
    if (!options) {
      return currentCounter;
    }
    return createCurrentCounter(options === null || options === void 0 ? void 0 : options.onLast);
  };
  const run = (input, options) => getCounter(options).start(input);
  const middleware = (input, next) => run(input, {
    onLast: next
  });
  const pipeline = {
    [PipelineSymbol]: true,
    use,
    run,
    middleware
  };
  return pipeline;
};
const createAsyncPipeline = () => {
  const pipeline = createPipeline();
  return {
    ...pipeline
  };
};
export {
  createAsyncPipeline,
  createContext,
  createPipeline,
  isPipeline
};
