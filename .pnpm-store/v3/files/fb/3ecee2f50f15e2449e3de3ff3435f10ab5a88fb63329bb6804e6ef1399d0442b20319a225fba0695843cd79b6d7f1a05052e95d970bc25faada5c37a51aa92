/**
 * modified from https://github.com/farrow-js/farrow/tree/master/packages/farrow-pipeline
 * license at https://github.com/farrow-js/farrow/blob/master/LICENSE
 */
import { type Context, createContext } from './context';
import { type Next } from './counter';
export type { Next };
export { createContext };
export type { Context };
export type Middleware<I = unknown, O = unknown> = (input: I, next: Next<I, O>) => O;
export type Middlewares<I = unknown, O = unknown> = Middleware<I, O>[];
export declare const isPipeline: (input: any) => input is Pipeline<unknown, unknown>;
declare const PipelineSymbol: unique symbol;
export type RunPipelineOptions<I = unknown, O = unknown> = {
    onLast?: (input: I) => O;
};
export type MiddlewareInput<I = unknown, O = unknown> = Middleware<I, O> | {
    middleware: Middleware<I, O>;
};
export type Pipeline<I = unknown, O = unknown> = {
    [PipelineSymbol]: true;
    use: (...inputs: MiddlewareInput<I, O>[]) => Pipeline<I, O>;
    run: (input: I, options?: RunPipelineOptions<I, O>) => O;
    middleware: Middleware<I, O>;
};
export declare const createPipeline: <I, O>() => Pipeline<I, O>;
export type MaybeAsync<T> = T | Promise<T>;
export type AsyncPipeline<I = unknown, O = unknown> = Pipeline<I, MaybeAsync<O>>;
export declare const createAsyncPipeline: <I, O>() => AsyncPipeline<I, O>;
