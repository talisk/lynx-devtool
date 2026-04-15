/// <reference types="node" />
import type { IncomingMessage } from 'http';
import type { CacheControl, CacheOption, Container } from '@modern-js/types';
import type { RequestHandler, RequestHandlerOptions } from '../../types/requestHandler';
export type CacheStatus = 'hit' | 'stale' | 'expired' | 'miss';
type MaybeAsync<T> = Promise<T> | T;
export declare function matchCacheControl(cacheOption?: CacheOption, req?: IncomingMessage): MaybeAsync<CacheControl | undefined | false>;
export interface GetCacheResultOptions {
    cacheControl: CacheControl;
    requestHandler: RequestHandler;
    requestHandlerOptions: RequestHandlerOptions;
    container?: Container;
}
export declare function getCacheResult(request: Request, options: GetCacheResultOptions): Promise<Response>;
export {};
