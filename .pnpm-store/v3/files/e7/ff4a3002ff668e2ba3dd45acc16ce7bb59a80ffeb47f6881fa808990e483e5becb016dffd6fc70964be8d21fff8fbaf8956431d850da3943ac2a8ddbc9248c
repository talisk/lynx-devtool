import type { Container } from '@modern-js/types';
interface MemoryContainerOptions {
    /** The maximum size of the cache, unit(MB). The default of value is 256. */
    max?: number;
    maxAge?: number;
}
/**
 * MemoryContainer, it use lur-cache as cahe layer.
 * It has a Time to Live, by default as 1 hour.
 */
export declare class MemoryContainer<K, V = unknown> implements Container<K, V> {
    private static BYTE;
    private static KB;
    private static MB;
    private static ms;
    private static second;
    private static minute;
    private static hour;
    private cache;
    constructor({ max, maxAge }?: MemoryContainerOptions);
    get(key: K): Promise<V | undefined>;
    set(key: K, value: V): Promise<this>;
    has(key: K): Promise<boolean>;
    delete(key: K): Promise<boolean>;
    forEach(callbackFn: (v: V, k: K, container: this) => void): void;
}
export {};
