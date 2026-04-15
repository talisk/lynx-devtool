import { type MaybeAsync } from '../farrow-pipeline';
declare const ASYNC_WORKFLOW_SYMBOL: unique symbol;
export type AsyncWorker<I, O> = (I: I) => MaybeAsync<O>;
export type AsyncWorkers<I, O> = AsyncWorker<I, O>[];
export type AsyncWorkflow<I, O> = {
    run: (input: I) => MaybeAsync<O[]>;
    use: (...I: AsyncWorkers<I, O>) => AsyncWorkflow<I, O>;
    [ASYNC_WORKFLOW_SYMBOL]: true;
};
export declare const isAsyncWorkflow: (input: any) => input is AsyncWorkflow<any, any>;
export declare const createAsyncWorkflow: <I = void, O = unknown>() => AsyncWorkflow<I, O>;
export {};
