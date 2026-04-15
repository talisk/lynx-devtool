import { type MaybeAsync } from '../farrow-pipeline';
declare const ASYNC_WATERFALL_SYMBOL: unique symbol;
export type AsyncBrook<I = unknown> = (I: I) => MaybeAsync<I>;
export type AsyncBrookInput<I = unknown> = AsyncBrook<I> | {
    middleware: AsyncBrook<I>;
};
export type AsyncBrooks<I = unknown> = AsyncBrook<I>[];
export type AsyncBrookInputs<I = unknown> = AsyncBrookInput<I>[];
export declare const getAsyncBrook: <I>(input: AsyncBrookInput<I>) => AsyncBrook<I>;
export type RunAsyncWaterfallOptions<I = unknown> = {
    onLast?: AsyncBrook<I>;
};
export type AsyncWaterfall<I> = {
    run: (input: I, options?: RunAsyncWaterfallOptions<I>) => MaybeAsync<I>;
    use: (...I: AsyncBrookInputs<I>) => AsyncWaterfall<I>;
    middleware: AsyncBrook<I>;
    [ASYNC_WATERFALL_SYMBOL]: true;
};
export declare const createAsyncWaterfall: <I = void>() => AsyncWaterfall<I>;
export declare const isAsyncWaterfall: (input: any) => input is AsyncWaterfall<any>;
export {};
