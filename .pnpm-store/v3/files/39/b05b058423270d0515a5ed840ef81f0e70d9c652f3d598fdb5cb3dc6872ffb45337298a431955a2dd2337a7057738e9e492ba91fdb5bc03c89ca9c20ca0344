import type { CoreOptions } from './types';
export declare const mergeOptions: (options?: CoreOptions) => CoreOptions;
export declare const createCli: () => {
    init: (options?: CoreOptions) => Promise<{
        resolved: import("./types").NormalizedConfig<{}>;
        appContext: import("./types").IAppContext;
    }>;
    run: (options?: CoreOptions) => Promise<void>;
    test: (argv: string[], options?: {
        coreOptions?: CoreOptions;
        disableWatcher?: boolean;
    }) => Promise<void>;
    runCommand: (command: string, commandOptions?: string[], options?: CoreOptions) => Promise<void>;
    getPrevInitOptions: () => CoreOptions | undefined;
};
