export * from './types';
export * from './loadEnv';
export * from '@modern-js/plugin';
export { loadConfig } from './config';
export { mergeConfig, initAppDir } from './utils';
export { manager, createPlugin, registerHook } from './manager';
export { AppContext, ConfigContext, ResolvedConfigContext, useAppContext, useConfigContext, useResolvedConfigContext, initAppContext, } from './context';
export declare const cli: {
    init: (options?: import("./types").CoreOptions | undefined) => Promise<{
        resolved: import("./types").NormalizedConfig<{}>;
        appContext: import("./types").IAppContext;
    }>;
    run: (options?: import("./types").CoreOptions | undefined) => Promise<void>;
    test: (argv: string[], options?: {
        coreOptions?: import("./types").CoreOptions | undefined;
        disableWatcher?: boolean | undefined;
    } | undefined) => Promise<void>;
    runCommand: (command: string, commandOptions?: string[], options?: import("./types").CoreOptions | undefined) => Promise<void>;
    getPrevInitOptions: () => import("./types").CoreOptions | undefined;
};
declare module '@modern-js/utils/compiled/commander' {
    interface Command {
        commandsMap: Map<string, Command>;
    }
}
