import type { Container } from '@modern-js/types';
export declare class Storage<V = unknown> {
    private namespace;
    private container;
    constructor(namespace: string, container: Container<string, V>);
    keys?(): Promise<string[]>;
    values?(): Promise<V[]>;
    /**
     * Returns a specified element from the container. If the value that is associated to the provided key is an object, then you will get a reference to that object and any change made to that object will effectively modify it inside the Container.
     * @returns Returns the element associated with the specified key. If no element is associated with the specified key, undefined is returned.
     */
    get(key: string): Promise<V | undefined>;
    /**
     * Adds a new element with a specified key and value to the storage. If an element with the same key already exists, the element will be updated.
     */
    set(key: string, value: V): Promise<this>;
    /**
     * @returns boolean indicating whether an element with the specified key exists or not.
     */
    has(key: string): Promise<boolean>;
    delete(key: string): Promise<boolean>;
    clear?(): Promise<void>;
    forEach?(fallbackFn: (v: V, k: string, storage: this) => void): void;
    private computedUniqueKey;
    private checkIsOwnkey;
}
