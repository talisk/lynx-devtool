declare const WORKFLOW_SYMBOL: unique symbol;
export type Worker<I, O> = (I: I) => O;
export type Workers<I, O> = Worker<I, O>[];
export type Workflow<I, O> = {
    run: (input: I) => O[];
    use: (...I: Workers<I, O>) => Workflow<I, O>;
    [WORKFLOW_SYMBOL]: true;
};
export declare const createWorkflow: <I = void, O = unknown>() => Workflow<I, O>;
export declare const isWorkflow: (input: any) => input is Workflow<unknown, unknown>;
export {};
