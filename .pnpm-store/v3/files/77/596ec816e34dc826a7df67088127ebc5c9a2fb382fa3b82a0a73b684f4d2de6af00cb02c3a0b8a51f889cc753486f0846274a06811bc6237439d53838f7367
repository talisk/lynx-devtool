import { type MaybeAsync } from '../farrow-pipeline';
declare const ASYNC_INTERRUPT_WORKFLOW_SYMBOL: unique symbol;
export type AsyncInterruptWorker<I, O> = (I: I, interrupt: (result: any) => void) => MaybeAsync<O>;
export type AsyncInterruptWorkers<I, O> = AsyncInterruptWorker<I, O>[];
export type AsyncInterruptWorkflow<I, O> = {
    run: (input: I) => MaybeAsync<O[]>;
    use: (...I: AsyncInterruptWorkers<I, O>) => AsyncInterruptWorkflow<I, O>;
    [ASYNC_INTERRUPT_WORKFLOW_SYMBOL]: true;
};
export declare const isAsyncInterruptWorkflow: (input: any) => input is AsyncInterruptWorkflow<any, any>;
export declare const createAsyncInterruptWorkflow: <I = void, O = unknown>() => AsyncInterruptWorkflow<I, O>;
export {};
