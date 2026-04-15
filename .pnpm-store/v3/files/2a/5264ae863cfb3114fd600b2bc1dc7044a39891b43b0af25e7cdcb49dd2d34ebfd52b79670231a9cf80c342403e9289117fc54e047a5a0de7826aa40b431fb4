import type { ServerRoute } from '@modern-js/types';
import type { CacheConfig, OnFallback, UserConfig } from '../../types';
import type { Render } from '../../types';
interface CreateRenderOptions {
    pwd: string;
    routes: ServerRoute[];
    config: UserConfig;
    cacheConfig?: CacheConfig;
    staticGenerate?: boolean;
    onFallback?: OnFallback;
    metaName?: string;
    forceCSR?: boolean;
    nonce?: string;
}
export declare function createRender({ routes, pwd, metaName, staticGenerate, cacheConfig, forceCSR, config, onFallback: onFallbackFn, }: CreateRenderOptions): Promise<Render>;
export {};
