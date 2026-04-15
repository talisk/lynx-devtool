/// <reference types="node" />
import type { IncomingMessage } from 'http';
import type { Logger, Metrics, Reporter, ServerRoute } from '@modern-js/types';
import type { CacheConfig, ServerManifest, UserConfig } from '../../types';
import type { OnError, OnTiming, Params } from '../../types/requestHandler';
export interface SSRRenderOptions {
    pwd: string;
    html: string;
    routeInfo: ServerRoute;
    staticGenerate: boolean;
    config: UserConfig;
    serverManifest: ServerManifest;
    loaderContext: Map<string, unknown>;
    params: Params;
    logger: Logger;
    metrics?: Metrics;
    reporter?: Reporter;
    /** Produce by custom server hook */
    locals?: Record<string, any>;
    cacheConfig?: CacheConfig;
    nodeReq?: IncomingMessage;
    onError?: OnError;
    onTiming?: OnTiming;
}
export declare function ssrRender(request: Request, { routeInfo, html, config: userConfig, staticGenerate, nodeReq, serverManifest, locals, params, loaderContext, reporter, cacheConfig, logger, metrics, onError, onTiming, }: SSRRenderOptions): Promise<Response>;
