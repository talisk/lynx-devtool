/// <reference types="node" />
/// <reference types="node" />
/**
 * The following code is modified based on
 * https://github.com/remix-run/remix/blob/f7defe0b46c50947f6269d5ab5b6e3fe59339054/packages/remix-node/stream.ts#L3
 *
 * MIT Licensed
 * Author Michael Jackson
 * Copyright 2021 Remix Software Inc.
 * https://github.com/remix-run/remix/blob/f7defe0b46c50947f6269d5ab5b6e3fe59339054/LICENSE.md
 */
import type { Readable, Writable } from 'node:stream';
export declare function writeReadableStreamToWritable(stream: ReadableStream, writable: Writable): Promise<void>;
export declare function writeAsyncIterableToWritable(iterable: AsyncIterable<Uint8Array>, writable: Writable): Promise<void>;
export declare function readableStreamToString(stream: ReadableStream<Uint8Array>, encoding?: BufferEncoding): Promise<string>;
export declare const createReadableStreamFromReadable: (source: Readable & {
    readableHighWaterMark?: number;
}) => ReadableStream<Uint8Array>;
