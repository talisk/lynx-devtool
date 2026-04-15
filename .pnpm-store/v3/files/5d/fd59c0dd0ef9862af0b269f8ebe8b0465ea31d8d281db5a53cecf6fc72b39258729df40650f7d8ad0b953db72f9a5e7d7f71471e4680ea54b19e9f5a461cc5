/// <reference types="node" />
/// <reference types="node" />
import type { ProdServerOptions } from './types';
export { applyPlugins, type ApplyPlugins } from './apply';
export { loadServerPlugins, loadServerRuntimeConfig, } from '@modern-js/server-core/node';
export type { ServerPlugin } from '@modern-js/server-core';
export type { ProdServerOptions, BaseEnv } from './types';
export declare const createProdServer: (options: ProdServerOptions) => Promise<(import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse> | import("https").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>) & {
    getRequestListener: () => (req: import("http").IncomingMessage, res: import("@modern-js/server-core/dist/types/types").NodeResponse) => Promise<void>;
    getRequestHandler: () => import("@modern-js/server-core/dist/types/types").RequestHandler;
}>;
