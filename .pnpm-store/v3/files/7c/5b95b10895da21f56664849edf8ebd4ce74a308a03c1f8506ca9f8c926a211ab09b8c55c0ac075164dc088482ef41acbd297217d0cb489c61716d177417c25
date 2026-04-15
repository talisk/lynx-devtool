import { bundle } from '@modern-js/node-bundle-require';
import type { ServerConfig } from '@modern-js/server-core';
import type { AppNormalizedConfig } from '../types';
export declare const defineServerConfig: (config: ServerConfig) => ServerConfig;
export declare const buildServerConfig: ({ appDirectory, distDirectory, configFile, options, watch, }: {
    appDirectory: string;
    distDirectory: string;
    configFile: string;
    options?: Parameters<typeof bundle>[1];
    watch?: boolean | undefined;
}) => Promise<void>;
export declare const emitResolvedConfig: (appDirectory: string, resolvedConfig: AppNormalizedConfig<'shared'>) => Promise<void>;
