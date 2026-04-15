import type { BasePluginAPI } from './types';
export declare const manager: import("@modern-js/plugin").AsyncManager<{
    beforeConfig: import("@modern-js/plugin").AsyncWorkflow<void, void>;
    config: import("@modern-js/plugin").ParallelWorkflow<void, import("./types").UserConfig<{}>>;
    resolvedConfig: import("@modern-js/plugin").AsyncWaterfall<{
        resolved: import("./types").NormalizedConfig<{}>;
    }>;
    prepare: import("@modern-js/plugin").AsyncWorkflow<void, void>;
    afterPrepare: import("@modern-js/plugin").AsyncWorkflow<void, void>;
    watchFiles: import("@modern-js/plugin").ParallelWorkflow<void, string[] | {
        files: string[];
        isPrivate: boolean;
    }>;
    fileChange: import("@modern-js/plugin").AsyncWorkflow<{
        filename: string;
        eventType: "add" | "unlink" | "change";
        isPrivate: boolean;
    }, void>;
    commands: import("@modern-js/plugin").AsyncWorkflow<{
        program: import("@modern-js/utils").Command;
    }, void>;
    beforeExit: import("@modern-js/plugin").Workflow<void, void>;
    addRuntimeExports: import("@modern-js/plugin").AsyncWaterfall<void>;
}, BasePluginAPI<{}>>;
export declare const createPlugin: (setup?: import("@modern-js/plugin").AsyncSetup<{
    beforeConfig: import("@modern-js/plugin").AsyncWorkflow<void, void>;
    config: import("@modern-js/plugin").ParallelWorkflow<void, import("./types").UserConfig<{}>>;
    resolvedConfig: import("@modern-js/plugin").AsyncWaterfall<{
        resolved: import("./types").NormalizedConfig<{}>;
    }>;
    prepare: import("@modern-js/plugin").AsyncWorkflow<void, void>;
    afterPrepare: import("@modern-js/plugin").AsyncWorkflow<void, void>;
    watchFiles: import("@modern-js/plugin").ParallelWorkflow<void, string[] | {
        files: string[];
        isPrivate: boolean;
    }>;
    fileChange: import("@modern-js/plugin").AsyncWorkflow<{
        filename: string;
        eventType: "add" | "unlink" | "change";
        isPrivate: boolean;
    }, void>;
    commands: import("@modern-js/plugin").AsyncWorkflow<{
        program: import("@modern-js/utils").Command;
    }, void>;
    beforeExit: import("@modern-js/plugin").Workflow<void, void>;
    addRuntimeExports: import("@modern-js/plugin").AsyncWaterfall<void>;
}, BasePluginAPI<{}>> | undefined, options?: import("@modern-js/plugin").PluginOptions<{
    beforeConfig: import("@modern-js/plugin").AsyncWorkflow<void, void>;
    config: import("@modern-js/plugin").ParallelWorkflow<void, import("./types").UserConfig<{}>>;
    resolvedConfig: import("@modern-js/plugin").AsyncWaterfall<{
        resolved: import("./types").NormalizedConfig<{}>;
    }>;
    prepare: import("@modern-js/plugin").AsyncWorkflow<void, void>;
    afterPrepare: import("@modern-js/plugin").AsyncWorkflow<void, void>;
    watchFiles: import("@modern-js/plugin").ParallelWorkflow<void, string[] | {
        files: string[];
        isPrivate: boolean;
    }>;
    fileChange: import("@modern-js/plugin").AsyncWorkflow<{
        filename: string;
        eventType: "add" | "unlink" | "change";
        isPrivate: boolean;
    }, void>;
    commands: import("@modern-js/plugin").AsyncWorkflow<{
        program: import("@modern-js/utils").Command;
    }, void>;
    beforeExit: import("@modern-js/plugin").Workflow<void, void>;
    addRuntimeExports: import("@modern-js/plugin").AsyncWaterfall<void>;
}, import("@modern-js/plugin").AsyncSetup<{
    beforeConfig: import("@modern-js/plugin").AsyncWorkflow<void, void>;
    config: import("@modern-js/plugin").ParallelWorkflow<void, import("./types").UserConfig<{}>>;
    resolvedConfig: import("@modern-js/plugin").AsyncWaterfall<{
        resolved: import("./types").NormalizedConfig<{}>;
    }>;
    prepare: import("@modern-js/plugin").AsyncWorkflow<void, void>;
    afterPrepare: import("@modern-js/plugin").AsyncWorkflow<void, void>;
    watchFiles: import("@modern-js/plugin").ParallelWorkflow<void, string[] | {
        files: string[];
        isPrivate: boolean;
    }>;
    fileChange: import("@modern-js/plugin").AsyncWorkflow<{
        filename: string;
        eventType: "add" | "unlink" | "change";
        isPrivate: boolean;
    }, void>;
    commands: import("@modern-js/plugin").AsyncWorkflow<{
        program: import("@modern-js/utils").Command;
    }, void>;
    beforeExit: import("@modern-js/plugin").Workflow<void, void>;
    addRuntimeExports: import("@modern-js/plugin").AsyncWaterfall<void>;
}, BasePluginAPI<{}>>> | undefined) => import("@modern-js/plugin").AsyncPlugin<{
    beforeConfig: import("@modern-js/plugin").AsyncWorkflow<void, void>;
    config: import("@modern-js/plugin").ParallelWorkflow<void, import("./types").UserConfig<{}>>;
    resolvedConfig: import("@modern-js/plugin").AsyncWaterfall<{
        resolved: import("./types").NormalizedConfig<{}>;
    }>;
    prepare: import("@modern-js/plugin").AsyncWorkflow<void, void>;
    afterPrepare: import("@modern-js/plugin").AsyncWorkflow<void, void>;
    watchFiles: import("@modern-js/plugin").ParallelWorkflow<void, string[] | {
        files: string[];
        isPrivate: boolean;
    }>;
    fileChange: import("@modern-js/plugin").AsyncWorkflow<{
        filename: string;
        eventType: "add" | "unlink" | "change";
        isPrivate: boolean;
    }, void>;
    commands: import("@modern-js/plugin").AsyncWorkflow<{
        program: import("@modern-js/utils").Command;
    }, void>;
    beforeExit: import("@modern-js/plugin").Workflow<void, void>;
    addRuntimeExports: import("@modern-js/plugin").AsyncWaterfall<void>;
}, BasePluginAPI<{}>>, registerHook: (newHooks: Partial<{
    beforeConfig: import("@modern-js/plugin").AsyncWorkflow<void, void>;
    config: import("@modern-js/plugin").ParallelWorkflow<void, import("./types").UserConfig<{}>>;
    resolvedConfig: import("@modern-js/plugin").AsyncWaterfall<{
        resolved: import("./types").NormalizedConfig<{}>;
    }>;
    prepare: import("@modern-js/plugin").AsyncWorkflow<void, void>;
    afterPrepare: import("@modern-js/plugin").AsyncWorkflow<void, void>;
    watchFiles: import("@modern-js/plugin").ParallelWorkflow<void, string[] | {
        files: string[];
        isPrivate: boolean;
    }>;
    fileChange: import("@modern-js/plugin").AsyncWorkflow<{
        filename: string;
        eventType: "add" | "unlink" | "change";
        isPrivate: boolean;
    }, void>;
    commands: import("@modern-js/plugin").AsyncWorkflow<{
        program: import("@modern-js/utils").Command;
    }, void>;
    beforeExit: import("@modern-js/plugin").Workflow<void, void>;
    addRuntimeExports: import("@modern-js/plugin").AsyncWaterfall<void>;
}>) => void;
