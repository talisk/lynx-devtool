import type { Logger, ServerRoute } from '@modern-js/types';
import type { Middleware, ServerEnv, ServerManifest, ServerPlugin } from '../../../types';
export declare function getHtmlTemplates(pwd: string, routes: ServerRoute[]): Promise<Record<string, string>>;
export declare function injectTemplates(pwd: string, routes?: ServerRoute[]): Middleware<ServerEnv>;
export declare function getServerManifest(pwd: string, routes: ServerRoute[], logger: Logger): Promise<ServerManifest>;
export declare function injectServerManifest(pwd: string, routes?: ServerRoute[]): Middleware<ServerEnv>;
export declare const injectResourcePlugin: () => ServerPlugin;
