import { RsbuildPlugin } from '@rsbuild/core';
import { Options } from 'pug';

type PluginPugOptions = {
    /**
     * Used to set the compilation options for Pug.
     * @see https://pugjs.org/api/reference.html#options
     */
    pugOptions?: Options;
};
declare const PLUGIN_PUG_NAME = "rsbuild:pug";
declare const pluginPug: (options?: PluginPugOptions) => RsbuildPlugin;

export { PLUGIN_PUG_NAME, type PluginPugOptions, pluginPug };
