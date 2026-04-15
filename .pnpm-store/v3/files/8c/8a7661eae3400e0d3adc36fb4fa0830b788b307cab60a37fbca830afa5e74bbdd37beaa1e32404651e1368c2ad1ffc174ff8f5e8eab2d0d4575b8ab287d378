/// <reference types="react" />
import { type PluginOptions, type Setup } from '@modern-js/plugin';
import type { RuntimeContext, TRuntimeContext } from '../context/runtime';
import type { RuntimeConfig } from './index';
export declare const RuntimeConfigContext: import("@modern-js/plugin").Context<RuntimeConfig>;
export declare const useRuntimeConfigContext: () => RuntimeConfig;
export interface AppProps {
}
declare const runtimeHooks: {
    beforeRender: import("@modern-js/plugin").AsyncInterruptWorkflow<RuntimeContext, void>;
    wrapRoot: import("@modern-js/plugin").Waterfall<import("react").ComponentType<any>>;
    pickContext: import("@modern-js/plugin").Waterfall<TRuntimeContext>;
    modifyRuntimeConfig: import("@modern-js/plugin").SyncParallelWorkflow<void, Record<string, any>>;
};
declare const runtimePluginAPI: {
    useRuntimeConfigContext: () => RuntimeConfig;
};
/** All hooks of runtime plugin. */
export type RuntimeHooks = typeof runtimeHooks;
export type RuntimePluginAPI = typeof runtimePluginAPI;
/** Plugin options of a runtime plugin. */
export type Plugin = PluginOptions<RuntimeHooks, Setup<RuntimeHooks, RuntimePluginAPI>>;
export declare const createRuntime: () => import("@modern-js/plugin").Manager<{
    beforeRender: import("@modern-js/plugin").AsyncInterruptWorkflow<RuntimeContext, void>;
    wrapRoot: import("@modern-js/plugin").Waterfall<import("react").ComponentType<any>>;
    pickContext: import("@modern-js/plugin").Waterfall<TRuntimeContext>;
    modifyRuntimeConfig: import("@modern-js/plugin").SyncParallelWorkflow<void, Record<string, any>>;
}, {
    useRuntimeConfigContext: () => RuntimeConfig;
}>;
export declare const runtime: import("@modern-js/plugin").Manager<{
    beforeRender: import("@modern-js/plugin").AsyncInterruptWorkflow<RuntimeContext, void>;
    wrapRoot: import("@modern-js/plugin").Waterfall<import("react").ComponentType<any>>;
    pickContext: import("@modern-js/plugin").Waterfall<TRuntimeContext>;
    modifyRuntimeConfig: import("@modern-js/plugin").SyncParallelWorkflow<void, Record<string, any>>;
}, {
    useRuntimeConfigContext: () => RuntimeConfig;
}>;
export type PluginRunner = ReturnType<typeof runtime.init>;
export {};
