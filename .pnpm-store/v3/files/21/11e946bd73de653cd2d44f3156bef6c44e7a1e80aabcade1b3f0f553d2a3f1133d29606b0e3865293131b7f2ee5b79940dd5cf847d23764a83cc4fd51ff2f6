import type { RsbuildConfig, RsbuildInstance, RsbuildPlugin } from '@rsbuild/core';
import type { CreateBuilderCommonOptions, CreateUniBuilderOptions, OverridesUniBuilderInstance, UniBuilderConfig } from '../types';
export declare function parseConfig(uniBuilderConfig: UniBuilderConfig, options: CreateBuilderCommonOptions): Promise<{
    rsbuildConfig: RsbuildConfig;
    rsbuildPlugins: RsbuildPlugin[];
}>;
export type UniBuilderInstance = Omit<RsbuildInstance, keyof OverridesUniBuilderInstance> & OverridesUniBuilderInstance;
export declare function createRspackBuilder(options: CreateUniBuilderOptions): Promise<UniBuilderInstance>;
