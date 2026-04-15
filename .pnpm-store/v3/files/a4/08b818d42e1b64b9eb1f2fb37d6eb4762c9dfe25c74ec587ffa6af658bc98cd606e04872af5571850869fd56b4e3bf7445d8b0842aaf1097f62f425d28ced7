import type { ServerBaseOptions, ServerPlugin } from '@modern-js/server-core';
import type { UniBuilderInstance } from '@modern-js/uni-builder';
import type { ModernDevServerOptions } from './types';
type BuilderDevServer = Awaited<ReturnType<UniBuilderInstance['createDevServer']>>;
export type DevPluginOptions = ModernDevServerOptions<ServerBaseOptions> & {
    builderDevServer?: BuilderDevServer;
};
export declare const devPlugin: (options: DevPluginOptions) => ServerPlugin;
export {};
