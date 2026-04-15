import type { NormalizedEnvironmentConfig, RsbuildContext, RsbuildTarget, RspackChain } from '@rsbuild/core';
export declare const RUNTIME_CHUNK_NAME = "builder-runtime";
export declare const SERVICE_WORKER_ENVIRONMENT_NAME = "workerSSR";
export declare const JS_REGEX: RegExp;
export declare const TS_REGEX: RegExp;
export declare const SCRIPT_REGEX: RegExp;
export declare const NODE_MODULES_REGEX: RegExp;
export declare function isServerEnvironment(target: RsbuildTarget, environment: string): boolean;
export declare const castArray: <T>(arr?: T | T[] | undefined) => T[];
export declare const getUseBuiltIns: (config: NormalizedEnvironmentConfig) => false | 'usage' | 'entry';
export declare function applyScriptCondition({ rule, chain, config, context, includes, excludes, }: {
    rule: RspackChain.Rule;
    chain: RspackChain;
    config: NormalizedEnvironmentConfig;
    context: RsbuildContext;
    includes: (string | RegExp)[];
    excludes: (string | RegExp)[];
}): void;
export declare const isHtmlDisabled: (config: NormalizedEnvironmentConfig, target: RsbuildTarget) => boolean;
export declare const getHash: (config: NormalizedEnvironmentConfig) => string;
export declare function getBrowserslistWithDefault(path: string, config: {
    output?: {
        overrideBrowserslist?: string[];
    };
}, target: RsbuildTarget): Promise<string[]>;
