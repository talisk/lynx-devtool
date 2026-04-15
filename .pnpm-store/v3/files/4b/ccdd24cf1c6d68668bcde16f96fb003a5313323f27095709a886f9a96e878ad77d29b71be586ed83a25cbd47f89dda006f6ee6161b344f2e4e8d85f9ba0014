import type { AsyncWorkers } from './async';
declare const PARALLEL_WORKFLOW_SYMBOL: unique symbol;
export type ParallelWorkflow<I, O = any> = {
    run: (input: I) => Promise<O[]>;
    use: (...I: AsyncWorkers<I, O>) => ParallelWorkflow<I, O>;
    [PARALLEL_WORKFLOW_SYMBOL]: true;
};
export declare const isParallelWorkflow: (input: any) => input is ParallelWorkflow<any, any>;
export declare const createParallelWorkflow: <I = void, O = unknown>() => ParallelWorkflow<I, O>;
export {};
