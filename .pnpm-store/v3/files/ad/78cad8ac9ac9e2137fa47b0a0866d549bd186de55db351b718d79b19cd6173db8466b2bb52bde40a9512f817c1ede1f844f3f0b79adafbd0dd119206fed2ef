import type { ServerRoute } from '@modern-js/types';
import { Hono } from 'hono';
import type { Env, ServerConfig, ServerHookRunner, ServerPlugin } from './types';
import type { CliConfig } from './types/config';
declare module '@modern-js/types' {
    interface ISAppContext {
        serverBase?: ServerBase;
    }
}
export type ServerBaseOptions = {
    /** server working directory, and then also dist directory */
    pwd: string;
    config: CliConfig;
    serverConfig?: ServerConfig;
    metaName?: string;
    routes?: ServerRoute[];
    appContext: {
        internalDirectory?: string;
        appDirectory?: string;
        sharedDirectory?: string;
        apiDirectory?: string;
        lambdaDirectory?: string;
    };
    runMode?: 'apiOnly' | 'ssrOnly' | 'webOnly';
};
export declare class ServerBase<E extends Env = any> {
    #private;
    options: ServerBaseOptions;
    runner: ServerHookRunner;
    private app;
    private appContext;
    private pluginManager;
    constructor(options: ServerBaseOptions);
    /**
     * 初始化顺序
     * - 初始化 pluginManager;
     * - 执行 runner.prepare;
     * - 应用 middlewares
     */
    init(): Promise<this>;
    addPlugins(plugins: ServerPlugin[]): void;
    get all(): import("hono/types").HandlerInterface<E, "all", {}, "/">;
    get use(): import("hono/types").MiddlewareHandlerInterface<E, {}, "/">;
    get get(): import("hono/types").HandlerInterface<E, "get", {}, "/">;
    get post(): import("hono/types").HandlerInterface<E, "post", {}, "/">;
    get put(): import("hono/types").HandlerInterface<E, "put", {}, "/">;
    get delete(): import("hono/types").HandlerInterface<E, "delete", {}, "/">;
    get patch(): import("hono/types").HandlerInterface<E, "patch", {}, "/">;
    get handle(): (request: Request, Env?: {} | E["Bindings"] | undefined, executionCtx?: import("hono/dist/types/context").ExecutionContext | undefined) => Response | Promise<Response>;
    get request(): (input: RequestInfo | URL, requestInit?: RequestInit | undefined, Env?: {} | E["Bindings"] | undefined, executionCtx?: import("hono/dist/types/context").ExecutionContext | undefined) => Response | Promise<Response>;
    get notFound(): (handler: import("hono").NotFoundHandler<E>) => Hono<E, {}, "/">;
    get onError(): (handler: import("hono").ErrorHandler<E>) => Hono<E, {}, "/">;
}
export declare function createServerBase<E extends Env>(options: ServerBaseOptions): ServerBase<E>;
