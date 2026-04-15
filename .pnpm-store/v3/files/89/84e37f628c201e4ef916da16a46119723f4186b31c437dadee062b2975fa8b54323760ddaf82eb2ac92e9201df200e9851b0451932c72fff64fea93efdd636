import type { MaybeAsync } from '@modern-js/plugin';
type TransformCb = (tempalte: string) => MaybeAsync<string>;
export declare function createTransformStream(fn?: TransformCb): TransformStream<any, any>;
export declare function transformResponse(response: Response, transformCb: Array<TransformCb> | TransformCb): Response;
export {};
