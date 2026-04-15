import { type RsbuildConfig, type RsbuildInstance, type RsbuildPlugin } from '@rsbuild/core';
import type { CreateBuilderCommonOptions, CreateUniBuilderOptions, OverridesUniBuilderInstance, UniBuilderConfig } from '../types';
export declare function parseConfig(uniBuilderConfig: UniBuilderConfig, options: CreateBuilderCommonOptions): Promise<{
    rsbuildConfig: RsbuildConfig;
    rsbuildPlugins: RsbuildPlugin[];
}>;
export type UniBuilderWebpackInstance = Omit<RsbuildInstance, keyof OverridesUniBuilderInstance> & OverridesUniBuilderInstance;
export declare function createWebpackBuilder(options: CreateUniBuilderOptions): Promise<UniBuilderWebpackInstance>;
