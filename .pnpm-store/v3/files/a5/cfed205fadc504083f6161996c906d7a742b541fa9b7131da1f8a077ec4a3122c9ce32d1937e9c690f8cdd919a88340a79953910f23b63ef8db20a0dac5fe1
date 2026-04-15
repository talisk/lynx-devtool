import { type FSWatcher, type WatchOptions } from '@modern-js/utils';
export type WatchEvent = 'add' | 'change' | 'unlink';
export declare const defaultWatchOptions: {
    ignoreInitial: boolean;
    ignored: RegExp;
};
export declare const getWatchedFiles: (watcher: FSWatcher) => string[];
export declare const mergeWatchOptions: (options?: WatchOptions) => WatchOptions;
export default class Watcher {
    private dependencyTree;
    private watcher;
    listen(files: string[], options: WatchOptions, callback: (changed: string, event: WatchEvent) => void): void;
    createDepTree(): void;
    updateDepTree(): void;
    cleanDepCache(filepath: string): void;
    close(): Promise<void>;
}
