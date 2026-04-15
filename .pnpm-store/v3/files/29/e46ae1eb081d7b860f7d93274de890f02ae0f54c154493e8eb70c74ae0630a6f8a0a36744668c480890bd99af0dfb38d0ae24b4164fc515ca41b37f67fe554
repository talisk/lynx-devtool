import type { RequestPayload } from '@modern-js/types';
import type { LoaderContext } from './createLoaderCtx';
interface Get<P extends Record<string, unknown>> {
    <Key extends keyof P>(key: Key): P[Key];
    <T>(key: LoaderContext<T>): T;
}
interface Set<P extends Record<string, unknown>> {
    <Key extends keyof P>(key: Key, value: P[Key]): void;
    <T>(key: LoaderContext<T>, value: T): void;
}
export type RequestContext<P extends Record<string, unknown> = {}> = {
    get: Get<P & RequestPayload>;
    set: Set<P & RequestPayload>;
};
export declare function createRequestContext<P extends Record<string, unknown>>(context?: Map<string | symbol, unknown>): RequestContext<P>;
export {};
