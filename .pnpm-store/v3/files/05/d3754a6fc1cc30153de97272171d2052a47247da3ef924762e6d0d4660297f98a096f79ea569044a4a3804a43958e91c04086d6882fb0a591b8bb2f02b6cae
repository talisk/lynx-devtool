declare const WATERFALL_SYMBOL: unique symbol;
export type Brook<I = unknown> = (I: I) => I;
export type BrookInput<I = unknown> = Brook<I> | {
    middleware: Brook<I>;
};
export type Brooks<I = unknown> = Brook<I>[];
export type BrookInputs<I = unknown> = BrookInput<I>[];
export declare const getBrook: <I>(input: BrookInput<I>) => Brook<I>;
export type RunWaterfallOptions<I = unknown> = {
    onLast?: Brook<I>;
};
export type Waterfall<I = void> = {
    run: (input: I, options?: RunWaterfallOptions<I>) => I;
    use: (...I: BrookInputs<I>) => Waterfall<I>;
    middleware: Brook<I>;
    [WATERFALL_SYMBOL]: true;
};
export declare const createWaterfall: <I = void>() => Waterfall<I>;
export declare const isWaterfall: (input: any) => input is Waterfall<any>;
export {};
