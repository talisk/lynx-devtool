import type React from 'react';
import type { RuntimeContext } from '../../context';
import type { HandleRequestConfig } from '../requestHandler';
import type { RenderStreaming, SSRConfig } from '../shared';
export type CreateReadableStreamFromElementOptions = {
    runtimeContext: RuntimeContext;
    config: HandleRequestConfig;
    ssrConfig: SSRConfig;
    htmlTemplate: string;
    entryName: string;
    onShellReady?: () => void;
    onShellError?: (error: unknown) => void;
    onAllReady?: () => void;
    onError?: (error: unknown) => void;
};
export type CreateReadableStreamFromElement = (request: Request, rootElement: React.ReactElement, options: CreateReadableStreamFromElementOptions) => Promise<ReadableStream<Uint8Array>>;
export declare enum ShellChunkStatus {
    START = 0,
    FINISH = 1
}
export declare function encodeForWebStream(thing: unknown): unknown;
export declare function getReadableStreamFromString(content: string): ReadableStream;
export declare function createRenderStreaming(createReadableStreamFromElement: CreateReadableStreamFromElement): RenderStreaming;
