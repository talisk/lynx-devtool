import type { ReactElement } from 'react';
import type { ChunkSet, Collector } from './types';
declare module '@loadable/server' {
    interface ChunkExtractor {
        chunks: Chunk;
        getChunkAssets: (chunks: Chunk) => Chunk[];
    }
}
export interface LoadableCollectorOptions {
    nonce?: string;
    stats?: Record<string, any>;
    routeManifest?: Record<string, any>;
    template: string;
    entryName: string;
    chunkSet: ChunkSet;
    config: LoadableCollectorConfig;
}
export interface LoadableCollectorConfig {
    scriptLoading?: 'defer' | 'blocking' | 'module' | 'async';
    enableInlineStyles?: boolean | RegExp;
    enableInlineScripts?: boolean | RegExp;
    crossorigin?: boolean | 'anonymous' | 'use-credentials';
}
export declare class LoadableCollector implements Collector {
    private options;
    private extractor?;
    constructor(options: LoadableCollectorOptions);
    private get existsAssets();
    collect(comopnent: ReactElement): ReactElement;
    effect(): Promise<void>;
    private emitLoadableScripts;
    private emitScriptAssets;
    private emitStyleAssets;
    private generateAttributes;
}
