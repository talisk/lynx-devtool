import type { RsbuildPlugin } from '@rsbuild/core';
import { type PluginBabelOptions } from '@rsbuild/plugin-babel';
/**
 * Plugin order:
 * rspack mode: rsbuild:swc -> rsbuild:babel
 * webpack mode: uni-builder:babel -> uni-builder:ts-loader -> rsbuild-webpack:swc
 */
export declare const getPresetReact: (rootPath: string, isProd: boolean) => (string | {
    development: boolean;
    useBuiltIns: boolean;
    useSpread: boolean;
    runtime: string;
})[];
export declare const pluginBabel: (options: PluginBabelOptions, extraOptions: {
    transformLodash: boolean;
}) => RsbuildPlugin;
