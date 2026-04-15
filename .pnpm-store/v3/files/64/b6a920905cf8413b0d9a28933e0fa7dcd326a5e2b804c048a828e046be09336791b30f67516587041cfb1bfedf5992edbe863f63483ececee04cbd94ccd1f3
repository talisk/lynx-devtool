import type { Writable } from 'node:stream';
export interface LogUpdate {
    clear: () => void;
    done: () => void;
    (str: string): void;
}
declare const create: (stream: Writable) => LogUpdate;
export { create };
