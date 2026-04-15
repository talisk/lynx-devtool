import type { ConfigChainWithContext } from '@rsbuild/core';
import type { RsbuildPlugin } from '@rsbuild/core';
import { type PluginBabelOptions } from '@rsbuild/plugin-babel';
import type { Options as RawTSLoaderOptions } from 'ts-loader';
type OneOrMany<T> = T | T[];
type FileFilterUtil = (items: OneOrMany<string | RegExp>) => void;
export type TSLoaderOptions = Partial<RawTSLoaderOptions>;
export type PluginTsLoaderOptions = ConfigChainWithContext<TSLoaderOptions, {
    /**
     * use `source.include` instead
     * @deprecated
     */
    addIncludes: FileFilterUtil;
    /**
     * use `source.exclude` instead
     * @deprecated
     */
    addExcludes: FileFilterUtil;
}>;
export declare const pluginTsLoader: (options?: PluginTsLoaderOptions, babelOptions?: PluginBabelOptions['babelLoaderOptions']) => RsbuildPlugin;
export {};
