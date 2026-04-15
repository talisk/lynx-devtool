import type { CommonAPI, Hook, PluginOptions, ToRunners, ToThreads } from './types';
/** Setup function of sync plugin. */
export type Setup<Hooks, API = Record<string, never>> = (api: API) => Partial<ToThreads<Hooks>> | void;
declare const SYNC_PLUGIN_SYMBOL = "SYNC_PLUGIN_SYMBOL";
export type Plugin<Hooks, API> = {
    SYNC_PLUGIN_SYMBOL: typeof SYNC_PLUGIN_SYMBOL;
} & Required<PluginOptions<Hooks, Setup<Hooks, API>>>;
export type Manager<Hooks, API> = {
    /**
     * Create a sync plugin.
     * @param setup the setup function.
     * @param options optional plugin options.
     */
    createPlugin: (setup?: Setup<Hooks, API>, options?: PluginOptions<Hooks, Setup<Hooks, API>>) => Plugin<Hooks, API>;
    /**
     * Determine if a value is a sync plugin.
     * @param input
     */
    isPlugin: (input: unknown) => input is Plugin<Hooks, API>;
    /**
     * Register new plugins to current manager.
     * @param plugins one or more plugin.
     */
    usePlugin: (...plugins: Array<Plugin<Hooks, API> | PluginOptions<Hooks, Setup<Hooks, API>> | (() => PluginOptions<Hooks, Setup<Hooks, API>>)>) => Manager<Hooks, API>;
    /**
     * Init manager, it will call the setup function of all registered plugins.
     */
    init: () => ToRunners<Hooks>;
    /**
     * Run callback function.
     * @param callback
     */
    run: <O>(cb: () => O) => O;
    /**
     * Register new hooks.
     * @param newHooks
     */
    registerHook: (hewHooks: Partial<Hooks>) => void;
    /**
     * Clear all registered plugins.
     */
    clear: () => void;
    /**
     * Return a cloned manager.
     * @param overrideAPI override the default plugin API.
     */
    clone: (overrideAPI?: Partial<API & CommonAPI<Hooks>>) => Manager<Hooks, API>;
    /**
     * Get all runner functions of the hooks.
     */
    useRunner: () => ToRunners<Hooks>;
};
export declare const DEFAULT_OPTIONS: {
    name: string;
    pre: never[];
    post: never[];
    rivals: never[];
    required: never[];
    usePlugins: never[];
    registerHook: {};
};
export declare const createManager: <Hooks extends Record<string, any>, API extends Record<string, any> = Record<string, never>>(hooks?: Partial<Hooks> | undefined, api?: API | undefined) => Manager<Hooks, API>;
export declare const generateRunner: <Hooks extends Record<string, any>>(hooksList: (void | Partial<ToThreads<Hooks>>)[], hooksMap?: Hooks | undefined) => ToRunners<Hooks>;
export declare const cloneHook: (hook: Hook) => Hook;
export declare const cloneHooksMap: <Hooks>(record: Hooks) => Hooks;
export {};
