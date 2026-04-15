/// <reference types="react" />
import { type PluginRunner } from './base';
export declare function setGlobalRunner(runner: PluginRunner): void;
export declare function getGlobalRunner(): import("@modern-js/plugin").ToRunners<{
    beforeRender: import("@modern-js/plugin").AsyncInterruptWorkflow<import("..").RuntimeContext, void>;
    wrapRoot: import("@modern-js/plugin").Waterfall<import("react").ComponentType<any>>;
    pickContext: import("@modern-js/plugin").Waterfall<import("../context/runtime").TRuntimeContext>;
    modifyRuntimeConfig: import("@modern-js/plugin").SyncParallelWorkflow<void, Record<string, any>>;
}>;
