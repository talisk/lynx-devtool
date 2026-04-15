import type { InternalPlugins } from '@modern-js/types';
import type { CliPlugin, OldPluginConfig, PluginConfig, UserConfig } from './types';
export declare const isOldPluginConfig: (config?: PluginConfig) => config is OldPluginConfig;
/**
 * Load internal plugins which in @modern-js scope and user's custom plugins.
 * @param appDirectory - Application root directory.
 * @param userConfig - Resolved user config.
 * @param options.internalPlugins - Internal plugins.
 * @returns Plugin Objects has been required.
 */
export declare const loadPlugins: (appDirectory: string, userConfig: UserConfig, options?: {
    internalPlugins?: InternalPlugins;
    autoLoad?: InternalPlugins;
    forceAutoLoadPlugins?: boolean;
}) => Promise<CliPlugin[]>;
