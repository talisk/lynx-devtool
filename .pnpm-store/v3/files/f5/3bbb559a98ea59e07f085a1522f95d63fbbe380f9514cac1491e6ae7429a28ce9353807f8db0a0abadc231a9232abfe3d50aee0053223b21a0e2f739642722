/// <reference types="react" />
import { type Plugin, runtime } from './base';
export * from './base';
export interface RuntimeConfig {
    plugins?: Plugin[];
}
export declare function registerPlugin(internalPlugins: Plugin[], runtimeConfig?: RuntimeConfig, customRuntime?: typeof runtime): import("@modern-js/plugin").ToRunners<{
    beforeRender: import("@modern-js/plugin").AsyncInterruptWorkflow<import("..").RuntimeContext, void>;
    wrapRoot: import("@modern-js/plugin").Waterfall<import("react").ComponentType<any>>;
    pickContext: import("@modern-js/plugin").Waterfall<import("../context/runtime").TRuntimeContext>;
    modifyRuntimeConfig: import("@modern-js/plugin").SyncParallelWorkflow<void, Record<string, any>>;
}>;
export declare function mergeConfig(config: Record<string, any>, ...otherConfig: Record<string, any>[]): Record<string, any>;
