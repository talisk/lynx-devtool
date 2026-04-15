/// <reference types="node" />
/// <reference types="node" />
import type { ApplyPlugins, ModernDevServerOptions } from './types';
export declare function createDevServer(options: ModernDevServerOptions, applyPlugins: ApplyPlugins): Promise<{
    server: (import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse> | import("https").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>) & {
        getRequestListener: () => (req: import("http").IncomingMessage, res: import("http").ServerResponse) => Promise<void>;
        getRequestHandler: () => import("@modern-js/server-core/dist/types/types").RequestHandler;
    };
    afterListen: () => Promise<void>;
}>;
