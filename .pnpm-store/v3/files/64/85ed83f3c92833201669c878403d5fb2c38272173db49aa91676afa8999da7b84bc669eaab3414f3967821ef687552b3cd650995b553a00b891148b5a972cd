import type { CliPlugin, IAppContext, NormalizedConfig, UserConfig } from './types';
export declare const AppContext: import("@modern-js/plugin").Context<IAppContext>;
export declare const ConfigContext: import("@modern-js/plugin").Context<UserConfig<any>>;
export declare const ResolvedConfigContext: import("@modern-js/plugin").Context<NormalizedConfig<any>>;
/**
 * Set app context.
 * @param value new app context. It will override previous app context.
 */
export declare const setAppContext: (value: IAppContext) => void;
/**
 * Get app context, including directories, plugins and some static infos.
 */
export declare const useAppContext: () => IAppContext;
/**
 * Get original content of user config.
 */
export declare const useConfigContext: <Extends extends Record<string, any>>() => UserConfig<Extends>;
/**
 * Get normalized content of user config.
 */
export declare const useResolvedConfigContext: <Extends extends Record<string, any>>() => NormalizedConfig<Extends>;
export declare const initAppContext: ({ appDirectory, plugins, configFile, runtimeConfigFile, options, serverConfigFile, }: {
    appDirectory: string;
    plugins: CliPlugin[];
    configFile: string | false;
    runtimeConfigFile: string | false;
    options?: {
        metaName?: string | undefined;
        srcDir?: string | undefined;
        apiDir?: string | undefined;
        distDir?: string | undefined;
        sharedDir?: string | undefined;
    } | undefined;
    serverConfigFile: string;
}) => IAppContext;
