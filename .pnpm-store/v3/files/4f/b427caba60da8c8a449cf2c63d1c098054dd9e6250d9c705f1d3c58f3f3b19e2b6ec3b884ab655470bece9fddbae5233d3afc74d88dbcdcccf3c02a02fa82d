import type { CacheConfig, GetRenderHandlerOptions, Render, ServerPlugin } from '../../types';
export interface InjectRenderHandlerOptions {
    staticGenerate?: boolean;
    cacheConfig?: CacheConfig;
}
export declare const injectRenderHandlerPlugin: ({ staticGenerate, cacheConfig, }: InjectRenderHandlerOptions) => ServerPlugin;
export declare function getRenderHandler({ pwd, routes, config, cacheConfig, metaName, staticGenerate, onFallback, }: GetRenderHandlerOptions): Promise<Render>;
