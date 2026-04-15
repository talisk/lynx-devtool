import type { Workers } from './sync';
declare const SYNC_PARALLEL_WORKFLOW_SYMBOL: unique symbol;
export type SyncParallelWorkflow<I, O = any> = {
    run: (input: I) => O[];
    use: (...I: Workers<I, O>) => SyncParallelWorkflow<I, O>;
    [SYNC_PARALLEL_WORKFLOW_SYMBOL]: true;
};
export declare const isSyncParallelWorkflow: (input: any) => input is SyncParallelWorkflow<any, any>;
export declare const createSyncParallelWorkflow: <I = void, O = unknown>() => SyncParallelWorkflow<I, O>;
export {};
