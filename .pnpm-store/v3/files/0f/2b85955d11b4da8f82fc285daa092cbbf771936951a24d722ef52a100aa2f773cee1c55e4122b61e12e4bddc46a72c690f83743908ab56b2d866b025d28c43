import type { ServerRoute } from '@modern-js/types';
import type { HtmlNormalizedConfig, Middleware, OutputNormalizedConfig, ServerPlugin } from '../../../types';
export declare const serverStaticPlugin: () => ServerPlugin;
export type PublicMiddlwareOptions = {
    pwd: string;
    routes: ServerRoute[];
};
export declare function createPublicMiddleware({ pwd, routes, }: PublicMiddlwareOptions): Middleware;
export interface ServerStaticOptions {
    pwd: string;
    output: OutputNormalizedConfig;
    html: HtmlNormalizedConfig;
    routes?: ServerRoute[];
}
export declare function createStaticMiddleware(options: ServerStaticOptions): Middleware;
