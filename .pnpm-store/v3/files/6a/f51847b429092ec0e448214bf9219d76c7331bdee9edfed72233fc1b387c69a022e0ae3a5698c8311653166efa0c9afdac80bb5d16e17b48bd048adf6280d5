/// <reference types="node" />
import Fs from '@modern-js/utils/fs-extra';
import type { Storage } from './storer/storage';
export declare class FileReader {
    private storage;
    private fs;
    constructor(storage: Storage<Buffer | null>);
    readFile(path: string, encoding?: 'utf-8'): Promise<string | null>;
    readFile(path: string, encoding?: 'buffer'): Promise<Buffer | null>;
    /**
     * Clear the fileCache entriely.
     */
    reset(fs?: typeof Fs): Promise<void>;
    private encodingContent;
}
export declare const fileReader: FileReader;
